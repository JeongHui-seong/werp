import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLeavesPolicy } from "../../api/leaveService";
import type { Response, updateLeavesPolicyPayload } from "../../types/leaves/leavesType";
import { toast } from "react-toastify";

export function useEditLeavePolicy(year: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ year, days} : updateLeavesPolicyPayload) => updateLeavesPolicy(year, days),
        onSuccess: (data: Response) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ['leavePolicy', year]})
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })
}