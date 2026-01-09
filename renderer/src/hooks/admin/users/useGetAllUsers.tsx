import { useQuery } from "@tanstack/react-query";
import type { fetchUserTypeRequest } from "../../../types/user/fetchUserType";
import { fetchAllUsers } from "../../../api/userService";

export const useGetAllUsers = (params: fetchUserTypeRequest) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: ({ queryKey }) => {
      const [, queryParams] = queryKey as ["users", fetchUserTypeRequest];
      return fetchAllUsers(queryParams);
    },
    staleTime: Infinity,
    retry: false,
  });
};
