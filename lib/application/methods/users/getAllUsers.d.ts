/**
 * @param {Integer} page Specify a page, leave blank if you dont want to paginate
*/
declare function getAllUsers(page: number): Promise<any>;
export default getAllUsers;
