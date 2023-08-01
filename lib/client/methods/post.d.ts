/**
 * @param {String} path The path of the request
 * @param {String} body The body
 */
declare function post(path: string, body: JSON): Promise<any>;
export default post;
