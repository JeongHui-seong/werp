import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLeave } from "../../api/leaveService";
import type { createLeavesPayload } from "../../types/leaves/leavesType";
import type { Response } from "../../types/leaves/adminLeavesType";
import { toast } from "react-toastify";

export const useCreateLeaves = (year: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: createLeavesPayload) => createLeave(payload),
        onSuccess: (data: Response) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ['leavesYearly', year] });
        },
        onError: (err) => {
            toast.error(err.message);
        }
    })
}