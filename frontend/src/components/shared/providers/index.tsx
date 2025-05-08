import ThemeProvider from "./ThemeProvider"
import React from "react"

const AppProviders = ({children}: Readonly<{children: React.ReactNode}>) => {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    )
}

export default AppProviders