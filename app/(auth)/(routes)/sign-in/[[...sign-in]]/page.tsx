import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className='w-full h-screen flex overflow-hidden '>
            {/* Left side */}
            <div className=' h-full  w-full lg:w-1/2  bg-[url("/images/forget_password.png")] bg-no-repeat bg-center bg-cover absolute lg:relative -z-10 lg:z-0 '>
            </div>
            {/* Right side */}
            <div className=' w-full h-full  lg:w-1/2  '>
                <div className="flex items-center justify-center px-2 lg:px-12 sm:py-4 self-center mt-[10%] md:mt-[20%] lg:py-12">
                    <SignIn />
                </div>
            </div >
        </div >

    );
}