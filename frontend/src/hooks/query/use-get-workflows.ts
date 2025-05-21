import { useQuery } from "@tanstack/react-query"
import { getUserWorkflows } from "@/actions/workflows"
// import { useIsAuthed } from "../useIsAuthed"

export const useGetWorkflows = () => {
    // const { isAuthenticated } = useIsAuthed()

    return useQuery({
        queryKey: ["user", "workflows"],
        queryFn: getUserWorkflows,
        enabled: true,
        select: (data) => data === null ? [] : data,
    })
}