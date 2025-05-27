import CreateWorkflowDialog from "@/components/features/workflow/CreateWorkflowDialog";
import UserWorkflows from "@/components/features/workflow/UserWorkflows";
import React from "react";


export default async function Workflows() {

    return (
        <main className="flex-1 flex flex-col h-full">
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold">
                        Workflows
                    </h1>
                    <p className="text-muted-foreground">Manage your workflows</p>
                </div>
                <CreateWorkflowDialog />
            </div>

            <div className="h-full py-6">
                <UserWorkflows />
            </div>
        </main>
    )
}
