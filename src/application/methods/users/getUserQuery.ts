import req from "../../ApplicationRequest";

/**
 * @param {String} email Specify a page, leave blank if you dont want to paginate
 */

function getUserQuery(email: string) {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	return Req.getRequest('UserQuery', email, null);
}

export default getUserQuery;