import { Workflow } from "@/lib/types/workflow"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export const initialState = {
    workflows: [] as Workflow[]
}


export const workflowSlice = createSlice({
    name: "workflow",
    initialState,
    reducers: {
        addWorkflow: (state, action: PayloadAction<Workflow>) => {
            state.workflows.push(action.payload)
        },
        deleteWorkflow: (state, action: PayloadAction<string>) => {
            state.workflows = state.workflows.filter(workflow => workflow.id !== action.payload)
        }
    }
})


export const {
    addWorkflow,
    deleteWorkflow
} = workflowSlice.actions


export default workflowSlice.reducer