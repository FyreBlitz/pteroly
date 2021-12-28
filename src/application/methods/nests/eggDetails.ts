import req from "../../ApplicationRequest";

/**
 * @param {Number} nestId 
 * @param {Number} eggId 
 */

interface returnType {
	"id": number,
	"uuid": string,
	"name": string,
	"nest": number,
	"author": string,
	"description": string,
	"docker_image": string,
	"config": {
		"files": {
			"config.yml": {
			"parser": "yaml",
				"find": {
					"listeners[0].query_enabled": boolean,
					"listeners[0].query_port": string,
					"listeners[0].host": string,
					"servers.*.address": {
						"127.0.0.1": string,
						"localhost": string,
					},
				},
			},
		},
		"startup": {
			"done": string,
			"userInteraction": [string],
		},
		"stop": string,
		"logs": {
			"custom": boolean,
			"location": string,
		},
		"extends": null | any,
	},
	"startup": string,
	"script": {
		"privileged": boolean,
		"install": string,
		"entry": string,
		"container": string,
		"extends": null | any,
	},
	"created_at": string,
	"updated_at": string,
};

function eggDetails(nestId: number, eggId: number): Promise<returnType> {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY)
	return Req.getRequest('GetEggInfo', nestId, eggId)
}

export default eggDetails