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
            const { data: serverResponse } = await apiClient.get<ServerResponse<Workflow[]>>(`/api/workflow/`, config) 
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

        const { data: serverResponse } = await apiClient.post<ServerResponse<Workflow>>(`/api/workflow/create`, postData, config)
        return serverResponse.data

        // try {
            
        // } catch (error) {
        //     console.log("Error: ", error)
        //     throw error
        // }
    }

    static async deleteUserWorkflow(id: string, workflowId: string): Promise<void> {
        const config: AxiosRequestConfig = {
            headers: {
                "X-USER-ID": id
            }
        }

        await apiClient.delete<ServerResponse<null>>(`/api/workflow/${workflowId}/delete`)

        // try {
            

        //     return data.data
        // } catch (error) {
        //     console.log("Error: ", error)
        //     throw error
        // }
    }
}



export default Workflows