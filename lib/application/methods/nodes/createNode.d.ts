/**
 *
 * @param {nodeData} nodeInfo The data of the Node
 */
type webType = "https" | "http";
interface nodeData {
    name: string;
    description: "" | string;
    location_id: 1 | number;
    fqdn: string;
    scheme: webType;
    behind_proxy: false | boolean;
    maintenance_mode: false | boolean;
    memory: number;
    memory_overallocate: 0 | number;
    disk: number;
    disk_overallocate: 0 | number;
    upload_size: 100 | number;
    daemon_sftp: 2022 | number;
    daemon_listen: 8080 | number;
    public: true | boolean;
    daemon_base: string;
}
interface returnType {
    id: number;
    uuid: string;
    public: boolean;
    name: string;
    description: string;
    location_id: number;
    fqdn: string;
    scheme: webType;
    behind_proxy: boolean;
    maintenance_mode: boolean;
    memory: number;
    memory_overallocate: number;
    disk: number;
    disk_overallocate: number;
    upload_size: number;
    daemon_listen: number;
    daemon_sftp: number;
    daemon_base: string;
    created_at: string;
    updated_at: string;
    mounts: any[];
    allocated_resources: {
        memory: number;
        disk: number;
    };
}
declare function createNode(nodeInfo: nodeData): Promise<returnType>;
export default createNode;
