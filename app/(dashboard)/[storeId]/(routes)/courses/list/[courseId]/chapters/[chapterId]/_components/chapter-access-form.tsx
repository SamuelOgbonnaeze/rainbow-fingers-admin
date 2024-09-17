"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react";
import { useForm } from "react-hook-form"
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";
import { Pencil } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Preview } from "@/components/preview";
import { Checkbox } from "@/components/ui/checkbox"


interface ChapterAccessFormProps {
    initialData: Chapter;
    courseId: string;
    chapterId: string;
}

const formSchema = z.object({
    isFree: z.boolean().default(false),
})

const ChapterAccessForm = ({ initialData, courseId, chapterId }: ChapterAccessFormProps) => {
    const router = useRouter();
    const params= useParams()
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            isFree: Boolean(initialData.isFree)
        }
    })

    const { isSubmitting, isValid } = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            console.log("Submitting values:", values); // Log the values to see what is being sent
            await axios.patch(`/api/${params.storeId}/courses/${courseId}/chapters/${chapterId}`, values)
            toast.success("Chapter updated")
            toggleEdit();
            router.refresh()
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4" >
            <div className="font-medium flex items-center justify-between">
                Chapter access
                <Button
                    className="flex items-center justify-between  "
                    variant="ghost"
                    onClick={toggleEdit}

                >
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit access
                        </>
                    )}
                </Button>

            </div>

            {!isEditing && (
                <p className={cn(
                    "text-sm mt-2",
                    !initialData.isFree && "text-slate-500 italic"
                )}>
                    {initialData.isFree ? (<>This chapter is free for preview.</>) : (<>This chapter is not free.</>)}
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField
                            control={form.control}
                            name="isFree"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border-p4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormDescription>
                                            Check this box if you want to make this chapter free for preview.
                                        </FormDescription>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button
                                disabled={!isValid || isSubmitting}
                                type="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
}

export default ChapterAccessForm;