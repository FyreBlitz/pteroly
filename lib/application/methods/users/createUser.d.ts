/**
 * @param {String} username Users username
 * @param {String} email Users email
 * @param {String} password Users password
 * @param {String} firstName Users first name
 * @param {String} lastName Users last name
 * @param {Boolean} isAdmin Is the user admin? (true/false)
 * @param {String} language Language, Normally en/fr (2 letter languages)
 */
declare function createUser(username: string, email: string, password: string, firstName: string, lastName: string, isAdmin: boolean, language: string): Promise<any>;
export default createUser;
