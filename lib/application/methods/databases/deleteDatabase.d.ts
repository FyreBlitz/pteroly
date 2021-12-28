declare function deleteDatabase(internalId: number, databaseId: number): Promise<void | {
    success: boolean;
    message: string;
}>;
export default deleteDatabase;
