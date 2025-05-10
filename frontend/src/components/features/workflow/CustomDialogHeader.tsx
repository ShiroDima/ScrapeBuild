"use client"

import { DialogHeader } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { DialogTitle } from "@radix-ui/react-dialog";
import { LucideIcon } from "lucide-react";
import React from "react";


interface DialogHeaderProps {
    title?: string
    subTitle?: string
    Icon?: LucideIcon

    iconClassName?: string
    titleClassName?: string
    subTitleClasName?: string
}

const CustomDialogHeader = ({title, titleClassName, subTitle, subTitleClasName, Icon, iconClassName}: DialogHeaderProps) => {
    return (
        <DialogHeader className="py-6">
            <DialogTitle asChild>
                <div className="flex flex-col items-center gap-2 mb-2">
                    {Icon && (
                        <Icon size={20} className={cn("stroke-primary", iconClassName)} />
                    )}
                    {
                        title && (
                            <p className={cn("text-xl text-primary", titleClassName)}>{title}</p>
                        )
                    }
                    {
                        subTitle && (
                            <p className={cn("text-sm text-muted-foreground", subTitleClasName)}>{subTitle}</p>
                        )
                    }
                </div>
            </DialogTitle>
            <Separator />
        </DialogHeader>
    )
}


export default CustomDialogHeader