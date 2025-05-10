"use client"

import React from "react"
import { useQuery } from "@tanstack/react-query"
import { getUserWorkflows } from "@/actions/workflows/getUserWorkflows"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, InboxIcon } from "lucide-react"
import { ServerResponse, Workflow } from "@/lib/types/workflow"
import CreateWorkflowDialog from "./CreateWorkflowDialog"


export default function UserWorkflows() {
    // const {data: userWorkflows} = useQuery({
    //     queryKey: ['workflows'],
    //     queryFn: getUserWorkflows,
    //     select: (data: ServerResponse<Workflow[]>) => {
    //         if(data.data !== null) return data.data
    //         if(data.error !== null) return data.error

    //         return "An unexpected error occurred. Please try again later"
    //     },
    //     initialData: {data: [], error: null}
    // })

    const userWorkflows: Workflow[] | string = []

    if(typeof userWorkflows === "string") {
        return (
            <Alert>
                <AlertCircle className="w-4 h-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    {userWorkflows}
                </AlertDescription>
            </Alert>
        )
    }

    if(userWorkflows && userWorkflows.length === 0) {
        return (
            <div className="flex flex-col gap-4 h-full items-center justify-center">
                <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
                    <InboxIcon size={40} className="stroke-primary" />
                </div>
                <div className="flex flex-col gap-1 text-center">
                    <p className="font-bold">No workflow created yet</p>
                    <p className="text-sm text-muted-foreground">Click the button below to create your first workflow</p>
                </div>
                <CreateWorkflowDialog triggerText="Create your first workflow" />
            </div>
        )
    }
    
}

