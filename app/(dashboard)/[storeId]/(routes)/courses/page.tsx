import { Sidebar } from "lucide-react";
import { SidebarRoutes } from "./components/sidebar-routes";

const CoursesPage = async (
    { params }: { params: { storeId: string } }
) => {




    return (
        <div className='w-full h-screen flex-col flex '>
            <div className="h-full w-[200px] border-r border-black flex flex-col overflow-y-hidden bg-white ">
                <div className="flex flex-col w-full ">
                    <SidebarRoutes />
                </div>
            </div>

            {/* <div className="flex h-full">
            <Sidebar className="w-full h-full" />
            </div> */}



        </div>
    )
}

export default CoursesPage