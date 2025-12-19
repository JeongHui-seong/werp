import { MonthlyAttendanceCard } from "../components/attendance/MonthlyAttendanceCard"

export default function AttendancePage(){
    return(
        <div className="w-[calc(100%-240px)] h-full pb-[20px]">
            <MonthlyAttendanceCard />
        </div>
    )
}