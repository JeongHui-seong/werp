import { useQuery } from "@tanstack/react-query";
import { fetchLeavesPolicy } from "../../api/leaveService";

export function useGetLeavePolicy(year: string) {
    return (
        useQuery({
            queryKey: ['leavePolicy', year],
            queryFn: () => fetchLeavesPolicy(Number(year)),
            staleTime: Infinity,
            retry: false,
            enabled: !!year
        })
    )
}