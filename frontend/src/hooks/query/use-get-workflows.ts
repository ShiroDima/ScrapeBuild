"use client"

import { useQuery } from "@tanstack/react-query"
import { getUserWorkflows } from "@/actions/workflows"
import { useIsAuthed } from "../useIsAuthed"

export const useGetWorkflows = () => {
    const { isAuthenticated } = useIsAuthed()

    return useQuery({
        queryKey: ["user", "workflows"],
        queryFn: getUserWorkflows,
        enabled: isAuthenticated,
        select: (data) => data === null ? [] : data,
    })
}