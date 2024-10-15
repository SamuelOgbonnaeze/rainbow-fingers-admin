import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import CourseTable from "./_components/course-table";
import { ApiList } from "@/components/ui/api-list";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

const List = async () => {
  const { userId } = auth();


  if (!userId) {
    return redirect("/");
  }

  const courses = await prismadb.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });


  return (
    <div className="p-3 w-full">
      <CourseTable courses={courses} />

      <div className="mt-8 w-full">
        <div className="flex p-3">
          <Heading 
          title="API"
          description="Api calls for courses"
          />
        </div>
        <Separator /> 
        <ApiList
          entityName="courses"
          entityIdName="courseId"
        />
      </div>
    </div>

  );
};

export default List;
