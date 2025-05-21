"use server"

import { auth } from "@clerk/nextjs/server"
import { Workflow } from "@/lib/types/workflow"
import Workflows from "@/lib/api/workflows"
import { retrieveAxiosErrorMessage } from "@/lib/helpers/retrieve-axios-error-message"
import { isAxiosError } from "axios"
import { CreateWorkflowType } from "@/lib/schemas/workflow"
import { redirect } from "next/navigation"


export async function checkIsAuthenticated(): Promise<string> {
    const { userId } = await auth()

    if (!userId) throw new Error("Unauthenticated!")

    return userId
}


export async function getUserWorkflows(): Promise<Workflow[] | null> {

    // const userId = await checkIsAuthenticated()
    const apiResponse = await Workflows.getUserWorkflows("12345")
    return apiResponse

}


export async function createUserWorkflow(form: CreateWorkflowType): Promise<Workflow | null> {
    // const id = await checkIsAuthenticated()

    const workflow = await Workflows.createUserWorkflow("1234", form)

    return workflow
}


export async function deleteUserWorkflow(workflowId: string): Promise<string | null> {
    // const id = await checkIsAuthenticated()
    const workflow = await Workflows.deleteUserWorkflow("1234", workflowId)
    return workflow
}