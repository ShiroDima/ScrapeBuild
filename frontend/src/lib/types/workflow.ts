

export interface ServerResponse<T> {
    data: T | null,
    error: string | null,
}

export interface Workflow {
    id: string
    // userId: string
    name: string
    description: string
    created_at: string
    // updated_at: string
}

export enum WorkflowStatus {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED"
}