import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clockIn } from "../api/attendanceService";

export const useClockIn = () => {
    //TODO: 백엔드 코드 수정(success: true/false가 아닌 throw new error 형식으로), tanstack query on success, on error 기능 구현
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: clockIn,
        onSuccess: (data) => {
        }
    })
}