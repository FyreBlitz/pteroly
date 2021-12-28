import req from "../../ApplicationRequest";

/**
 * @param {String} email Specify a page, leave blank if you dont want to paginate
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

function userQuery(email: string): Promise<resultType> {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	return Req.getRequest('UserQuery', email, null);
}

export default userQuery;