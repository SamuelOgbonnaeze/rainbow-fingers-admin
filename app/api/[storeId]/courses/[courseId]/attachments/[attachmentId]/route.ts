

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, courseId: string, attachmentId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const courseOwner = await prismadb.course.findUnique({
            where: {
                id: params.courseId,
                storeId: params.storeId,
                userId,
            }
        })
        if (!courseOwner) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const attachment = await prismadb.attachment.delete({
            where: {
                id: params.attachmentId,
                courseId: params.courseId
            }
        })

        return NextResponse.json(attachment)

    } catch (error) {
        console.log("ATTACHMENT_ID", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}