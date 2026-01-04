import { useQuery } from "@tanstack/react-query"
import { fetchLeavesYearly } from "../../api/leaveService"

export const useLeavesYearly = (year: number) => {
    return useQuery({
        queryKey: ['leavesYearly', year],
        queryFn: () => fetchLeavesYearly(year),
        staleTime: Infinity,
        retry: false,
    })
}