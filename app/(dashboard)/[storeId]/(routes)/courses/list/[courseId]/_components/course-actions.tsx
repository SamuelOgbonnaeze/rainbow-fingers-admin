"use client"

import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { useConfettiStore } from "@/hooks/use-confetti";


interface CourseActionsProps {
    disabled: boolean;
    courseId: string;
    isPublished: boolean;
}

export const CourseActions = ({ disabled, courseId, isPublished }: CourseActionsProps) => {
    const router = useRouter()
    const params = useParams()
    const confetti = useConfettiStore();
    const [isLoading, setIsLoading] = useState(false)

    const onClick = async () => {
        try {
            setIsLoading(true)

            if (isPublished) {
                await axios.patch(`/api/${params.storeId}/courses/${courseId}/unpublish`)
                toast.success("Course unpublished")
            } else {
                await axios.patch(`/api/${params.storeId}/courses/${courseId}/publish`)
                toast.success("Course published")
                confetti.onOpen()
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

            await axios.delete(`/api/${params.storeId}/courses/${courseId}`);
            toast.success("Course deleted")
            router.push(`/${params.storeId}/courses/list`)
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