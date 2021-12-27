import req from "../../ApplicationRequest";

function getUserInfo(userId: number) {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	return Req.getRequest('GetUserInfo', userId, null);
}

export default getUserInfo;