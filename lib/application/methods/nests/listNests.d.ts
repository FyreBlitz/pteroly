interface returnType {
    object: "nest";
    attributes: {
        id: number;
        uuid: string;
        author: string;
        name: string;
        description: string;
        created_at: string;
        updated_at: string;
    };
}
declare function listNests(page: number): Promise<returnType[]>;
export default listNests;
