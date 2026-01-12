import { useQuery } from "@tanstack/react-query";
import { fetchRoleAndDept } from "../../../api/userService";

export function useGetRoleDept() {
    return useQuery({
        queryKey: ["role-dept"],
        queryFn: () => fetchRoleAndDept(),
        staleTime: Infinity,
        retry: false,
    })
}