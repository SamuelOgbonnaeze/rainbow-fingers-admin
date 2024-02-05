import { UserButton } from "@clerk/nextjs";


import { MainNav } from "./main-nav";

const Navbar = () => {
    return (
        <div className="border-b">
            <div className="h-16 flex items-center px-4 ">
                <div>
                    This is the store swithcher
                </div>
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    );
}

export default Navbar