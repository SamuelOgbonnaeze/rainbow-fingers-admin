"use client"

import { useParams, useRouter } from "next/navigation";


import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { OrderColumn, columns } from "./columns";


interface OrderClientProps {
    data: OrderColumn[]
}

export const OrderClient: React.FC<OrderClientProps> = ({
    data
}) => {
    

    return (
        <>
            <Heading
                title={`Orders (${data.length})`}
                description="Manage all orders information here"
            />
            <Separator />
            <DataTable columns={columns} data={data} searchKey="name" />

        </>
    );
}
