/**
 *
 * @param {Number} nestId The id of the Nest
 */
interface returnType {
    id: number;
    uuid: string;
    author: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}
declare function nestDetails(nestId: number): Promise<returnType>;
export default nestDetails;
