"use client"

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

import { BrandColumn, columns } from "./columns";


interface BrandClientProps {
    data: BrandColumn[]
}

export const BrandClient: React.FC<BrandClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams()

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Brands (${data.length})`}
                    description="Manage store brands"
                />
                <Button onClick={() => router.push(`/${params.storeId}/brands/new`)}>
                    <Plus className=" mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="name" />
            <Heading title="API" description="Api calls for Brands" />
            <Separator />
            <ApiList entityName="brands" entityIdName="brandId" />
        </>
    );
}
