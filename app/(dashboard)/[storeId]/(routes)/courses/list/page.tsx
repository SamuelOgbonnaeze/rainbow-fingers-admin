"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

const List = () => {
    const params = useParams()
    const storeId = params.storeId


    return (
        <div className=" p-3 w-full">
            Tis is Listkm kjnijbbnkn bvb uiom nbkojnb v mnbvcfdftyui m nbv   jfdfjkkkkkjjkjbv njfduty ytf yot f  6r yofrfxc vc r tytfd  uodyfrdcv 8 rdcvjkvv   iyy rfdx vv itii rdfc
            <Link href={`/${storeId}/courses/list/create`}>
            <Button>
                Create new course
            </Button>
        </Link>
        </div >
     );
}

export default List;