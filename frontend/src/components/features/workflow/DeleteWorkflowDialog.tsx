"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { useDeleteWorkflow } from "@/hooks/mutations/use-delete-workflow"
import React from "react"
import { toast } from "sonner"

interface DeleteWorkflowDialoagProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    workflowName: string
    workflowId: string
}


const DeleteWorkflowDialog: React.FC<DeleteWorkflowDialoagProps> = ({open, setOpen, workflowName, workflowId}) => {
    const [confirmText, setConfirmText] = React.useState<string>("")
    const {mutate, isPending} = useDeleteWorkflow()

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        If you delete this workflow, you will not be able to recover it.
                        <span className="flex flex-col py-4 gap-2">
                            <span>If you are sure, enter <b>{workflowName}</b> to confirm:</span>
                            <Input value={confirmText} onChange={(e) => setConfirmText(e.target.value)} />
                        </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                        disabled={confirmText !== workflowName || isPending} 
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        onClick={(e) => {
                            e.preventDefault()
                            toast.loading("Deleting workflow...", {id: "delete-workflow"})
                            mutate(workflowId)
                        }}
                    >
                            Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
} 


export default DeleteWorkflowDialog