/**
 * @param {String} email Specify a page, leave blank if you dont want to paginate
 */
interface resultType {
    id: number;
    external_id: null | string;
    uuid: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    language: string;
    root_admin: boolean;
    two_fa: boolean;
    created_at: string;
    updated_at: string;
}
declare function userQuery(email: string): Promise<resultType>;
export default userQuery;
