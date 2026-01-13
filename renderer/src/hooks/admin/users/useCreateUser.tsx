import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createUser } from "../../../api/userService";
import type { createUserPayload } from "../../../types/user/createUserType";
import type { Response } from "../../../types/leaves/adminLeavesType";
import { toast } from "react-toastify";

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload:createUserPayload) => createUser(payload),
        onSuccess: (data: Response) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })
}