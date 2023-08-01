/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import { EventEmitter } from 'events';
import { WebSocket, Event, MessageEvent, CloseEvent, ErrorEvent } from 'ws';
import { authDataType } from './methods/serverActions/console';
export declare class Socket {
    private readonly url;
    private readonly options;
    constructor(url: string, options: {
        onopen: (this: Socket, ev: Event) => void;
        onmessage: (this: Socket, ev: MessageEvent) => void;
        onreconnect: (this: Socket, ev: Event | CloseEvent | ErrorEvent) => void;
        onmaximum: (this: Socket, ev: CloseEvent | ErrorEvent) => void;
        onclose: (this: Socket, ev: CloseEvent) => void;
        onerror: (this: Socket, ev: ErrorEvent) => void;
    });
    ws: WebSocket;
    timer: NodeJS.Timeout;
    private reconnectNum;
    open: () => void;
    private reconnect;
    json: (x: unknown) => void;
    send: (x: unknown) => void;
    close: (x?: number, y?: string | Buffer) => void;
}
export declare class WebsocketClient extends EventEmitter {
    private getToken;
    constructor(auth: authDataType, getToken: () => Promise<authDataType>);
    private isUpdating;
    private timer;
    private backoff;
    private socket;
    private url;
    private token;
    private connect;
    private updateToken;
    private setToken;
    private authenticate;
    close(code?: number, reason?: string): void;
    private open;
    send(event: string, payload?: string | string[]): void;
}
