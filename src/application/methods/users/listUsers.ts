import req from "../../ApplicationRequest";

/**
 * @param {Integer} page Specify a page, leave blank if you dont want to paginate
*/

interface resultType {
    object: "user",
    attributes: {
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
}

function listUsers(page: number): Promise<resultType[]> {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	if (page == -1) return Req.getRequest('ListUsers', null, -1);
	return Req.getRequest('ListUsers', null, page);
}

export default listUsers;