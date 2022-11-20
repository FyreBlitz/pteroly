import { EventEmitter } from 'events';
import { WebSocket, Event, MessageEvent, CloseEvent, ErrorEvent } from 'ws';
import { authDataType } from './methods/serverActions/console';

export class Socket {
  constructor(
    private readonly url: string,
    private readonly options: {
      onopen: (this: Socket, ev: Event) => void;
      onmessage: (this: Socket, ev: MessageEvent) => void;
      onreconnect: (this: Socket, ev: Event | CloseEvent | ErrorEvent) => void;
      onmaximum: (this: Socket, ev: CloseEvent | ErrorEvent) => void;
      onclose: (this: Socket, ev: CloseEvent) => void;
      onerror: (this: Socket, ev: ErrorEvent) => void;
    }
  ) {
    this.open();
  }

  declare ws: WebSocket;
  declare timer: NodeJS.Timeout;
  private reconnectNum = 0;

  public open = () => {
    const options = this.options;
    const reconnect = this.reconnect;
    this.ws = new WebSocket(this.url);

    this.ws.onmessage = options.onmessage;

    const onOpen = options.onopen.bind(this);
    this.ws.onopen = (e) => {
      onOpen(e);
      this.reconnectNum = 0;
    };

    const onClose = options.onclose.bind(this);
    this.ws.onclose = function (e) {
      e.code === 1e3 || e.code === 1001 || e.code === 1005 || reconnect(e);
      onClose(e);
    };

    const onError = options.onerror.bind(this);
    this.ws.onerror = function (e) {
      e && (e as unknown as Record<string, string>).code === 'ECONNREFUSED'
        ? reconnect(e)
        : onError(e);
    };
  };

  private reconnect = (e: CloseEvent | ErrorEvent) => {
    const onReconnect = this.options.onreconnect.bind(this);
    const onMaximum = this.options.onmaximum.bind(this);

    const open = this.open;
    if (this.timer && this.reconnectNum++ < Infinity) {
      this.timer = setTimeout(function () {
        onReconnect(e);
        open();
      }, 1e3);
    } else {
      onMaximum(e);
    }
  };

  public json = (x: unknown) => {
    this.ws.send(JSON.stringify(x));
  };

  public send = (x: unknown) => {
    this.ws.send(x);
  };

  public close = (x?: number, y?: string | Buffer) => {
    clearTimeout(this.timer);
    this.ws.close(x || 1e3, y);
  };
}

const reconnectErrors = [
  'jwt: exp claim is invalid',
  'jwt: created too far in past (denylist)'
];

export class WebsocketClient extends EventEmitter {
  constructor(
    auth: authDataType,
    private getToken: () => Promise<authDataType>
  ) {
    super();
    this.updateToken = ((
      getToken: () => Promise<authDataType>,
      socket: WebsocketClient
    ) => {
      if (this.isUpdating) {
        return;
      }

      this.isUpdating = true;

    getToken().then((data) => socket.setToken(data.token));
    }).bind(undefined, this.getToken, this);

    this.setToken(auth.token).connect(auth.socket);
  }

  private isUpdating = false;

  // Timer instance for this socket.
  private timer!: NodeJS.Timeout;

  // The backoff for the timer, in milliseconds.
  private backoff = 5000;

  // The socket instance being tracked.
  private socket: Socket | null = null;

  // The URL being connected to for the socket.
  private url: string | null = null;

  // The authentication token passed along with every request to the Daemon.
  // By default this token expires every 15 minutes and must therefore be
  // refreshed at a pretty continuous interval. The socket server will respond
  // with "token expiring" and "token expired" events when approaching 3 minutes
  // and 0 minutes to expiry.
  private token = '';

  // Connects to the websocket instance and sets the token for the initial request.
  private connect(url: string): this {
    this.url = url;

    this.socket = new Socket(this.url, {
      onmessage: (e) => {
        try {
          const { event, args } = JSON.parse(e.data.toString());
          args ? this.emit(event, ...args) : this.emit(event);
        } catch (ex) {
          console.warn('Failed to parse incoming websocket message.', ex);
        }
      },
      onopen: () => {
        // Clear the timers, we managed to connect just fine.
        this.timer && clearTimeout(this.timer);
        this.backoff = 5000;

        this.emit('SOCKET_OPEN');
        this.authenticate();
      },
      onreconnect: () => {
        this.emit('SOCKET_RECONNECT');
        this.authenticate();
      },
      onclose: () => this.emit('SOCKET_CLOSE'),
      onerror: (event) => {
        if (
          event.message ===
          'WebSocket was closed before the connection was established'
        )
          return;
        throw new Error(event.message);
      },
      onmaximum: () => {
        return;
      }
    });

    this.on('daemon error', (message) => {
      console.error(message);
    });

    this.on('token expiring', () => this.updateToken());
    this.on('token expired', () => this.updateToken());
    this.on('jwt error', (error: string) => {
      if (reconnectErrors.find((v) => error.toLowerCase().indexOf(v) >= 0)) {
        this.updateToken();
      } else {
        throw new Error(error);
      }
    });
    this.on('transfer status', (status: string) => {
      if (status === 'starting' || status === 'success') {
        return;
      }

      // This code forces a reconnection to the websocket which will connect us to the target node instead of the source node
      // in order to be able to receive transfer logs from the target node.
      this.close();
      this.open();
    });

    this.timer = setTimeout(() => {
      this.backoff = this.backoff + 2500 >= 20000 ? 20000 : this.backoff + 2500;
      this.socket && this.socket.close(undefined, 'timeout');
      clearTimeout(this.timer);

      // Re-attempt connecting to the socket.
      this.connect(url);
    }, this.backoff);

    return this;
  }

  private updateToken!: () => void;

  // Sets the authentication token to use when sending commands back and forth
  // between the websocket instance.
  private setToken(token: string, isUpdate = false): this {
    this.token = token;

    if (isUpdate) {
      this.authenticate();
    }

    return this;
  }

  private authenticate(): void {
    if (this.url && this.token) {
      this.send('auth', this.token);
    }
  }

  public close(code?: number, reason?: string): void {
    this.url = null;
    this.token = '';
    this.socket && this.socket.close(code, reason);
  }

  private open(): void {
    this.socket && this.socket.open();
  }

  public send(event: string, payload?: string | string[]): void {
    this.socket &&
      this.socket.send(
        JSON.stringify({
          event,
          args: Array.isArray(payload) ? payload : [payload]
        })
      );
  }
}