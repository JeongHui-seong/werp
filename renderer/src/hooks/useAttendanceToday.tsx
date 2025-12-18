import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { fetchTodayAttendance } from "../api/attendanceService"
import { useEffect, useState } from "react";

export const useAttendanceToday = () => {
    const [today, setToday] = useState(format(new Date(), 'yyyy-MM-dd'));

    // 랜더링 시 오늘 날짜를 확인하기 위한 로직
    useEffect(() => {
        const now = new Date();
        const nextMidnight = new Date();
        nextMidnight.setHours(24, 0, 0, 0);

        const timeout = setTimeout(() => {
            const newToday = format(new Date(), "yyyy-MM-dd");
            setToday(newToday);
        }, nextMidnight.getTime() - now.getTime());
        return () => clearTimeout(timeout)
    },[])

    return useQuery({
        queryKey: ['attendance', today],
        queryFn: () => fetchTodayAttendance(today),
        staleTime: Infinity,
        retry: false,
    })
}