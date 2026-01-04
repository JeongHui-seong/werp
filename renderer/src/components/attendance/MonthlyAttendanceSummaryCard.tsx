import type { attendanceSummaryProps, attendanceSummary } from "../../types/attendance/attendanceSummary";
import { timeFormatMinutes } from "../../utils/timeFormat";

export function MonthlyAttendanceSummaryCard({summaryData}:attendanceSummaryProps){
    const attendanceSummaryConfig = {
        totalWorkMinutes: "총 근무시간",
        avgWorkMinutes: "평균 근무시간",
        overtimeMinutes: "초과 근무시간",
        lateMinutes: "지각"
    } as const;

    const summaryList = summaryData ?
        (Object.keys(attendanceSummaryConfig) as (keyof attendanceSummary)[]).map(
            (key) => ({
                key,
                label: attendanceSummaryConfig[key],
                value: timeFormatMinutes(summaryData[key]),
            }))
        : [];
    return(
        <ul className="w-full flex items-center justify-between gap-[20px] mt-[20px] flex-wrap">
            {summaryList.map(item => (
                <li key={item.key} className="rounded-2xl border border-gray-40 py-[12px] flex-1 text-center min-w-[110px]">
                    <h3 className="text-sm">{item.label}</h3>
                    <p className="text-lg">{item.value}</p>
                </li>
            ))}
        </ul>
    )
}