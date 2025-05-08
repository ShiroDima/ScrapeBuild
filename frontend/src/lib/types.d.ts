

export interface ServerResponse<T> {
    data: T,
    error: string | null,
}

export interface Workflow {
    id: string
    userId: string
    name: string
    description: string
    created_at: string
    updated_at: string
}