import { IconBadge } from "@/components/icon-badge";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { CircleDollarSign, LayoutList, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import ImageForm from "./_components/image-form";
import CourseCategoryForm from "./_components/course-category-form";
import PriceForm from "./_components/price-form";

const CourseIdPage = async (
    { params }: { params: { storeId: string, courseId: string } }
) => {

    const { userId } = auth();

    if (!userId) {
        return redirect(`/${params.storeId}/courses`)
    }

    const course = await prismadb.course.findUnique({
        where: {
            id: params.courseId,
            storeId: params.storeId,
            userId,
        }
    })

    if (!course) {
        return redirect(`/${params.storeId}/courses`)
    }

    const courseCategories = await prismadb.courseCategory.findMany({
        orderBy: {
            name: "asc"
        }
    })



    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.courseCategoryId,
    ]

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const completionText = `(${completedFields}/${totalFields})`

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">
                        Course Setup
                    </h1>
                    <span className="text-sm text-slate-700">
                        Complete all fields {completionText}
                    </span>
                </div>
            </div>
            <div className="grid grid-cols.1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge size="sm" variant="default" icon={LayoutList} />
                        <h1 className="text-xl">
                            Customize your course
                        </h1>
                    </div>
                    <TitleForm initialData={course} courseId={course.id} />
                    <DescriptionForm initialData={course} courseId={course.id} />
                    <ImageForm initialData={course} courseId={course.id} />
                    <CourseCategoryForm initialData={course} courseId={course.id}
                        options={courseCategories.map((courseCategory) => ({
                            label: courseCategory?.name,
                            value: courseCategory?.id
                        }))}
                    />
                </div>
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge size="sm" variant="default" icon={ListChecks} />
                            <h1 className="text-xl">
                                Course chaptersh
                            </h1>
                        </div>
                        <div>TODO: CAPTERS</div>
                    </div>
                    <div>
                        <div className="flex items-center gap-x-2">
                        <IconBadge size="sm" variant="default" icon={CircleDollarSign} />
                            <h1 className="text-xl">
                                Sell your course
                            </h1>
                        </div>
                        <PriceForm initialData={course} courseId={course.id} />
                    </div>

                </div>

            </div>
        </div>
    );
}

export default CourseIdPage;