import { useQuery } from "@tanstack/react-query"
import { fetchYearMonth } from "../../api/attendanceService"
import { format } from "date-fns"

export const useYearMonths = () => {
    const yearMonth = format(new Date(),"yyyy-MM");
    return(
        useQuery({
            queryKey: ['yearMonths', yearMonth],
            queryFn: fetchYearMonth,
            staleTime: Infinity,
            retry: false,
        })
    )
}