import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server"



const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders })
}

export async function PUT(
    req:Request,
    {params}:{params:{courseId:string, chapterId:string}}
){
    try{
      
        const { isComplete, userId } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        console.log("isComplete", isComplete)
        const userProgress= await prismadb.userProgress.upsert({
            where:{
                userId_chapterId:{
                    userId,
                    chapterId: params.chapterId
                }
            },
            update:{
                isComplete,
            },
            create:{
                userId,
                chapterId:params.chapterId,
                isComplete,
            }
        })

        return NextResponse.json({userProgress}, { headers: corsHeaders } );

    }catch(error){
        console.log("CHAPTER_ID_PROGRESS", error)
        return new NextResponse("Internal Error", {status: 500})
    }
}