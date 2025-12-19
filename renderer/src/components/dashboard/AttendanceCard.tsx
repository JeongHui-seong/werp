import { useAttendanceToday } from "../../hooks/attendance/useAttendanceToday"
import { formatInTimeZone } from "date-fns-tz"

export function AttendanceCard(){
    const { data } = useAttendanceToday();
    const attendance = data?.attendance;
    const clockinTime = attendance?.clockin ? formatInTimeZone(new Date(attendance?.clockin), "Asia/Seoul", "HH시 mm분") : "-";
    const clockoutTime = attendance?.clockout ? formatInTimeZone(new Date(attendance?.clockout), "Asia/Seoul", "HH시 mm분") : "-";

    return(
        <div className="max-w-[360px] rounded-2xl bg-white">
            <div className="w-full p-[20px]">
                <h2 className="text-base font-bold">금일 출 / 퇴근 시간</h2>
                <div className="flex flex-wrap gap-[20px] mt-[20px]">
                    <div className="flex-1">
                        <p className="text-sm">출근 시간</p>
                        <p className="text-lg">{clockinTime}</p>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm">퇴근 시간</p>
                        <p className="text-lg">{clockoutTime}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}