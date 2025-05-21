


export interface Workflow {
    id: string
    userId: string
    name: string
    description: string
    created_at: Date
    status: WorkflowStatus
    // updated_at: string
}

export enum WorkflowStatus {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED"
}