/**
 * @param {Number} userId The user ID to delete
 */
declare function deleteUser(userId: number): Promise<void | {
    success: boolean;
    message: string;
}>;
export default deleteUser;
