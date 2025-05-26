import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteUserWorkflow } from "@/actions/workflows";
import { redirect } from "next/navigation";
import { retrieveAxiosErrorMessage } from "@/lib/helpers/retrieve-axios-error-message";
import { isAxiosError } from "axios";
import { useDispatch } from "react-redux";
import { addWorkflow , deleteWorkflow} from "@/state/workflow-slice";
import { displayErrorToast, displaySuccessToast } from "@/lib/helpers/custom-toast-handlers";

export const useDeleteWorkflow = () => {
    const queryClient = useQueryClient()
    const dispatch = useDispatch()

    return useMutation({
        mutationKey: ["delete-workflow"],
        mutationFn: deleteUserWorkflow,
        onSuccess: async (workflowId) => {
            // TODO: Fix this to dispatch to state and save the workflow to the state so that it can eb reused without refetching from the backend.

            // if (!workflow) return
            await queryClient.invalidateQueries({ queryKey: ["user", "workflows"] })

            displaySuccessToast("Workflow deleted successfully!", "delete-workflow")

            dispatch(deleteWorkflow(workflowId))

            // redirect(`/workflow/editor/${workflow.id}`)
        },
        onError: (error) => {
            const errorMessage = isAxiosError(error) && retrieveAxiosErrorMessage(error)

            typeof errorMessage === "string" && displayErrorToast(errorMessage, "delete-workflow")
        },
    })
}