import { SidebarRoutes } from "./components/sidebar-routes";



export default async function CoursesLayout({
    children, params
}: {
    children: React.ReactNode;
    params: { storeId: string }
}) {
    return (
        <div className="w-full h-[100vh] flex ">
            <div className=" w-[200px] border-r border-black flex  overflow-y-hidden bg-white ">
                <div className="flex flex-col w-full ">
                    <SidebarRoutes />
                </div>
            </div>
            <div className="w-full">
                {children}
            </div>

        </div>
    )
}