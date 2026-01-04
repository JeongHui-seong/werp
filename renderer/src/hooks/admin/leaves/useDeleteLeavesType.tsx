import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteLeavesType } from "../../../api/leaveService";
import type { Response } from "../../../types/leaves/adminLeavesType";
import { toast } from "react-toastify";

export const useDeleteLeavesType = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (ids: number[]) => deleteLeavesType(ids),
        onSuccess: (data: Response) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ['leavesType'] })
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })
}