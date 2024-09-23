import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import CourseTable from "./_components/course-table";

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
    </div>

  );
};

export default List;
