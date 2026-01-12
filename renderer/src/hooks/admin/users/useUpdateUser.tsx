import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../../api/userService";
import type { Response } from "../../../types/leaves/adminLeavesType";
import { toast } from "react-toastify";
import type { updateUserHookType } from "../../../types/user/updateUserType";

export function useUpdateUser(){
    const queryClient = useQueryClient();

    return useMutation<Response, Error, updateUserHookType>({
        mutationFn: ({id, payload}) => updateUser(id, payload),
        onSuccess: (data: Response) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })
}