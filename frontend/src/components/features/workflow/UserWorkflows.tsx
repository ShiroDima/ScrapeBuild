"use client"

import React from "react"
import { InboxIcon, Loader2Icon } from "lucide-react"
import CreateWorkflowDialog from "./CreateWorkflowDialog"
import { useGetWorkflows } from "@/hooks/query/use-get-workflows"
import WorkflowCard from "./WorkflowCard"


export default function UserWorkflows() {
    const {data: userWorkflows, isLoading} = useGetWorkflows()

    if(isLoading) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <Loader2Icon className="w-12 h-12 animate-spin" />
            </div>
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
                    <p className="text-sm text-muted-foreground">
                        Click the button below to create your first workflow
                    </p>
                </div>
                <CreateWorkflowDialog triggerText="Create your first workflow" />
            </div>
        )
    }

    return userWorkflows && (<div className="grid grid-cols-1 gap-4">
        {
            userWorkflows.map(workflow => (
                <WorkflowCard key={workflow.id} workflow={workflow}/>
            ))
        }
    </div>)
    
}

