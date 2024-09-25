"use client"

import { useParams } from "next/navigation";
import { getColumns } from "./columns";
import { Course } from "@prisma/client";
import { DataTable } from "./data-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";


interface CourseTableProps {
  courses: Course[]
}

const CourseTable = ({ courses }: CourseTableProps) => {
  const params = useParams();
  const storeId = params.storeId;

  const columns = getColumns(`${storeId}`);

  return (
    <div>

      <div className=" w-full p-6">
        <div className="flex items-center justify-between">
          <Heading
            title={`Courses (${courses.length})`}
            description="Manage all learning courses "
          />
          <Link href={`/${storeId}/courses/list/create`}>
            <Button>
              <Plus className=" mr-2 h-4 w-4" />
              New Course
            </Button>
          </Link>
        </div>
      </div>
      <Separator className="w-full" />
      <DataTable columns={columns} data={courses} />

    </div>
  );
};

export default CourseTable;