/**
 * @param {String} path The path of the request starting with "/"
 */
declare function post(path: string, body: JSON): Promise<any>;
export default post;
