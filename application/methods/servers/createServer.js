const req = require('../../ApplicationRequest.js');
/**
 * @param {String} serverName The name of your server
 * @param {String} description The description of your server
 * @param {Number} userId The ID of the pterodactyl user the server is assigned to
 * @param {Number} defaultAllocation The port the server is gonna get created on
 * @param {String} version The that the server is gonna use
 * @param {Number} eggId The ID of the egg you want to use
 * @param {String} startupCmd The CMD that is gonna get ran if you start the server
 * @param {String} dockerImage The docker image your server will use
 * @param {Number} cpu The amount of CPU in percentage the server is gonna get
 * @param {number} memory The amount of RAM in MB the server is gonna get
 * @param {Number} disk The amount of Disk in MB the server is gonna get
 * @param {Number} io The IO performance the server will get relative to the others
 * @param {Number} swap The amount of swap a server gets
 * @param {Number} databases The amount of databases a server get
 * @param {Number} allocations The amount of extra allocations the server is gonna get
 * @param {Number} backups The amount of backups an server is gonna get
 * @yields Object (refer to docs for schema);
*/
function createServer(serverName, description, nodeId, userId, defaultAllocation, version, eggId, startupCmd, dockerImage, cpu, memory, disk, io, swap, databases, allocations, backups) {
	const data = makeData(serverName, description, nodeId, userId, defaultAllocation, version, eggId, startupCmd, dockerImage, cpu, memory, disk, io, swap, databases, allocations, backups)
	const Req = new req(process.env.APPLICATION_NODEACTYL_HOST, process.env.APPLICATION_NODEACTYL_KEY)
	return Req.postRequest('CreateServer', data, null)
}

function makeData(serverName, description, nodeId, userId, defaultAllocation, version, eggId, startupCmd, dockerImage, cpu, memory, disk, io, swap, databases, allocations, backups) {
	return {
		'name': serverName,
		'user': userId,
		'description': description,
		'node': nodeId,
		'egg': eggId,
		'docker_image': dockerImage,
		'startup': startupCmd,
		'limits': {
			'memory': memory,
			'swap': swap,
			'disk': disk,
			'io': io,
			'cpu': cpu,
		},
		'feature_limits': {
			'databases': databases,
			'allocations': allocations + 1,
			'backups': backups,
		},
		'environment': {
			'DL_VERSION': version,
			'SERVER_JARFILE': 'server.jar',
			'VANILLA_VERSION': version,
			'BUNGEE_VERSION': version,
			'PAPER_VERSION': version,
			'MC_VERSION': version,
			'BUILD_NUMBER': version,
			'INSTALL_REPO': version,
			'BOT_JS_FILE': 'index.js',
			'AUTO_UPDATE': false,
			'USER_UPLOAD': true,
			'BOT_PY_FILE': 'bot.py',
			'REQUIREMENTS_FILE': 'python requirements.txt',
			'BEDROCK_VERSION': version,
			'LD_LIBRARY_PATH': '.',
			'SERVERNAME': serverName,
			'GAMEMODE': 'survival',
			'DIFFICULTY': 'easy',
			'CHEATS': 'false',
			'BUILD_TYPE': 'recommended',
			'PGDATABASE': '.',
			'PGUSER': '.',
			'PGROOT': '.',
			'PGPASSWORD': '.',
			'MINECRAFT_VERSION': version,
			'NUKKIT_VERSION': 'latest',
			'JARFILE': 'bot.jar',
			'VERSION': 'latest',
			'QUERY_PORT': '10101',
			'FILE_PORT': '303030',
			'SERVER_MOTD': 'TeaSpeak\n\rHosted on PureNodes!',
			'LD_LIBRARY_PATH': './libs/',
			'LD_PRELOAD': './libs/libjemalloc.so.2',
			'SERVER_JARFILE': 'server.jar',
			'MATCH': 'ts3-manager-linux-x64',
			'GITHUB_PACKAGE': 'joni1802/ts3-manager',
			'SERVER_VERSION': 'latest',
			'RELEASE_VERSION': 'latest',
			'CHANNEL_NAME': '.',
			'CHANNEL_OWNER': '.',
			'BOT_OAUTH_TOKEN': '.',
			'USER_OAUTH_TOKEN': '.',
			'BOT_TWITCH_USERNAME': '.',
			'WEBPANEL_USERNAME': '.',
			'WEBPANEL_PASSWORD': '.',
			'YOUTUBE_API_KEY': '.',
			'DISCORD_BOT_TOKEN': '.',
			'PMMP_VERSION': 'latest'
		},
		'allocation': {
			'default': defaultAllocation,
		},
		'start_on_completion': true,
		'skip_scripts': false,
		'oom_disabled': true,
	}
}
module.exports = createServer
