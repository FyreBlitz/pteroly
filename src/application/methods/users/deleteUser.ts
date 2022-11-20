import req from "../../ApplicationRequest";

/**
 * @param {Number} userId The user ID to delete
 */
function deleteUser(userId: number) {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	return Req.deleteRequest('DeleteUser', userId, null);
}

export default deleteUser;