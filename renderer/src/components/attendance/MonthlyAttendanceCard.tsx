import { useSearchParams } from "react-router-dom";
import { useYearMonths } from "../../hooks/attendance/useYearMonths";
import { useEffect, useState, useRef } from "react";
import { useAttendanceMonthly } from "../../hooks/attendance/useAttendanceMonthly";
import { MonthlyAttendanceSummaryCard } from "./MonthlyAttendanceSummaryCard";
import { MonthlyAttendanceTable } from "./MonthlyAttendanceTable";
import type { monthlyAttendanceRef } from "../../types/attendance/attendanceRow";

export function MonthlyAttendanceCard() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { data } = useYearMonths();
    const [yearMonth, setYearMonth] = useState<string | null>(null)
    const { data: monthlyAttendanceData } = useAttendanceMonthly(yearMonth);
    const summaryData = monthlyAttendanceData?.summary;
    const recordData = monthlyAttendanceData?.records;
    const tableRef = useRef<monthlyAttendanceRef>(null)

    // URL → state 동기화
    useEffect(() => {
        const ym = searchParams.get("yearMonth");
        if (ym) setYearMonth(ym);
    }, [searchParams]);

    // 초기값 세팅
    useEffect(() => {
        if (!data?.yearMonth?.length) return;
        if (yearMonth) return;

        const first = data.yearMonth[0];
        setSearchParams({ yearMonth: first });
        setYearMonth(first);
    }, [data, yearMonth, setSearchParams]);

    return(
        <div className="w-full h-full bg-white p-[20px] rounded-2xl overflow-hidden flex flex-col">
            <h2 className="text-lg text-center font-bold">{yearMonth} 출퇴근 근태 현황</h2>
            <div className="w-full flex items-center justify-end gap-[20px] mt-[20px]">
                <button
                    onClick={() => tableRef?.current?.exportToCsv()}
                    className="text-base rounded-2xl px-[12px] py-[6px] cursor-pointer bg-green-700 text-white hover:bg-green-600 transition-all"
                >Export to CSV</button>
                <select
                    name="yearMonth"
                    id="yearMonth"
                    value={yearMonth ?? ""}
                    onChange={(e) => setSearchParams({ yearMonth : e.target.value })}
                    className="text-base border rounded-2xl border-gray-40 px-[12px] py-[6px]"
                    >
                    {data?.yearMonth?.map((d:string) => (
                        <option key={d} value={d}>
                            {d}
                        </option>
                    ))}
                </select>
            </div>
            <MonthlyAttendanceSummaryCard summaryData = {summaryData}/>
            <MonthlyAttendanceTable recordData = {recordData} ref={tableRef} filename={`${yearMonth}_Monthly_Attendance`}/>
        </div>
    )
}