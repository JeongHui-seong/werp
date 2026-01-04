import { useQuery } from "@tanstack/react-query"
import { fetchLeavesType } from "../../../api/leaveService"

export const useLeavesType = () => {
    return useQuery({
        queryKey: ['leavesType'],
        queryFn: fetchLeavesType,
        staleTime: Infinity,
        retry: false
    })
}