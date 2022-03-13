import axios from "axios";

// Users
import createuser from "./methods/users/createUser";
import listusers from "./methods/users/listUsers";
import userdetails from "./methods/users/userDetails";
import userquery from "./methods/users/userQuery";
import updateuser from "./methods/users/updateUser";
import deleteuser from "./methods/users/deleteUser";

// Servers
import createserver from "./methods/servers/createServer";
import listservers from "./methods/servers/listServers";
import updatebuild from "./methods/servers/updateBuild";
import updatedetails from "./methods/servers/updateDetails";
import deleteserver from "./methods/servers/deleteServer";
import suspendserver from "./methods/servers/suspendServer";
import unsuspendserver from "./methods/servers/unsuspendServer";
import serverdetails from "./methods/servers/serverDetails";

// Nodes
import createnode from "./methods/nodes/createNode";
import nodedetails from "./methods/nodes/nodeDetails";
import listnodes from "./methods/nodes/listNodes";
import deletenode from "./methods/nodes/deleteNode";

// Databases
import createdatabase from "./methods/databases/createDatabase";
import resetdatabasepassword from "./methods/databases/resetDatabasePassword";
import listdatabases from "./methods/databases/listDatabases";
import databasedetails from "./methods/databases/databaseDetails";
import deletedatabase from "./methods/databases/deleteDatabase";

// Allocations
import listallocations from "./methods/allocations/listAllocations";
import deleteallocation from "./methods/allocations/deleteAllocation";
import createallocation from "./methods/allocations/createAllocation";

// Locations
import listlocations from "./methods/locations/listLocations";
import deletelocation from "./methods/locations/deleteLocation";
import createlocation from "./methods/locations/createLocation";
import updatelocation from "./methods/locations/updateLocation";
import locationdetails from "./methods/locations/locationDetails";

// Other
import post from "./methods/post";
import patch from "./methods/patch";
import get from "./methods/get";
import put from "./methods/put";
import del from "./methods/delete";

/**
 * @param {String} host Host to connect to
 * @param {String} key Key to use
 * @param {Boolean, String} callback Returns true when login is successful
 */
function login(host: string, key: string, callback: any) {
	host = host.trim();
	if(host.endsWith("/")) host = host.slice(0, -1);

	process.env.APPLICATION_PTEROLY_HOST = host;
	process.env.APPLICATION_PTEROLY_KEY = key;

	axios.get(host + "/api/application/users", {
		maxRedirects: 5,
		headers: {
			"Authorization": "Bearer " + key,
			"Content-Type": "application/json",
			"Accept": "Application/vnd.pterodactyl.v1+json",
		},
	}).then(function(response: any) {
		if (response.status == 404) {
			callback(false, "API Key is not valid! (Application)");
			return;
		}
		callback(true);
	}).catch((error: any) => {
		if (error.response.status == 403) {
			callback(false, "API Key is not valid! (Application)");
			return;
		}
		throw error;
	});
}

/**
 *
 * @param {String} host The host to use
 * @param {String} key The application key to use
 * @Warning USE THIS ONLY IF YOU KNOW YOUR CREDENTIALS ARE 100% CORRECT, OR THEY NEVER CHANGE
 */
function fastLogin(host: string, key: string) {
	host = host.trim();
	if(host.endsWith("/")) host = host.slice(0, -1);

	process.env.APPLICATION_PTEROLY_HOST = host;
	process.env.APPLICATION_PTEROLY_KEY = key;
}

const functions = {
	login: login,
	fastLogin: fastLogin,

	// Users
	userDetails: userdetails,
	listUsers: listusers,
	updateUser: updateuser,
	createUser: createuser,
	deleteUser: deleteuser,
	userQuery: userquery,

	// Servers
	serverDetails: serverdetails,
	listServers: listservers,
	createServer: createserver,
	suspendServer: suspendserver,
	unsuspendServer: unsuspendserver,
	updateBuild: updatebuild,
	updateDetails: updatedetails,
	deleteServer: deleteserver,

	// Nodes
	nodeDetails: nodedetails,
	listNodes: listnodes,
	createNode: createnode,
	deleteNode: deletenode,
	
	// Database
	listDatabases: listdatabases,
	databaseDetails: databasedetails,
	createDatabase: createdatabase,
	resetDatabasePassword: resetdatabasepassword,
	deleteDatabase: deletedatabase,

	// Locations
	listLocations: listlocations,
	deleteLocation: deletelocation,
	createLocation: createlocation,
	updateLocation: updatelocation,
	locationDetails: locationdetails,

	// Allocations
	listAllocations: listallocations,
	deleteAllocation: deleteallocation,
	createAllocation: createallocation,

	// Other
	post: post,
	patch: patch,
	get: get,
	put: put,
	delete: del,
};
export = functions;