import CreateWorkflowDialog from "@/components/features/workflow/CreateWorkflowDialog";
import UserWorkflows from "@/components/features/workflow/UserWorkflows";
import { Skeleton } from "@/components/ui/skeleton";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import React, { Suspense } from "react";


export default async function Workflows() {
    // const {promise, isError, error} = useQuery({
    //     queryKey: ['workflows'],
    //     queryFn: getUserWorkflows,
    //     refetchInterval: 5 * 1000,
    //     // select: (data) => data.data !== null ? data.data : data.error as string,
    //     refetchOnReconnect: 'always',
    //     refetchOnWindowFocus: 'always'
    // })

    const queryClient = new QueryClient()

    // await queryClient.prefetchQuery({
    //     queryKey: ['workflows'],
    //     queryFn: getUserWorkflows
    // })

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
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <UserWorkflows />
                </HydrationBoundary>
            </div>
        </main>
    )
}


function UserWorkflowsSkeleton() {
    return (
        <div className="space-y-2">
            {
                [1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 w-full" />)
            }
        </div>
    )
}
