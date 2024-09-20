"use client"

import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";


interface ChapterActionsProps {
    disabled: boolean;
    courseId: string;
    chapterId: string;
    isPublished: boolean;
}

export const ChapterActions = ({ disabled, courseId, chapterId, isPublished }: ChapterActionsProps) => {
    const router = useRouter()
    const params= useParams()
    const [isLoading, setIsLoading] = useState(false)

    const onClick = async () => {
        try {
            setIsLoading(true)

            if (isPublished) {
                await axios.patch(`/api/${params.storeId}/courses/${courseId}/chapters/${chapterId}/unpublish`)
                toast.success("Chapter unpublished")
            } else {
                await axios.patch(`/api/${params.storeId}/courses/${courseId}/chapters/${chapterId}/publish`)
                toast.success("Chapter published")
            }

            router.refresh()
        } catch {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true);

            await axios.delete(`/api/${params.storeId}/courses/${courseId}/chapters/${chapterId}`);
            toast.success("Chapter deleted")
            router.refresh()
            router.push(`/${params.storeId}/courses/list/${courseId}`)
        } catch {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex items-center gap-x-2">
            <Button
                onClick={onClick}
                disabled={disabled || isLoading}
                variant="outline"
                size="sm"
            >
                {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <ConfirmModal onConfirm={onDelete}>
                <Button
                    disabled={isLoading}
                    variant="destructive"
                    size="sm"
                >
                    <Trash className="w-4 h-4" />
                </Button>
            </ConfirmModal>
        </div>
    )
}