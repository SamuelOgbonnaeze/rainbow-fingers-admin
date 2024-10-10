import prismadb from "@/lib/prismadb";
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
        const { courseIds, phonenumber, fullname } = await req.json();

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
            return new NextResponse("No valid products found", { status: 404 });
        }

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

        return NextResponse.json(order, { headers: corsHeaders });
    } catch (error) {
        console.log("COURSE_CHECKOUT_ERROR", error);
        return new NextResponse("Internal_Error", { status: 400 });
    }
}
