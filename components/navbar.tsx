import { UserButton, auth } from "@clerk/nextjs";

import Image from "next/image";

import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import logo from "@/public/images/logo.png";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { ModeToggle } from "./mode-toggle";
import MobileNav from "./mobile-nav";


const Navbar = async () => {
    const { userId } = auth()

    if (!userId) {
        redirect("/sign-in")
    }

    const stores = await prismadb.store.findMany({
        where: {
            userId
        }
    })

    return (
        <div className="border-b">
            <div className="h-16 flex items-center px-4 ">
                <div className="flex items-center space-x-2">
                    <Image
                        src={logo}
                        alt="Rainbow Fingers"
                        width={80}
                        height={80}
                    />
                    <StoreSwitcher items={stores} />
                </div>
                {/* Mobile Navbar */}
                <MobileNav className="ml-auto py-2 px-4 md:px-6  flex lg:hidden" />

                {/* Desktop Navbar */}
                <div className="w-full hidden lg:flex">
                    <MainNav className="mx-6" />
                    <div className="ml-auto flex items-center space-x-4">
                        <ModeToggle />
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar