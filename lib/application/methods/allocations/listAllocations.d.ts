type pageType = number | -1;
interface returnType {
    object: "allocation";
    attributes: {
        id: number;
        ip: string;
        alias: string | null;
        port: number;
        notes: string | null;
        assigned: boolean;
    };
}
declare function listAllocations(nodeId: number, page: pageType): Promise<returnType[]>;
export default listAllocations;
