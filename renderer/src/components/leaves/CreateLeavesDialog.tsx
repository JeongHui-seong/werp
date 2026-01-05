import { motion } from "framer-motion"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { format } from "date-fns";
import { useLeavesType } from "../../hooks/admin/leaves/useLeavesType";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { createLeavesDialogProps } from "../../types/leaves/leavesType";
import { Dialog } from "../common/dialog";
import type { dialog } from "../../types/dialogData";

export const CreateLeavesDialog = ({ setOpen }: createLeavesDialogProps) => {
    const date = format(new Date(), "yyyy년 MM월 dd일");
    const [selectedLeaveType, setSelectedLeaveType] = useState<string>("연차");
    const { data: leaveTypeData } = useLeavesType();
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const [reason, setReason] = useState<string>("");
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [dialogData, setDialogData] = useState<dialog | null>(null);

    const payload = {
        createdAt: date,
        leaveType: selectedLeaveType,
        startdate: startDate,
        enddate: endDate,
        reason: reason
    }

    const onCreate = () => {
        setDialogData({
            title: "휴가 신청",
            content: "휴가를 신청하시겠습니까?",
            okButtonText: "휴가 신청",
            onOK: () => {
                console.log(payload);
                setOpen(false);
            }
        });
        setDialogOpen(true);
    }

    return (
        <>
            {dialogData &&
                <Dialog
                    dialogData={dialogData}
                    onClose={() => setDialogOpen(false)}
                    open={dialogOpen}
                />
            }
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-19">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="rounded-2xl border border-gray-40 w-[500px] max-h-[calc(100vh-40px)] flex flex-col overflow-hidden bg-white text-base">
                    <div className="p-[20px] border-b border-b-gray-40 bg-gray-100 flex items-center justify-between shrink-0">
                        <h3 className="text-base font-bold">휴가 신청</h3>
                        <CloseRoundedIcon
                            onClick={() => setOpen(false)}
                            className="cursor-pointer"
                        />
                    </div>
                    <ul className="bg-white flex-1 overflow-y-auto p-[20px] flex flex-col gap-[12px]">
                        <li className="flex items-center">
                            <div
                                className="w-[140px] h-[48px] flex items-center px-[20px]"
                            ><p className="text-base font-bold">휴가 신청일</p></div>
                            <div className="h-[48px] flex-1 text-base flex items-center">{date}</div>
                        </li>
                        <li className="flex items-center">
                            <div
                                className="w-[140px] h-[48px] flex items-center px-[20px]"
                            ><p className="text-base font-bold">휴가 구분</p></div>
                            <div className="h-[48px] flex-1 text-base flex items-center">
                                <select name="leaveType" id="leaveType"
                                    onChange={(e) => setSelectedLeaveType(e.target.value)}
                                    value={selectedLeaveType}
                                    className="border border-gray-40 rounded-2xl px-[12px] py-[6px]">
                                    {leaveTypeData?.leavesType?.map((type: { id: string; type: string }) => {
                                        return (
                                            <option value={type.type} key={type.id}>{type.type}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </li>
                        <li className="flex items-center">
                            <div
                                className="w-[140px] h-[48px] flex items-center px-[20px]"
                            ><p className="text-base font-bold">휴가 시작일</p></div>
                            <div className="h-[48px] flex-1 text-base flex items-center">
                                <DatePicker
                                    selected={startDate}
                                    onChange={setStartDate}
                                    dateFormat="yyyy년 MM월 dd일"
                                    className="border border-gray-40 rounded-2xl px-[12px] py-[6px] cursor-pointer"
                                />
                            </div>
                        </li>
                        <li className="flex items-center">
                            <div
                                className="w-[140px] h-[48px] flex items-center px-[20px]"
                            ><p className="text-base font-bold">휴가 종료일</p></div>
                            <div className="h-[48px] flex-1 text-base flex items-center">
                                <DatePicker
                                    selected={endDate}
                                    onChange={setEndDate}
                                    dateFormat="yyyy년 MM월 dd일"
                                    className="border border-gray-40 rounded-2xl px-[12px] py-[6px] cursor-pointer"
                                />
                            </div>
                        </li>
                        <li className="flex items-center">
                            <div
                                className="w-[140px] h-[48px] flex items-center px-[20px]"
                            ><p className="text-base font-bold">휴가 사유</p></div>
                            <div className="flex-1 text-base flex items-center">
                                <textarea
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    className="bg-white text-base w-full h-[200px] border border-gray-40 rounded-2xl px-[12px] py-[6px] whitespace-pre-wrap overflow-y-auto resize-none break-words"
                                />
                            </div>
                        </li>
                        <li className="w-full flex items-center justify-end gap-[20px]">
                            <button
                                onClick={() => setOpen(false)}
                                className="border border-gray-40 text-base rounded-2xl px-[12px] py-[6px] cursor-pointer bg-white hover:bg-gray-100 transition-all"
                            >
                                취소
                            </button>
                            <button
                                onClick={onCreate}
                                className="border border-blue-700 text-base rounded-2xl px-[12px] py-[6px] cursor-pointer bg-blue-700 text-white hover:bg-blue-600 transition-all"
                            >
                                휴가 신청
                            </button>
                        </li>
                    </ul>
                </motion.div>
            </div>
        </>
    )
}