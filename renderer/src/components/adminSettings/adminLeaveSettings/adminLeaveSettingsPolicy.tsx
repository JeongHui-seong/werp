import { useEffect, useState } from "react";
import { useGetLeavePolicy } from "../../../hooks/admin/leaves/useGetLeavePolicy";
import { Dialog } from "../../common/dialog";
import type { dialog } from "../../../types/dialogData";
import { useEditLeavePolicy } from "../../../hooks/admin/leaves/useEditLeavePolicy";
import { format } from "date-fns";

export function AdminLeaveSettingsPolicy() {
    const year = format(new Date(), "yyyy");
    const { data: leavePolicy } = useGetLeavePolicy(year ?? "");
    const [mode, setMode] = useState<"view" | "edit">("view");
    const [rawDays, setRawDays] = useState<number>(0);
    const [editedDays, setEditedDays] = useState<number>(0);
    const isDisabled = rawDays === editedDays;
    const [open, setOpen] = useState(false);
    const [dialogData, setDialogData] = useState<dialog | null>(null);
    const { mutate: editLeavePolicy } = useEditLeavePolicy(year ?? "")

    useEffect(() => {
        if (!leavePolicy?.result) return;
        setRawDays(leavePolicy.result.days);
        setEditedDays(leavePolicy.result.days);
    },[leavePolicy]);

    const onEdit = () => {
        setDialogData({
            title: "기본 휴가일 수정",
            content: "기본 휴가일을 수정하시겠습니까?",
            okButtonText: "수정하기",
            onOK: () => {
                editLeavePolicy({ year: Number(year), days: editedDays });
                setMode("view");
            },
        })

        setOpen(true);
    }

    return (
        <>
            {dialogData &&
                <Dialog
                    dialogData={dialogData}
                    open={open}
                    onClose={() => setOpen(false)}
                />
            }
            <div className="w-full border border-gray-200 rounded-2xl mt-[20px] mb-[20px]">
                <div className="flex items-center justify-between gap-[20px] px-[12px] py-[6px]">
                    <p className="flex-1 text-center">{year}년도 기본 휴가일</p>
                    {mode === "view" &&
                    <div className="flex items-center justify-center gap-[20px] flex-1">
                        <p className="flex-1 text-center font-bold">{leavePolicy?.result.days}일</p>
                        <button
                            className="text-base rounded-2xl px-[12px] py-[6px] cursor-pointer bg-green-700 text-white hover:bg-green-600 transition-all"
                            onClick={() => setMode("edit")}>
                            수정하기
                        </button>
                    </div>
                    }
                    {mode === "edit" &&
                        <div className="flex items-center justify-center gap-[20px] flex-1">
                            <input
                                type="number"
                                value={editedDays}
                                className="flex-1 py-[6px] px-[12px] rounded-2xl border border-gray-300"
                                onChange={(e) => setEditedDays(Number(e.target.value))}
                            />
                            <button
                                className="text-base rounded-2xl px-[12px] py-[6px] cursor-pointer text-black hover:bg-gray-100 transition-all"
                                onClick={() => setMode("view")}
                            >
                                취소
                            </button>
                            <button
                                onClick={onEdit}
                                disabled={isDisabled}
                                className={`${isDisabled ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-green-700 text-white hover:bg-green-600 cursor-pointer transition-all"} text-base rounded-2xl px-[12px] py-[6px]`}
                            >
                                수정하기
                            </button>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}