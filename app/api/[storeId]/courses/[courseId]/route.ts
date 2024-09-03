import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, courseId: string } }
) {
    try {
        const { userId } = auth()
        const values = await req.json()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const course = await prismadb.course.update({
            where: {
                userId,
                id: params.courseId,
                storeId: params.storeId,
            },
            data: {
                ...values
            }
        }
        )
        return NextResponse.json(course)
    } catch (error) {
        console.log(["COURSE_ID"], error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}