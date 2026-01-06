import { format } from "date-fns"
import { useLeavesYearly } from "../../hooks/leaves/useLeavesYearly"
import { LeavesSummaryCard } from "./LeavesSummaryCard";
import { LeavesTable } from "./LeavesTable";
import { useRef, useState } from "react";
import type { leavesColumnRef } from "../../types/leaves/leavesType";
import { CreateLeavesDialog } from "./CreateLeavesDialog";

export function LeavesCard() {
    const year = format(new Date(), "yyyy");
    const { data: yearlyData } = useLeavesYearly(Number(year));
    const summaryData = yearlyData?.result.summary;
    const recordData = yearlyData?.result.records;
    const leavesColumnRef = useRef<leavesColumnRef>(null);
    const [open, setOpen] = useState<boolean>(false)

    return (
        <>  
            {open && 
                <CreateLeavesDialog setOpen={setOpen} />
            }
            <div className="w-full h-full bg-white p-[20px] rounded-2xl overflow-hidden flex flex-col">
                <h2 className="text-lg font-bold text-center">{year}년 휴가 현황</h2>
                <div className="w-full flex items-center justify-end gap-[20px] mt-[20px]">
                    <button
                        onClick={() => setOpen(true)}
                        className="text-base rounded-2xl px-[12px] py-[6px] cursor-pointer bg-blue-700 text-white hover:bg-blue-600 transition-all"
                    >휴가 신청</button>
                </div>
                <LeavesSummaryCard summaryData={summaryData}/>
                <LeavesTable recordData={recordData} ref={leavesColumnRef} filename={`${year}_Leaves_Record`} />
                {recordData?.length === 0 && (
                    <p className="text-base text-center p-[20px]">등록된 데이터가 없습니다.</p>
                )}
            </div>
        </>
    )
}