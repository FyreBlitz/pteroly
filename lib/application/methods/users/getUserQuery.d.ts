/**
 * @param {String} email Specify a page, leave blank if you dont want to paginate
 */
declare function getUserQuery(email: string): Promise<any>;
export default getUserQuery;
