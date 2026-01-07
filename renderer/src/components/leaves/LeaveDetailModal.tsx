import { motion } from "framer-motion";
import type { LeaveDetailModalProps } from "../../types/leaves/leavesType";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { format } from "date-fns-tz";

export function LeaveDetailModal({
    open,
    data,
    onClose,
}: LeaveDetailModalProps){
    if (!open || !data) return null;
    console.log(data)
    return(
        <div
            onClick={onClose}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-20"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={(e) => e.stopPropagation()}
                className="rounded-2xl border border-gray-40 w-[500px] max-h-[calc(100vh-40px)] flex flex-col overflow-hidden bg-white text-base">
                <div className="p-[20px] border-b border-b-gray-40 bg-gray-100 flex items-center justify-between shrink-0">
                    <h3 className="text-base font-bold">휴가 상세 내역</h3>
                    <CloseRoundedIcon
                        onClick={onClose}
                        className="cursor-pointer"
                    />
                </div>
                <ul className="bg-white flex-1 overflow-y-auto p-[20px] flex flex-col gap-[12px]">
                    <li className="flex items-center">
                        <div
                            className="w-[140px] h-[48px] flex items-center px-[20px]"
                        ><p className="text-base font-bold">휴가 종류</p></div>
                        <div className="h-[48px] flex-1 text-base flex items-center">{data.leave_type}</div>
                    </li>
                    <li className="flex items-center">
                        <div
                            className="w-[140px] h-[48px] flex items-center px-[20px]"
                        ><p className="text-base font-bold">휴가 신청일</p></div>
                        <div className="h-[48px] flex-1 text-base flex items-center">{format(new Date(data.created_at), "yyyy년 MM월 dd일")}</div>
                    </li>
                    <li className="flex items-center">
                        <div
                            className="w-[140px] h-[48px] flex items-center px-[20px]"
                        ><p className="text-base font-bold">상태</p></div>
                        <div className="h-[48px] flex-1 text-base flex items-center">{data.status}</div>
                    </li>
                    <li className="flex items-center">
                        <div
                            className="w-[140px] h-[48px] flex items-center px-[20px]"
                        ><p className="text-base font-bold">휴가 개시일</p></div>
                        <div className="h-[48px] flex-1 text-base flex items-center">{format(new Date(data.start_date), "yyyy년 MM월 dd일")}</div>
                    </li>
                    <li className="flex items-center">
                        <div
                            className="w-[140px] h-[48px] flex items-center px-[20px]"
                        ><p className="text-base font-bold">휴가 종료일</p></div>
                        <div className="h-[48px] flex-1 text-base flex items-center">{format(new Date(data.end_date), "yyyy년 MM월 dd일")}</div>
                    </li>
                    <li className="flex items-center">
                        <div
                            className="w-[140px] h-[48px] flex items-center px-[20px]"
                        ><p className="text-base font-bold">휴가 사유</p></div>
                        <div className="h-[48px] flex-1 text-base flex items-center">{data.reason}</div>
                    </li>
                    {data.approver_name && (
                        <li className="flex items-center">
                            <div
                                className="w-[140px] h-[48px] flex items-center px-[20px]"
                            ><p className="text-base font-bold">승인자</p></div>
                            <div className="h-[48px] flex-1 text-base flex items-center">{data.approver_name}</div>
                        </li>
                    )}
                    {data.approved_at && (
                        <li className="flex items-center">
                            <div
                                className="w-[140px] h-[48px] flex items-center px-[20px]"
                            ><p className="text-base font-bold">승인일</p></div>
                            <div className="h-[48px] flex-1 text-base flex items-center">{format(new Date(data.approved_at), "yyyy년 MM월 dd일")}</div>
                        </li>
                    )}
                    {data.rejection_reason && (
                        <li className="flex items-center">
                            <div
                                className="w-[140px] h-[48px] flex items-center px-[20px]"
                            ><p className="text-base font-bold">반려 사유</p></div>
                            <div className="h-[48px] flex-1 text-base flex items-center">{data.rejection_reason}</div>
                        </li>
                    )}
                </ul>
            </motion.div>
        </div>
    )
}