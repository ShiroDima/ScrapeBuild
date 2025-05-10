"use client"

import React, { useState } from "react";

import { routes } from "@/lib/constants";
import Logo from "./Logo";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { MenuIcon } from "lucide-react";


const DesktopSideBar = () => {

    const pathName = usePathname();
    const activeRoute = routes.find(route => route.href.length > 0 && pathName.includes(route.href)) || routes[0];

    return (
        <div 
            className="hidden relative md:block min-w-[250px] max-w-[250px] h-screen overflow-hidden w-full bg-primary/5 dark:bg-secondary/30 dark:text-forwground text-muted-foreground border-r-2 border-separate"
        >
            <div className="flex items-center justify-center gap-2 border-b-[1px] border-separate p-4">
                <Logo />
            </div>
            <div className="p-2">TODO CREDITS</div>
            <div className="flex flex-col p-2 gap-2">
                {routes.map(route => (
                    <Link 
                        key={route.href} 
                        href={route.href === "" ? "/" : route.href}
                        className={buttonVariants({
                            variant: activeRoute.href == route.href ? "sideBarActiveItem" : "sideBarItem"
                        })}
                    >
                        <route.icon size={20} />
                        {route.label}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export function MobileSideBar() {
    const pathName = usePathname();
    const activeRoute = routes.find(route => route.href.length > 0 && pathName.includes(route.href)) || routes[0];
    const [isOpen, setOpen] = useState<boolean>(false)

    return (
        <div className="block border-separate bg-background md:hidden">
            <nav className="container flex items-center justify-between px-8">
                <Sheet open={isOpen} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant={"ghost"} size="icon">
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="w-[400px] sm:w-[540px] space-y-4 p-3" side="left">
                        <Logo />
                        <div className="flex flex-col gap-1">
                            {routes.map(route => (
                                <Link 
                                    key={route.href} 
                                    href={route.href}
                                    className={buttonVariants({
                                        variant: activeRoute.href == route.href ? "sideBarActiveItem" : "sideBarItem"
                                    })}
                                    onClick={() => setOpen(prev => !prev)}
                                >
                                    <route.icon size={20} />
                                    {route.label}
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </div>
    )
}


export default DesktopSideBar