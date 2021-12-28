import req from "../../ApplicationRequest";

/**
 * @param {Number} userId
 */

interface resultType {
    id: number,
    external_id: null | string,
    uuid: string,
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    language: string,
    root_admin: boolean,
    two_fa: boolean,
    created_at: string,
    updated_at: string,
}

function userDetails(userId: number): Promise<resultType> {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	return Req.getRequest('GetUserInfo', userId, null);
}

export default userDetails;