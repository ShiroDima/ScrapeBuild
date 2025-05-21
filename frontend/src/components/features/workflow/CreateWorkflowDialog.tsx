"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Layers2Icon } from "lucide-react";
import CustomDialogHeader from "../../shared/CustomDialogHeader";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createWorkflowSchema } from "@/lib/schemas/workflow";
import {zodResolver} from "@hookform/resolvers/zod"
import CreateWorkflowForm from "./CreateWorkflowForm";


interface WorkflowDialogProps {
    triggerText?: string
}


const CreateWorkflowDialog = ({triggerText}: WorkflowDialogProps) => {
    const [open, setOpen] = useState<boolean>(false)

    const form = useForm<z.infer<typeof createWorkflowSchema>>({
        resolver: zodResolver(createWorkflowSchema),
        defaultValues: {}
    })
    

    return (
        <Dialog open={open} onOpenChange={open => {
            form.reset()
            setOpen(open)
        }}>
            <DialogTrigger asChild>
                <Button>{triggerText ?? "Create workflow"}</Button>
            </DialogTrigger>
            <DialogContent className="px-4">
                <CustomDialogHeader
                    Icon={Layers2Icon}
                    title="Create workflow"
                    subTitle="Start building your workflow"
                />
                <div className="p-6">
                    <CreateWorkflowForm form={form} />
                </div>
            </DialogContent>
        </Dialog>
    )
};


export default CreateWorkflowDialog