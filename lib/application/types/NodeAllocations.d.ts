export interface returnList {
    object: string;
    data: returnGet[];
    meta: {
        pagination: {
            total: number;
            count: number;
            per_page: number;
            current_page: number;
            total_pages: number;
            links: {
                [key: string]: any;
            };
        };
    };
}
export interface returnGet {
}
export interface create {
}
