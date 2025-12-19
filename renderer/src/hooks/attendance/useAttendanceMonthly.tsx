import { useQuery } from "@tanstack/react-query";
import { fetchMonthlyAttendance } from "../../api/attendanceService";

export const useAttendanceMonthly = (yearMonth: string | null) => {
    return useQuery({
        queryKey: ['attendanceMonthly', yearMonth],
        queryFn: () => fetchMonthlyAttendance(yearMonth!, "09:00"),
        staleTime: Infinity,
        retry: false,
        enabled: !!yearMonth,
    });
}