import req from "../../ApplicationRequest";

/**
 * @param {Integer} page Specify a page, leave blank if you dont want to paginate
*/
function getAllUsers(page: number) {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY)
	if (page !== undefined) return Req.getRequest('GetAllUsers', page, null);
	return Req.getRequest('GetAllUsers', null, null);
}

export default getAllUsers;