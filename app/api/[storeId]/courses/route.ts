import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth();
        const { title } = await req.json();
    

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const course = await prismadb.course.create( {
                data: {
                    userId,
                    title,
                    storeId: params.storeId,
                }
            }
        )

        return NextResponse.json(course)

    } catch (error) {
        console.log(["COURSES"], error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}