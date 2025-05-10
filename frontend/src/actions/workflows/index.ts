"use server"

import { auth } from "@clerk/nextjs/server"
import { ServerResponse, Workflow } from "@/lib/types/workflow"
import Workflows from "@/lib/api/workflows"
import { retrireveAxiosErrorMessage } from "@/lib/helpers/retrieve-axios-error-message"
import { isAxiosError } from "axios"
import { CreateWorkflowType } from "@/lib/schemas/workflow"
import { redirect } from "next/navigation"


async function checkIsAuthenticated(): Promise<string> {
    const { userId } = await auth()

    if (!userId) throw new Error("Unauthenticated!")

    return userId
}


export async function getUserWorkflows(): Promise<ServerResponse<Workflow[]>> {

    const userId = await checkIsAuthenticated()

    try {
        const apiResponse = await Workflows.getUserWorkflows(userId)

        return {
            data: apiResponse,
            error: null
        }
    } catch (error) {
        const errorMessage = isAxiosError(error) && error.status && error.status <= 500 && retrireveAxiosErrorMessage(error) || "An unexpected error occured";

        return {
            data: null,
            error: errorMessage
        }
    }
}


export async function createUserWorkflow(form: CreateWorkflowType) {
    const id = await checkIsAuthenticated()

    try {
        const workflow = await Workflows.createUserWorkflow(id, form)

        redirect(`/workflow/editor/${workflow.id}`)
    } catch (error) {
        console.log("An error occurred...", error)
        throw error
    }
}