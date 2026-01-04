import type { leavesSummary, leavesSummaryProps } from "../../types/leaves/leavesType";

export function LeavesSummaryCard({summaryData}:leavesSummaryProps){
    const leavesSummaryConfig = {
        remainingLeaves: "잔여 휴가 갯수",
        usedLeaves: "사용 휴가 수",
        pendingLeaves: "예정 휴가 수"
    } as const;

    const summaryList = summaryData ?
        (Object.keys(leavesSummaryConfig) as (keyof leavesSummary)[]).map(
            (key) => ({
                key,
                label: leavesSummaryConfig[key],
                value: `${summaryData[key]}개`,
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