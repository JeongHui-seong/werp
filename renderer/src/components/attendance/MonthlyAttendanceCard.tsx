import { useSearchParams } from "react-router-dom";
import { useYearMonths } from "../../hooks/attendance/useYearMonths";
import { useEffect } from "react";
import { useAttendanceMonthly } from "../../hooks/attendance/useAttendanceMonthly";

export function MonthlyAttendanceCard() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { data } = useYearMonths();
    const yearMonth = searchParams.get("yearMonth")
    const { data: monthlyAttendanceData } = useAttendanceMonthly(yearMonth)
    useEffect(() => {
        if (!data?.yearMonth?.length) return;
        if (!yearMonth) {
            setSearchParams({"yearMonth": data?.yearMonth[0]})
        }
    },[data, setSearchParams]);
    console.log("yearMonths : ", data)
    console.log("monthlyAttendanceData : " , monthlyAttendanceData)
    // TODO
    // 5. tanstack table에 적용
    return(
        <div className="w-full h-full bg-white p-[20px] rounded-2xl">
            <select
                name="yearMonth"
                id="yearMonth"
                value={yearMonth ?? ""}
                onChange={(e) => setSearchParams({ yearMonth : e.target.value })}
                >
                {data?.yearMonth?.map((d:string) => (
                    <option key={d} value={d}>
                        {d}
                    </option>
                ))}
            </select>
        </div>
    )
}