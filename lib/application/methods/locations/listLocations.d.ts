interface returnType {
    object: "location";
    attributes: {
        id: number;
        short: string;
        long: string;
        updated_at: string;
        created_at: string;
    };
    meta: {
        resource: string;
    };
}
declare function listLocations(page: number): Promise<returnType[]>;
export default listLocations;
