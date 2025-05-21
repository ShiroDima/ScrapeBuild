import { AxiosRequestConfig } from "axios";
import { apiClient } from "../helpers/axiosClient";
import { Workflow, WorkflowStatus } from "../types/workflow";
import { ServerResponse } from "../types";
import { z } from "zod";
import { createWorkflowSchema, CreateWorkflowType } from "../schemas/workflow";
import { off } from "process";

class Workflows {

    /**
     * Get all user workflows
     * @params id: The userId of the signed user to get workflows for
     */
    static async getUserWorkflows(id: string): Promise<Workflow[] | null> {
        const config: AxiosRequestConfig = {
            headers: {
                "X-USER-ID": id
            }
        }

        try {
            const { data: serverResponse } = await apiClient.get<ServerResponse<Workflow[]>>(`/api/workflow/${id}`, config) // FIXME: Remove the ID from the path parameter in the backend so that it fully uses the header to pass the user ID.
            return serverResponse.data
        } catch (error) {
            console.log("Error: ", error)
            throw error
        }
    }

    /**
     * Create a new workflow for the signed in user
     * @params id: Userid for the signed in user
     */
    static async createUserWorkflow(id: string, formData: CreateWorkflowType): Promise<Workflow | null> {
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
            const { data } = await apiClient.post<ServerResponse<Workflow>>(`/api/workflow/${id}/create`, postData, config)
            return data.data
        } catch (error) {
            console.log("Error: ", error)
            throw error
        }
    }

    static async deleteUserWorkflow(id: string, workflowId: string): Promise<string | null> {
        const config: AxiosRequestConfig = {
            headers: {
                "X-USER-ID": id
            }
        }

        try {
            const { data } = await apiClient.delete<ServerResponse<string>>("`/api/workflow/${id}/delete")

            return data.data
        } catch (error) {
            console.log("Error: ", error)
            throw error
        }
    }
}



export default Workflows