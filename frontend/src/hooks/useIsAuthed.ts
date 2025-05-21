import { checkIsAuthenticated } from "@/actions/workflows"
import React from "react"

export const useIsAuthed = () => {
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false)
    React.useEffect(() => { checkIsAuthenticated().then(() => setIsAuthenticated(true)).catch(() => setIsAuthenticated(false)) }, [])

    return { isAuthenticated }
}