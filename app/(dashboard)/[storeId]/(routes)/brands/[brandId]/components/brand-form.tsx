"use client"
import { useState } from "react";
import { z } from "zod"
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";

import { Brand } from "@prisma/client"
import { Trash } from "lucide-react";

import { AlertModal } from "@/components/modals/alert-modal";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";


const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1)
})

type BrandFormValues = z.infer<typeof formSchema>

interface BrandFormProps {
    initialData: Brand | null;
}


export const BrandForm: React.FC<BrandFormProps> = ({ initialData }) => {
    const params = useParams()
    const router = useRouter()

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)

    const title = initialData ? "Edit your brand" : "Create a brand";
    const description = initialData ? "Make changes to your brand" : "Add a new brand";
    const toastMessage = initialData ? "Brand updated." : "Brand created.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<BrandFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            value: ""
        }
    });

    const onSubmit = async (data: BrandFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/brands/${params.brandId}`, data)
            } else {
                await axios.post(`/api/${params.storeId}/brands`, data)
            }
            toast.success(toastMessage)
            router.push(`/${params.storeId}/brands`)
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/brands/${params.brandId}`)
            router.push(`/${params.storeId}/brands`)
            toast.success('Brand deleted')
            router.refresh()
        } catch (error) {
            toast.error("Make sure you removed all products using this brand first")
        } finally {
            setOpen(false)
            setLoading(false)
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading
                    title={title}
                    description={description}
                />

                {initialData && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="icon"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4 " />
                    </Button>)
                }
            </div>

            <Separator />
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full" >
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Brand name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Brand value" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit" >
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    )
}