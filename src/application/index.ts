import Custom from "./methods/Custom.js";
import Locations from "./methods/Locations.js";
import Nests from "./methods/Nests.js";
import NodeAllocations from "./methods/NodeAllocations.js";
import Nodes from "./methods/Nodes.js";
import ServerDatabases from "./methods/ServerDatabases.js";
import Servers from "./methods/Servers.js";
import Users from "./methods/Users.js";

// Types
import * as CustomTypes from "./types/Custom.js";
import * as LocationsTypes from "./types/Locations.js";
import * as NestsTypes from "./types/Nests.js";
import * as NodeAllocationsTypes from "./types/NodeAllocations.js";
import * as NodesTypes from "./types/Nodes.js";
import * as ServerDatabasesTypes from "./types/ServerDatabases.js";
import * as ServersTypes from "./types/Servers.js";
import * as UsersTypes from "./types/Users.js";

interface userFilters {

}

export default class index {
	private hostname: string = "";
	private key: string = "";

	private custom: Custom;
	private locations: Locations;
	private nests: Nests;
	private allocations: NodeAllocations;
	private nodes: Nodes;
	private databases: ServerDatabases;
	private servers: Servers;
	private users: Users;

	constructor(hostname: string, key: string) {
		this.hostname = hostname;
		this.key = key;

		if (this.hostname.endsWith("/")) this.hostname = this.hostname.substring(0, this.hostname.length - 1);
		
		this.custom = new Custom(this.hostname, this.key);
		this.locations = new Locations(this.hostname, this.key);
		this.nests = new Nests(this.hostname, this.key);
		this.allocations = new NodeAllocations(this.hostname, this.key);
		this.nodes = new Nodes(this.hostname, this.key);
		this.databases = new ServerDatabases(this.hostname, this.key);
		this.servers = new Servers(this.hostname, this.key);
		this.users = new Users(this.hostname, this.key);
	}
	
	// Custom
	get = (path: string): Promise<CustomTypes.JSON> => this.custom.get(path);
	post = (path: string, body: CustomTypes.JSON): Promise<CustomTypes.JSON> => this.custom.post(path, body);
	put = (path: string, body: CustomTypes.JSON): Promise<CustomTypes.JSON> => this.custom.put(path, body);
	delete = (path: string): Promise<CustomTypes.JSON> => this.custom.delete(path);

	// Locations
	getLocations = (page: number = 1): Promise<LocationsTypes.returnList> => this.locations.list(page);
	getLocation = (id: number): Promise<LocationsTypes.returnGet> => this.locations.get(id);
	newLocation = (body: LocationsTypes.create): Promise<LocationsTypes.returnGet> => this.locations.create(body);
	delLocation = (id: number): Promise<CustomTypes.msg> => this.locations.delete(id);
	updateLocation = (id: number, body: LocationsTypes.update): Promise<LocationsTypes.returnGet> => this.locations.update(id, body);

	// Nests
	getNests = (page: number = 1): Promise<NestsTypes.returnList> => this.nests.listNests(page);
	getNest = (id: number): Promise<NestsTypes.returnGet> => this.nests.getNest(id);
	getEggs = (nestId: number, page: number = 1): Promise<NestsTypes.returnListEggs> => this.nests.listEggs(nestId, page);
	getEgg = (nestId: number, id: number): Promise<NestsTypes.returnGetEggs> => this.nests.getEgg(nestId, id);

	// NodeAllocations
	getAllocations = (nodeId: number, page: number = 1): Promise<NodeAllocationsTypes.returnList> => this.allocations.list(nodeId, page);
	newAllocation = (nodeId: number, body: NodeAllocationsTypes.create): Promise<NodeAllocationsTypes.returnGet> => this.allocations.create(nodeId, body);
	delAllocation = (nodeId: number, id: number): Promise<CustomTypes.msg> => this.allocations.delete(nodeId, id);

	// Nodes
	getNodes = (page: number = 1): Promise<NodesTypes.returnList> => this.nodes.list(page);
	getNode = (id: number): Promise<NodesTypes.returnGet> => this.nodes.get(id);
	newNode = (body: NodesTypes.create): Promise<NodesTypes.returnGet> => this.nodes.create(body);
	updateNode = (id: number, body: NodesTypes.update): Promise<NodesTypes.returnGet> => this.nodes.update(id, body);
	delNode = (id: number): Promise<CustomTypes.msg> => this.nodes.delete(id);

	// ServerDatabases
	getDatabases = (serverId: number, page: number = 1): Promise<ServerDatabasesTypes.returnList> => this.databases.list(serverId, page);
	getDatabase = (serverId: number, id: number): Promise<ServerDatabasesTypes.returnGet> => this.databases.get(serverId, id);
	newDatabase = (serverId: number, body: ServerDatabasesTypes.create): Promise<ServerDatabasesTypes.returnGet> => this.databases.create(serverId, body);
	resetPwdDatabase = (serverId: number, id: number): Promise<ServerDatabasesTypes.returnGet> => this.databases.resetPassword(serverId, id, {});
	delDatabase = (serverId: number, id: number): Promise<CustomTypes.msg> => this.databases.delete(serverId, id);

	// Servers
	getServers = (page: number = 1): Promise<ServersTypes.returnList> => this.servers.list(page);
	getServer = (id: number): Promise<ServersTypes.returnGet> => this.servers.get(id);
	getServerExternal = (externalId: string): Promise<ServersTypes.returnGet> => this.servers.getExternal(externalId);
	newServer = (body: ServersTypes.create): Promise<ServersTypes.returnGet> => this.servers.create(body);
	updateDetailsServer = (id: number, body: ServersTypes.updateDetails): Promise<ServersTypes.returnGet> => this.servers.updateDetails(id, body);
	updateBuildServer = (id: number, body: ServersTypes.updateBuild): Promise<ServersTypes.returnGet> => this.servers.updateBuild(id, body);
	updateStartupServer = (id: number, body: ServersTypes.updateStartup): Promise<ServersTypes.returnGet> => this.servers.updateStartup(id, body);
	suspendServer = (id: number): Promise<ServersTypes.returnGet> => this.servers.suspend(id);
	unsuspendServer = (id: number): Promise<ServersTypes.returnGet> => this.servers.unsuspend(id);
	reinstallServer = (id: number): Promise<ServersTypes.returnGet> => this.servers.reinstall(id);
	delServer = (id: number): Promise<CustomTypes.msg> => this.servers.delete(id);
	forceDelServer = (id: number): Promise<CustomTypes.msg> => this.servers.forceDelete(id);

	// Users
	getUsers = (page: number = 1, filters: any = null, sortBy: any = null): Promise<UsersTypes.returnList> => this.users.list(page, filters, sortBy);
	getUser = (id: number): Promise<UsersTypes.returnGet> => this.users.get(id);
	getUserExternal = (externalId: string): Promise<UsersTypes.returnGet> => this.users.getExternal(externalId);
	newUser = (body: UsersTypes.create): Promise<UsersTypes.returnGet> => this.users.create(body);
	updateUser = (id: number, body: UsersTypes.update): Promise<UsersTypes.returnGet> => this.users.update(id, body);
	delUser = (id: number): Promise<CustomTypes.msg> => this.users.delete(id);
}