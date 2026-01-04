import { format } from "date-fns"
import { useLeavesYearly } from "../../hooks/leaves/useLeavesYearly"
import { LeavesSummaryCard } from "./LeavesSummaryCard";
import { LeavesTable } from "./LeavesTable";
import { useRef } from "react";
import type { leavesColumnRef } from "../../types/leaves/leavesType";

export function LeavesCard() {
    const year = format(new Date(), "yyyy");
    const { data: yearlyData } = useLeavesYearly(Number(year));
    const summaryData = yearlyData?.result.summary;
    const recordData = yearlyData?.result.records;
    const leavesColumnRef = useRef<leavesColumnRef>(null);

    return (
        <div className="w-full h-full bg-white p-[20px] rounded-2xl overflow-hidden flex flex-col">
            <h2 className="text-lg font-bold text-center">{year}년 휴가 현황</h2>
            <LeavesSummaryCard summaryData={summaryData}/>
            <LeavesTable recordData={recordData} ref={leavesColumnRef} filename={`${year}_Leaves_Record`} />
            {recordData?.length === 0 && (
                <p className="text-base text-center p-[20px]">등록된 데이터가 없습니다.</p>
            )}
        </div>
    )
}