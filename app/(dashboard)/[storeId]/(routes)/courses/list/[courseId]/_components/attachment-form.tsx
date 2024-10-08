"use client"

import { z } from "zod"
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { Attachment, Course } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { PlusCircle, File, Loader2, X } from 'lucide-react';
import { FileUpload } from "@/components/file-upload";


interface AttachmentFormProps {
    initialData: Course & { attachments: Attachment[] };
    courseId: string;
}

const formSchema = z.object({
    url: z.string().min(1),
})

const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
    const router = useRouter();
    const params = useParams()
    const [isEditing, setIsEditing] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const toggleEdit = () => setIsEditing((current) => !current)



    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/${params.storeId}/courses/${courseId}/attachments`, values)
            toast.success("Course attachment updated")
            toggleEdit();
            router.refresh()
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    const onDelete = async (id: string) => {
        try {
            console.log(id)
            setDeletingId(id);
            await axios.delete(`/api/${params.storeId}/courses/${courseId}/attachments/${id}`);
            toast.success("Attachment deleted");
            router.refresh()
        } catch {
            toast.error("Something went wrong")
        } finally {
            setDeletingId(null)
        }
    }


    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4" >
            <div className="font-medium flex items-center justify-between">
                Course attachments
                <Button
                    className="flex items-center justify-between  "
                    variant="ghost"
                    onClick={toggleEdit}

                >
                    {isEditing && (
                        <>Cancel</>
                    )
                    }

                    {!isEditing && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add a file
                        </>
                    )}


                </Button>

            </div>
            {!isEditing && (
                <>
                    {initialData.attachments.length === 0 && (
                        <p className="text-sm mt-2 text-slate-500 italic">
                            No attachments yet
                        </p>
                    )}
                    {initialData.attachments.length > 0 && (
                        <div className="space-y-2">
                            {initialData.attachments.map((attachment) => (
                                <div key={attachment.id} className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md">
                                    <File className="h-4 w-4 flex-shrink-0 mr-2" />
                                    <p className="text-xs line-clamp-1">{attachment.name}</p>
                                    {deletingId === attachment.id && (
                                        <div className="ml-auto">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        </div>
                                    )}
                                    {deletingId !== attachment.id && (
                                        <button onClick={() => onDelete(attachment.id)} className="ml-auto hover:opacity-75 transition">
                                            <X className=" h-4 w-4 " />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="courseAttachment"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ url: url })
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        Add extra materials needed for the course
                    </div>
                </div>
            )}
        </div>
    );
}

export default AttachmentForm;