import { toast } from "sonner";

export const displayErrorToast = (error: string, id: string) => {
    toast.error(error, {
        id,
        style: {
            background: "bg-red-500",
            border: "1px solid bg-red-500",
            color: "text-primary-foreground"
        }
    })
}

export const displaySuccessToast = (message: string, id: string) => {
    toast.success(message, {
        id,
        style: {
            background: "bg-green-500",
            border: "1px solid bg-green-500",
            color: "text-primary-foreground"
        }
    })
}