import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteUser } from "../../../api/userService";
import { toast } from "react-toastify";
import type { Response } from "../../../types/leaves/adminLeavesType";

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (ids: string[]) => deleteUser(ids),
        onSuccess: (data: Response) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey : ['users'] })
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })
}