import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clockIn } from "../../api/attendanceService";
import { toast } from "react-toastify";
import { format } from 'date-fns';
import type { attendanceResponse } from "../../types/attendance/attendanceData";

export const useClockIn = () => {
    const queryClient = useQueryClient();
    const today = format(new Date(), 'yyyy-MM-dd');

    return useMutation({
        mutationFn: () => clockIn( today ),
        onSuccess: (data:attendanceResponse) => {
            toast.success(data.message);
            queryClient.setQueryData(
                ['attendance', today]
                , data)
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })
}