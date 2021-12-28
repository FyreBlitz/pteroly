/**
 * @param {String} path The path of the request starting with "/"
 */
declare function put(path: string, body: JSON): Promise<any>;
export default put;
