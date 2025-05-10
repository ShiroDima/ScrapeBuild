import { AxiosRequestConfig } from "axios";
import { apiClient } from "../helpers/axiosClient";
import { ServerResponse, Workflow, WorkflowStatus } from "../types/workflow";
import { z } from "zod";
import { createWorkflowSchema, CreateWorkflowType } from "../schemas/workflow";
import { off } from "process";

class Workflows {

    /**
     * Get all user workflows
     * @params id: The userId of the signed user to get workflows for
     */
    static async getUserWorkflows(id: string): Promise<Workflow[]> {
        const config: AxiosRequestConfig = {
            headers: {
                "X-USER-ID": id
            }
        }

        try {
            const { data } = await apiClient.get<Workflow[]>(`/api/workflows`, config)
            return data
        } catch (error) {
            console.log("Error: ", error)
            throw error
        }
    }

    /**
     * Create a new workflow for the signed in user
     * @params id: Userid for the signed in user
     */
    static async createUserWorkflow(id: string, formData: CreateWorkflowType): Promise<Workflow> {
        const config: AxiosRequestConfig = {
            headers: {
                "X-USER-ID": id
            }
        }

        const { success, data } = createWorkflowSchema.safeParse(formData)

        if (!success) throw new Error("Invalid form data")

        const postData = {
            definition: "TODO",
            status: WorkflowStatus.DRAFT,
            ...data
        }

        try {
            const { data } = await apiClient.post<Workflow>(`/api/workflows/create`, postData, config)
            return data
        } catch (error) {
            console.log("Error: ", error)
            throw error
        }
    }
}


export default Workflows