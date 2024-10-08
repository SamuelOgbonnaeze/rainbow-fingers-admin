"use client"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import { Pencil } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Combobox } from "@/components/ui/combobox";

interface CourseCategoryFormProps {
    initialData: Course;
    courseId: string;
    options: { label: string, value: string }[];
}

const formSchema = z.object({
    courseCategoryId: z.string().min(1)
});

const CourseCategoryForm = ({ initialData, courseId, options }: CourseCategoryFormProps) => {
    const router = useRouter();
    const params= useParams()
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            courseCategoryId: initialData?.courseCategoryId || ""
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            console.log("Submitting values:", values); // Log the values to see what is being sent
            await axios.patch(`/api/${params.storeId}/courses/${courseId}`, values);
            toast.success("Course category updated");
            toggleEdit();
            router.refresh();
        } catch (error) {
            console.error("Error updating course category:", error); // Log the error for debugging
            toast.error("Something went wrong");
        }
    };

    const selectedOption = options.find((option) => option.value === initialData?.courseCategoryId);

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course category
                <Button
                    className="flex items-center justify-between"
                    variant="ghost"
                    onClick={toggleEdit}
                >
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit category
                        </>
                    )}
                </Button>
            </div>

            {!isEditing && (
                <p className={cn("text-sm mt-2", !initialData?.courseCategoryId && "text-slate-500 italic")}>
                    {selectedOption?.label || "No category selected"}
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField
                            control={form.control}
                            name="courseCategoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Combobox 
                                            options={options ?? []} 
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
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

export default CourseCategoryForm;
