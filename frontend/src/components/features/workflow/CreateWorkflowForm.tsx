
import { Button } from "@/components/ui/button"
import {
    Form,
    FormField,
    FormControl,
    FormDescription,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {  CreateWorkflowType } from "@/lib/schemas/workflow"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { useCallback } from "react"
import { Loader2 } from "lucide-react"
import { useCreateWorkflow } from "@/hooks/mutations/use-create-workflow"


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
    const {mutate, isPending} = useCreateWorkflow()

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
                                Description
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