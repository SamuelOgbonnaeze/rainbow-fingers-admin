"use client"

import { useState } from 'react'
import { useParams, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

import { Menu, X } from 'lucide-react'
import { Dialog } from '@headlessui/react'
import IconButton from './ui/icon-button'
import { ModeToggle } from './mode-toggle'


const MobileNav = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) => {
    const [open, setOpen] = useState(false)

    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false)


    const pathname = usePathname();
    const params = useParams();

    const routes = [

        {
            href: `/${params.storeId}`,
            label: "Overview",
            active: pathname === `/${params.storeId}`
        },
        {
            href: `/${params.storeId}/billboards`,
            label: "Billboards",
            active: pathname === `/${params.storeId}/billboards`
        },
        {
            href: `/${params.storeId}/categories`,
            label: "Categories",
            active: pathname === `/${params.storeId}/categories`
        },
        {
            href: `/${params.storeId}/sizes`,
            label: "Sizes",
            active: pathname === `/${params.storeId}/sizes`
        },
        {
            href: `/${params.storeId}/colors`,
            label: "Colors",
            active: pathname === `/${params.storeId}/colors`
        },
        {
            href: `/${params.storeId}/brands`,
            label: "Brands",
            active: pathname === `/${params.storeId}/brands`
        },
        {
            href: `/${params.storeId}/products`,
            label: "Products",
            active: pathname === `/${params.storeId}/products`
        },
        {
            href: `/${params.storeId}/courses/list`,
            label: "Courses",
            active: pathname === `/${params.storeId}/courses/list`
        },
        {
            href: `/${params.storeId}/orders`,
            label: "Orders",
            active: pathname === `/${params.storeId}/orders`
        },
        {
            href: `/${params.storeId}/settings`,
            label: "Settings",
            active: pathname === `/${params.storeId}/settings`
        }
    ]

    return (

        <div className={cn("", className)}>


            {/* Toggle button */}
            <div onClick={onOpen} className="flex items-center gap-x-2 ml-auto lg:hidden text-[#DF3B11]">
                <Menu size={20} />
            </div>

            <Dialog open={open} as="div" className="relative z-40 lg:hidden " onClose={onClose}>
                {/* Background */}
                <div className="fixed inset-0 bg-black bg-opacity-25 " />

                {/* Dialog Position */}
                <div className="fixed inset-0 z-40 flex">
                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-[100px] flex-col overflow-y-auto bg-white dark:bg-black/60 py-4 pb-6 shadow-xl">

                        {/* Close Button */}
                        <div className="flex items-center justify-end px-4 text-[#DF3B11]">
                            <IconButton className="border-[#DF3B11]" icon={<X size={15} onClick={onClose} />} />
                        </div>

                        {/* Mobile Navbar sections */}
                        <div className=' flex top-[0px] h-screen text-[#DF3B11] ' >
                            <ul className='flex flex-col w-full gap-y-6 items-center mt-20 text-center font-inter font-normal text-[18px] leading-[32px] p-2'>
                                {routes.map((route) => (
                                    <Link
                                        key={route.href}
                                        href={route.href}
                                        className={cn("text-sm font-medium transition-colors hover:text-primary",
                                            route.active ? "text-[#DF3B11] " : "text-muted-foreground"
                                        )}
                                    >
                                        {route.label}
                                    </Link>
                                ))}
                                <li>
                                    <div className="ml-auto flex items-center space-x-4">
                                        <ModeToggle />
                                        <UserButton afterSignOutUrl="/" />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>

        </div>

    )
}

export default MobileNav;