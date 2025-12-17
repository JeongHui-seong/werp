import { AttendanceCard } from "../components/dashboard/AttendanceCard"

export default function DashboardPage(){
    return(
        <div className="w-[calc(100%-240px)] h-full">
            <AttendanceCard />
        </div>
    )
}