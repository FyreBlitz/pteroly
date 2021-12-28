declare function deleteAllocation(nodeId: number, allocationId: number): Promise<void | {
    success: boolean;
    message: string;
}>;
export default deleteAllocation;
