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
       
        const { courseIds, phonenumber, fullname, user } = await req.json();


        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
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

        // If no valid courses are found
        if (!courses || courses.length === 0) {
            return new NextResponse("No valid courses found", { status: 404 });
        }

        // Create purchases for each course
        const purchases = await Promise.all(
            courseIds.map(async (courseId: string) => {
                try {
                    const purchase = await prismadb.purchase.create({
                        data: {
                            userId:user,
                            courseId: courseId, // Connect purchase with the course
                        },
                    });
                    console.log("Purchase created for courseId:", courseId, purchase);
                    return purchase;
                } catch (purchaseError) {
                    console.error("Error creating purchase for courseId:", courseId, purchaseError);
                    throw purchaseError;
                }
            })
        );


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


        return NextResponse.json({ order, purchases }, { headers: corsHeaders });
    } catch (error) {
        console.error("COURSE_CHECKOUT_ERROR", error);
        return new NextResponse("Internal_Error", { status: 400 });
    }
}
