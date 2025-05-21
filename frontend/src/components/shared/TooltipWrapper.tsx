"use client"


import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from "@/components/ui/tooltip";
import { PropsWithChildren, FC, ReactNode } from "react";


interface TooltipWrapperProps extends PropsWithChildren {
    content: ReactNode;
    side?: "top" | "bottom" | "left" | "right"
}

const TooltipWrapper: FC<TooltipWrapperProps> = ({children, content, side}) => {
    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side}>{content}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}


export default TooltipWrapper