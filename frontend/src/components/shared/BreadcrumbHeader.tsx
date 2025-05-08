"use client"


import { usePathname } from "next/navigation"
import React from "react"
import { 
    Breadcrumb, 
    BreadcrumbItem, 
    BreadcrumbLink, 
    BreadcrumbList, 
    BreadcrumbSeparator 
} from "../ui/breadcrumb"
import { MobileSideBar } from "./Sidebar"


const BreadcrumbHeader = () => {

    const pathName = usePathname()
    const paths = pathName === "/" ? [""] : pathName.split("/")


    return (
        <div className="flex item-center flex-start">
            <MobileSideBar />
            <Breadcrumb>
                <BreadcrumbList>
                    {
                        paths.map((path, idx) => (
                            <React.Fragment key={idx}>
                                <BreadcrumbItem>
                                    <BreadcrumbLink className="capitalize" href={`/${path}`}>
                                        {path === "" ? "home" : path}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </React.Fragment>
                        ))
                    }
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}

export default BreadcrumbHeader