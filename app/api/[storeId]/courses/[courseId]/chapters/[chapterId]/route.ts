import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import Mux from "@mux/mux-node"
import prismadb from "@/lib/prismadb";


const muxClient = new Mux({
    tokenId: process.env.MUX_TOKEN_ID!,
    tokenSecret: process.env.MUX_TOKEN_SECRET!,
});



export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string, chapterId: string } }
) {
    try {
        const { userId } = auth();
        const { isPublished, ...values } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const ownCourse = await prismadb.course.findUnique({
            where: {
                id: params.courseId,
                userId
            }
        })

        if (!ownCourse) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const chapter = await prismadb.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            },
            data: {
                ...values
            }
        })

        if (values.videoUrl) {
            const existingMuxData = await prismadb.muxData.findFirst({
                where: {
                    chapterId: params.chapterId,
                }
            })

            if (existingMuxData) {
                await muxClient.video.assets.delete(existingMuxData.assetId);
                await prismadb.muxData.delete({
                    where: {
                        id: existingMuxData.id
                    }
                })
            }

            const asset = await muxClient.video.assets.create({
                input: values.videoUrl,
                playback_policy: ['public'],
                test: false,
                encoding_tier: 'baseline',
            });

            await prismadb.muxData.create({
                data: {
                    chapterId: params.chapterId,
                    assetId: asset.id,
                    playbackId: asset.playback_ids?.[0]?.id
                }
            });

        }

        return NextResponse.json(chapter)
    } catch (error) {
        console.log("[COURSE_CHAPTER_ID]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { courseId: string, chapterId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const ownCourse = await prismadb.course.findUnique({
            where: {
                id: params.courseId,
                userId,
            }
        })

        if (!ownCourse) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const chapter = await prismadb.chapter.findUnique({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            },
        })

        if (!chapter) {
            return new NextResponse("Not found", { status: 404 })
        }

        if (chapter.videoUrl) {
            const existingMuxData = await prismadb.muxData.findFirst({
                where: {
                    chapterId: params.chapterId,
                }
            })

            if (existingMuxData) {
                await muxClient.video.assets.delete(existingMuxData.assetId);
                await prismadb.muxData.delete({
                    where: {
                        id: existingMuxData.id
                    }
                })
            }
        }

        const deletedChapter = await prismadb.chapter.delete({
            where: {
                id: params.chapterId,
            }
        })

        const publishedChaptersInCourse = await prismadb.chapter.findMany({
            where: {
                courseId: params.courseId,
                isPublished: true,
            }
        })

        if (!publishedChaptersInCourse.length) {
            await prismadb.course.update({
                where: {
                    id: params.courseId
                },
                data: {
                    isPublished: false,
                }
            })
        }

        return NextResponse.json(deletedChapter); 
    } catch (error) {
        console.log("CHAPTER_ID", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

