"use client"

import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item"
import Lucide from 'lucide-react';


const Routes = [
    {
        icon: "List",
        label: "Courses",
        href: "/courses/list",
    },
    {
        icon: "BarChart",
        label: "Analytics",
        href: "/courses/analytics",
    },
]

export const SidebarRoutes = () => {

    const routes = Routes 
    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem
                    key={route.href}
                    icon={route.icon as keyof typeof Lucide.icons}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    )
}