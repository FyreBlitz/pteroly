import req from "../../ApplicationRequest";

/**
 * @param {serverData} serverData The data of the server
 * 
*/

type versionType = "latest" | string;
interface serverData {
	name: string,
	description: string,
	nodeId: number,
	userId: number,
	defaultAllocation: number,
	additionalAllocations: number[],
	version: versionType,
	eggId: number,
	startup: string,
	docker_image: string,
	limits: {
		cpu: number,
		memory: number,
		disk: number,
		io: 500 | number,
		swap: 0 | number,
	},
	feature_limits: {
		databases: number,
		allocations: any,
		backups: number,
	},
	deploy: JSON,
	start_on_completion: true | boolean,
	skip_scripts: false | boolean,
	oom_disabled: true | boolean,
};


interface databaseType {
	"object": "allocation",
	"attributes": {
		"id": number,
		"server": number,
		"host": number,
		"database": string,
		"username": string,
		"remote": string,
		"max_connections": number,
		"created_at": string,
		"updated_at": string,
	},
}

interface returnType {
	"id": number,
	"external_id": string,
	"uuid": string,
	"identifier": string,
	"name": string,
	"description": string,
	"suspended": boolean,
	"limits": {
		"memory": number,
		"swap": number,
		"disk": number,
		"io": number,
		"cpu": number,
		"threads": any | null,
	},
	"feature_limits": {
		"databases": number,
		"allocations": number,
		"backups": number,
	},
	"user": number,
	"node": number,
	"allocation": number,
	"nest": number,
	"egg": number,
	"pack": any | null,
	"container": {
		"startup_command": string,
		"image": string,
		"installed": boolean,
		"environment": {
			"SERVER_JARFILE": string,
			"VANILLA_VERSION": string,
			"STARTUP": string,
		}
	},
	"updated_at": string,
	"created_at":  string,
	"deploy": JSON,
	"relationships": {
		"databases": {
			"object": string,
			"data": databaseType[],
		},
	}
};

function createServer(serverData: serverData, environment = {}): Promise<returnType> {
	const data = makeData(serverData, environment);
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);

	return Req.postRequest('CreateServer', data, serverData.nodeId);
}

function makeData(serverData: serverData, environment = {}) {
	return {
		'name': serverData.name,
		'user': serverData.userId,
		'description': serverData.description,
		'node': serverData.nodeId,
		'egg': serverData.eggId,
		'startup': serverData.startup,
		'docker_image': serverData.docker_image,
		'limits': {
			'cpu': serverData.limits.cpu,
			'memory': serverData.limits.memory,
			'disk': serverData.limits.disk,
			'io': serverData.limits.io,
			'swap': serverData.limits.swap,
		},
		'feature_limits': {
			'databases': serverData.feature_limits.databases,
			'allocations': `${(parseInt(serverData.feature_limits.allocations) + 1)}`,
			'backups': serverData.feature_limits.backups,
		},
		'environment': {
			'DL_VERSION': serverData.version,
			'SERVER_JARFILE': 'server.jar',
			'VANILLA_VERSION': serverData.version,
			'BUNGEE_VERSION': serverData.version,
			'PAPER_VERSION': serverData.version,
			'MC_VERSION': serverData.version,
			'BUILD_NUMBER': serverData.version,
			'INSTALL_REPO': serverData.version,
			'BOT_JS_FILE': 'index.js',
			'AUTO_UPDATE': false,
			'USER_UPLOAD': true,
			'BOT_PY_FILE': 'bot.py',
			'REQUIREMENTS_FILE': 'python requirements.txt',
			'BEDROCK_VERSION': serverData.version,
			'LD_LIBRARY_PATH': './libs/',
			'SERVERNAME': serverData.name,
			'GAMEMODE': 'survival',
			'DIFFICULTY': 'easy',
			'CHEATS': 'false',
			'BUILD_TYPE': 'recommended',
			'PGDATABASE': '.',
			'PGUSER': '.',
			'PGROOT': '.',
			'PGPASSWORD': '.',
			'MINECRAFT_VERSION': serverData.version,
			'NUKKIT_VERSION': serverData.version,
			'JARFILE': 'bot.jar',
			'VERSION': serverData.version,
			'QUERY_PORT': '10101',
			'FILE_PORT': '303030',
			'SERVER_MOTD': 'TeaSpeak',
			'LD_PRELOAD': './libs/libjemalloc.so.2',
			'MATCH': 'ts3-manager-linux-x64',
			'GITHUB_PACKAGE': 'joni1802/ts3-manager',
			'SERVER_VERSION': serverData.version,
			'RELEASE_VERSION': serverData.version,
			'CHANNEL_NAME': '.',
			'CHANNEL_OWNER': '.',
			'BOT_OAUTH_TOKEN': '.',
			'USER_OAUTH_TOKEN': '.',
			'BOT_TWITCH_USERNAME': '.',
			'WEBPANEL_USERNAME': '.',
			'WEBPANEL_PASSWORD': '.',
			'YOUTUBE_API_KEY': '.',
			'DISCORD_BOT_TOKEN': '.',
			'PMMP_VERSION': serverData.version,
			...environment,
		},
		'allocation': {
			'default': serverData.defaultAllocation,
			'additional': serverData.additionalAllocations,
		},
		"deploy": serverData.deploy,
		'start_on_completion': serverData.start_on_completion,
		'skip_scripts': serverData.skip_scripts,
		'oom_disabled': serverData.oom_disabled,
	}
}

export default createServer;