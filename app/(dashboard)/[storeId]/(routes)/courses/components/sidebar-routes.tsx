"use client"

import { useParams } from "next/navigation";
import { SidebarItem } from "./sidebar-item"
import Lucide from 'lucide-react';


export const SidebarRoutes = () => {

   const params= useParams()
const id = `${params.storeId}`
   
const Routes = [
    {
        icon: "List",
        label: "Courses",
        href: `/${id}/courses/list`,
    },
    {
        icon: "BarChart",
        label: "Analytics",
        href: `/${id}/courses/analytics`,
    },
]

    const routes = Routes 
    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem
                    key={route.href}
                    icon={route.icon as keyof typeof Lucide.icons}
                    label={route.label}
                    href={route.href}
                    storeId={id}
                />
            ))}
        </div>
    )
}