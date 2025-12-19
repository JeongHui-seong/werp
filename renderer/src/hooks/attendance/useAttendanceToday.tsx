import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { fetchTodayAttendance } from "../../api/attendanceService"

export const useAttendanceToday = () => {
    const today = format(new Date(), 'yyyy-MM-dd');

    return useQuery({
        queryKey: ['attendance', today],
        queryFn: () => fetchTodayAttendance(today),
        staleTime: Infinity,
        retry: false,
    })
}