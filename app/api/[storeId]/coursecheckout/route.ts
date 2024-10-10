import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth()
        const { courseIds, phonenumber, fullname } = await req.json();

        if(!userId){
            return new NextResponse("Unauthorized", {status:401})
        }

        if (!courseIds || courseIds.length === 0) {
            return new NextResponse("Course ids are required", { status: 400 });
        }

        // Fetch courses from the database
        const courses = await prismadb.course.findMany({
            where: {
                id: {
                    in: courseIds,
                },
            },
        });

        // console.log(courses)

        // If courses are found
        if (!courses || courses.length === 0) {
            return new NextResponse("No valid courses found", { status: 404 });
        }
        // create a purcase for user
        const purchases = await Promise.all(
            courseIds.map(async (courseId: string) => {
                return await prismadb.purchase.create({
                    data: {
                        userId,
                        courseId: courseId,  // Connect purchase with the course
                    },
                });
            })
        );
        console.log(purchases)
        // Create the order
        const order = await prismadb.order.create({
            data: {
                storeId: params.storeId,
                isPaid: true,
                phone: phonenumber,
                name: fullname,
                orderItems: {
                    create: courseIds.map((courseId: string) => ({
                        course: {
                            connect: {
                                id: courseId,
                            },
                        },
                    })),
                },
            },
        });

        // console.log(order)

        return NextResponse.json({order, purchases}, { headers: corsHeaders });
    } catch (error) {
        console.log("COURSE_CHECKOUT_ERROR", error);
        return new NextResponse("Internal_Error", { status: 400 });
    }
}
