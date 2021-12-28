"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationRequest_1 = require("../../ApplicationRequest");
;
;
function createServer(serverData) {
    var data = makeData(serverData);
    var Req = new ApplicationRequest_1.default(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
    return Req.postRequest('CreateServer', data, null);
}
function makeData(serverData) {
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
            'allocations': serverData.feature_limits.allocations + 1,
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
            'SERVER_MOTD': 'TeaSpeak\n\rHosted on PureNodes!',
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
        },
        'allocation': {
            'default': serverData.defaultAllocation,
        },
        'start_on_completion': serverData.start_on_completion,
        'skip_scripts': serverData.skip_scripts,
        'oom_disabled': serverData.oom_disabled,
    };
}
exports.default = createServer;
