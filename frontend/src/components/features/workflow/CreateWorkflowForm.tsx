
import { createUserWorkflow } from "@/actions/workflows"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormField,
    FormControl,
    FormDescription,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createWorkflowSchema, CreateWorkflowType } from "@/lib/schemas/workflow"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm, UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { useCallback } from "react"
import { Loader2 } from "lucide-react"


interface CreateWorkflowProp {
    form: UseFormReturn<{
        name: string;
        description?: string | undefined;
    }, any, {
        name: string;
        description?: string | undefined;
    }>
}


const CreateWorkflowForm = ({form}: CreateWorkflowProp) => {
    const {mutate, isPending} = useMutation({
        mutationFn: createUserWorkflow,
        onSuccess: ({}) => {
            toast.success("Workflow created!", {
                id: "create-workflow",
                style: {
                    background: "bg-green-500",
                    border: "1px solid bg-green-500",
                    color: "text-primary-foreground"
                }
            })
        },
        onError: () => {
            toast.error("Failed to create workflow. Please try again", {
                id: "create-workflow",
                style: {
                    background: "bg-red-500",
                    border: "1px solid bg-red-500",
                    color: "text-primary-foreground"
                }
            })
        }
    })

    const onSubmit = useCallback((values: CreateWorkflowType) => {
        toast.loading("Creating workflow...", {id: "create-workflow"})
        mutate(values)
    }, [mutate])

    return (
        <Form {...form}>
            <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField 
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="flex gap-1 items-center">
                                Name
                                <p className="text-xs text-primary">(required)</p>
                            </FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                Choose a descriptive and unique name
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="description"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="flex gap-1 items-center">
                                Name
                                <p className="text-xs text-muted-foreground">(optional)</p>
                            </FormLabel>
                            <FormControl>
                                <Textarea className="resize-none" {...field} />
                            </FormControl>
                            <FormDescription>
                                Provide a brief description of what your workflow does.
                                <br /> This is optional but can help you remember the workflow&apos;s purpose.
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <Button type='submit' className="w-full" disabled={isPending}>
                    {!isPending ? "Proceed" : <Loader2 className="animate-spin" />}
                </Button>
            </form>
        </Form>
    )
}


export default CreateWorkflowForm