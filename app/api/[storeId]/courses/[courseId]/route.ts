import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";


const muxClient = new Mux({
    tokenId: process.env.MUX_TOKEN_ID!,
    tokenSecret: process.env.MUX_TOKEN_SECRET!,
});


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
        console.log("[COURSE_ID]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(
    req:Request,
    {params}: {params:{storeId:string, courseId:string}}
){
try{
    const { userId } = auth()

    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const course = await prismadb.course.findUnique({
        where: {
            userId,
            id: params.courseId,
            storeId: params.storeId,
        },
        include:{
            chapters:{
                include:{
                    muxData:true
                }
            }
        }
    })

    if(!course){
        return new NextResponse("Not found", {status: 404})
    }

    for (const chapter of course.chapters) {
        if (chapter.muxData?.assetId) {
            await muxClient.video.assets.delete(chapter.muxData.assetId);
        }
    }

const deletedCourse= await prismadb.course.delete({
    where:{
        id: params.courseId
    }
})

return NextResponse.json(deletedCourse)

}catch(error){
    console.log("[COURSE_ID_DELETE]", error)
    return new NextResponse("Internal Error", {status:500})
}
}

export async function GET(
    req: Request,
    { params }: { params: { storeId: string, courseId: string } }
) {
    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const course = await prismadb.course.findUnique({
            where: {
                userId,
                id: params.courseId,
                storeId: params.storeId,
            },
        }
        )
        return NextResponse.json(course)
    } catch (error) {
        console.log("[COURSE_ID_GET]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}