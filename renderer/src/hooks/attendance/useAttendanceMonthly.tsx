import { useQuery } from "@tanstack/react-query";
import { fetchMonthlyAttendance } from "../../api/attendanceService";

export const useAttendanceMonthly = (yearMonth: string | null) => {
    return useQuery({
        queryKey: ['attendanceMonthly', yearMonth],
        queryFn: () => {
            console.log("fetch month : ", yearMonth);
            return fetchMonthlyAttendance(yearMonth!, "09:00");
        },
        staleTime: Infinity,
        retry: false,
        enabled: !!yearMonth,
    });
}