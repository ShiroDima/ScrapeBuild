"use server"

import { auth } from "@clerk/nextjs/server"
import { apiClient } from "@/lib/helpers/axiosClient"


export async function GetUserWorkflows() {
    const { userId } = await auth()

    if (!userId) throw new Error("Unauthenticated!")

    apiClient.get("/workflows")
}