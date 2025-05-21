import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createUserWorkflow } from "@/actions/workflows";
import { redirect } from "next/navigation";
import { retrieveAxiosErrorMessage } from "@/lib/helpers/retrieve-axios-error-message";
import { isAxiosError } from "axios";
import { useDispatch } from "react-redux";
import { addWorkflow } from "@/state/workflow-slice";
import { displayErrorToast, displaySuccessToast } from "@/lib/helpers/custom-toast-handlers";

export const useCreateWorkflow = () => {
    const queryClient = useQueryClient()
    const dispatch = useDispatch()

    return useMutation({
        mutationKey: ["create-workflow"],
        mutationFn: createUserWorkflow,
        onSuccess: async (workflow) => {
            // TODO: Fix this to dispatch to state and save the workflow to the state so that it can eb reused without refetching from the backend.

            if (!workflow) return
            await queryClient.invalidateQueries({ queryKey: ["user", "workflows"] })

            displaySuccessToast("Worflow created successfully!", "create-workflow")

            dispatch(addWorkflow(workflow))

            redirect(`/workflow/editor/${workflow.id}`)
        },
        onError: (error) => {
            const errorMessage = isAxiosError(error) && retrieveAxiosErrorMessage(error)

            typeof errorMessage === "string" && displayErrorToast(errorMessage, "create-workflow")
        },
    })
}