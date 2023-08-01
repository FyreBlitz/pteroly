/**
 * @param {String} path The path of the request starting with "/"
 */
declare function get(path: string, page?: number): Promise<any>;
export default get;
