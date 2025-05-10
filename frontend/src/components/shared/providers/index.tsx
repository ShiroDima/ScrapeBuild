"use client"
import ThemeProvider from "./ThemeProvider"
import React from "react"
import { QueryClient, QueryClientProvider, isServer } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                experimental_prefetchInRender: true
            }
        }
    })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
    if(isServer) {
        return makeQueryClient()
    }else{
        if(!browserQueryClient) browserQueryClient = makeQueryClient()
        return browserQueryClient
    }
}

const AppProviders = ({children}: Readonly<{children: React.ReactNode}>) => {
    const queryClient = getQueryClient()
    
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                {children}
                <Toaster />
                <ReactQueryDevtools initialIsOpen={false} />
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default AppProviders