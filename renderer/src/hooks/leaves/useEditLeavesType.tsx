import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateLeavesType } from "../../api/leaveService";
import type { upsertLeavesTypePayload, Response } from "../../types/leaves/leavesType";
import { toast } from "react-toastify";

export const useEditLeavesType = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (leaveTypes: upsertLeavesTypePayload) => updateLeavesType(leaveTypes),
        onSuccess: (data: Response) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ['leavesType'] })
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })
}