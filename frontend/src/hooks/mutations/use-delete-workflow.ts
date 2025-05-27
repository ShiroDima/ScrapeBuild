import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteUserWorkflow } from "@/actions/workflows";
import { useRouter } from "next/navigation";
import { retrieveAxiosErrorMessage } from "@/lib/helpers/retrieve-axios-error-message";
import { isAxiosError } from "axios";
import { useDispatch } from "react-redux";
import { deleteWorkflow} from "@/state/workflow-slice";
import { displayErrorToast, displaySuccessToast } from "@/lib/helpers/custom-toast-handlers";

export const useDeleteWorkflow = () => {
    const queryClient = useQueryClient()
    const dispatch = useDispatch()
    const router = useRouter()

    return useMutation({
        mutationKey: ["delete-workflow"],
        mutationFn: deleteUserWorkflow,
        onSuccess: async (workflowId) => {
            
            await queryClient.invalidateQueries({ queryKey: ["user", "workflows"] })

            displaySuccessToast("Workflow deleted successfully!", "delete-workflow")

            dispatch(deleteWorkflow(workflowId))

            router.refresh()
        },
        onError: (error) => {
            const errorMessage = isAxiosError(error) && retrieveAxiosErrorMessage(error)

            typeof errorMessage === "string" && displayErrorToast(errorMessage, "delete-workflow")
        },
    })
}