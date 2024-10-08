import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"


export async function POST(
    req: Request,
    { params }: { params: { courseId: string, storeId: string } }
) {
    try {
        const { userId } = auth()
        const { title } = await req.json()
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const courseOwner = await prismadb.course.findUnique({
            where: {
                id: params.courseId,
                userId,
                storeId: params.storeId
            }
        })

        if (!courseOwner) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const lastChapter = await prismadb.chapter.findFirst({
            where: {
                courseId: params.courseId
            },
            orderBy: {
                position: "desc"
            }
        })

        const newPosition = lastChapter ? lastChapter.position + 1 : 1;

        const chapter = await prismadb.chapter.create({
            data: {
                title,
                courseId: params.courseId,
                position: newPosition,
            }
        })

        return NextResponse.json(chapter)
    } catch (error) {
        console.log("[CHAPTERS]", error)
        return new NextResponse("INTERNAL ERROR", { status: 500 })
    }
}