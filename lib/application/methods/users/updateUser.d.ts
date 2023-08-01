/**
 * @param {String} userId External UserID
 * @param {userData} userData The user data
 */
interface userData {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    root_admin: boolean;
    language: string;
}
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
declare function updateUser(userId: number, userData: userData): Promise<resultType>;
export default updateUser;
