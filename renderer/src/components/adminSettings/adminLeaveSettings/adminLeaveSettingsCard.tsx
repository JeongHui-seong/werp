import { useEffect, useState } from "react";
import { useLeavesType } from "../../../hooks/admin/leaves/useLeavesType";
import { LeavesSettingsTable } from "../adminLeaveSettings/adminLeaveSettingsTable";
import type { leavesTypeDraft } from "../../../types/leaves/adminLeavesType";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { toast } from "react-toastify";
import { useEditLeavesType } from "../../../hooks/admin/leaves/useEditLeavesType";
import { Dialog } from "../../common/dialog";
import type { dialog } from "../../../types/dialogData";
import type { RowSelectionState } from "@tanstack/react-table";
import { useDeleteLeavesType } from "../../../hooks/admin/leaves/useDeleteLeavesType";
import { AdminLeaveSettingsPolicy } from "./adminLeaveSettingsPolicy";

export function AdminLeaveSettingsCard(){
    // TODO
    // 수정모드일 때 삭제 기능 구현 필요
    const { data } = useLeavesType();
    const [editMode, setEditMode] = useState(false);
    const [draftRows, setDraftRows] = useState<leavesTypeDraft[]>([]);

    const { mutate: upsertLeavesType } = useEditLeavesType();

    const [open, setOpen] = useState(false);
    const [dialogData, setDialogData] = useState<dialog | null>(null);

    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const { mutate: deleteLeavesType } = useDeleteLeavesType();

    const addRow = () => {
        setDraftRows(prev => [
            ...prev,
            {
                rowId: crypto.randomUUID(),
                type: "",
                days: 0,
                isDirty: true,
                isNew: true,
                original: {
                    type: "",
                    days: 0,
                }
            }
        ])
    }

    
    const onEdit = () => {
        const payload = draftRows
            .filter(r => r.isNew || r.isDirty)
            .map(r => ({
                id: r.id,
                type: r.type,
                days: Number(r.days)
            }));
        
        const isEmpty = payload.some(item => item.type.trim().length === 0);

        if (isEmpty) {
            toast.error("휴가 타입과 차감 일수를 입력해주세요.");
            return;
        }

        const types = draftRows.map(item => item.type.trim()).filter(t => t.length > 0);
        const isDuplicated = new Set(types).size !== types.length;

        if (isDuplicated) {
            toast.error("중복된 휴가 타입이 있습니다.");
            return;
        }

        const hasDirty = draftRows.some(item => item.isDirty);
        const hasNew = draftRows.some(item => item.isNew);

        if (!hasDirty && !hasNew){
            setDraftRows(
                data.leavesType.map((row: leavesTypeDraft) => ({
                    ...row,
                    rowId: crypto.randomUUID(),
                    isDirty: false,
                    isNew: false,
                    original: {
                        type: row.type,
                        days: row.days
                        }
                    }))
                )
            setEditMode(false);
            return;
        }

        setDialogData({
            title: "휴가 타입 수정",
            content: "휴가 타입을 수정하시겠습니까?",
            okButtonText: "수정하기",
            onOK: () => {
                upsertLeavesType(payload);
                setEditMode(false);
            }
        })

        setOpen(true);
    }

    const onDelete = () => {
        const uuid = Object.keys(rowSelection)

        if (uuid.length === 0) {
            toast.error("삭제할 항목을 선택해주세요.");
            return;
        }

        const ids = draftRows
            .filter(row => uuid.includes(row.rowId))
            .map(row => row.id)
            .filter((id): id is number => typeof id === "number");

        setDialogData({
            title: "휴가 타입 삭제",
            content: "휴가 타입을 삭제하시겠습니까?",
            okButtonText: "삭제하기",
            onOK: () => {
                deleteLeavesType(ids)
            }
        })

        setOpen(true);
    }

    useEffect(() => {
        if (data?.leavesType) {
            setDraftRows(
                data.leavesType.map((row: leavesTypeDraft) => ({
                    ...row,
                    rowId: crypto.randomUUID(),
                    isDirty: false,
                    isNew: false,
                    original: {
                        type: row.type,
                        days: row.days,
                    }
                }))
            )
        }
    }, [data]);

    return(
        <>
        {dialogData &&
            <Dialog
                dialogData={dialogData}
                open={open}
                onClose={() => setOpen(false)}
            />
        }
            <div className="w-full h-full bg-white p-[20px] rounded-2xl overflow-hidden flex flex-col">
                <h2 className="font-bold text-center text-lg">휴가 설정</h2>
                <AdminLeaveSettingsPolicy />
                <div className="flex w-full justify-end items-center gap-[20px]">
                    {!editMode ? (
                        <>
                            <button
                                className="px-[12px] py-[6px] rounded-2xl text-base bg-white border border-black text-black cursor-pointer hover:bg-gray-100 transition-all"
                                onClick={() => setEditMode(true)}
                            >편집하기</button>
                            <button
                                className="px-[12px] py-[6px] rounded-2xl text-base bg-red-700 text-white cursor-pointer hover:bg-red-600 transition-all"
                                onClick={onDelete}
                            >삭제하기</button>
                        </>
                    ) : (
                        <>
                            <button
                                className="px-[12px] py-[6px] rounded-2xl text-base bg-white border border-black text-black cursor-pointer hover:bg-gray-100 transition-all"
                                onClick={() => {
                                    if (data?.leavesType) {
                                        setDraftRows(
                                            data.leavesType.map((row: leavesTypeDraft) => ({
                                                ...row,
                                                rowId: crypto.randomUUID(),
                                                isDirty: false,
                                                isNew: false,
                                                original: {
                                                    type: row.type,
                                                    days: row.days
                                                }
                                            }))
                                        )
                                    }
                                    setEditMode(false);
                                }}
                            >취소</button>
                            <button
                                className="px-[12px] py-[6px] rounded-2xl text-base bg-green-700 text-white cursor-pointer hover:bg-green-600 transition-all"
                                onClick={onEdit}
                            >수정하기</button>
                        </>
                    )}
                </div>
                <LeavesSettingsTable
                    recordData={draftRows}
                    editMode={editMode}
                    onChange={setDraftRows}
                    rowSelection={rowSelection}
                    setRowSelection={setRowSelection}
                />
                {editMode && 
                    <div
                        className="w-full flex items-center justify-center gap-[12px] bg-blue-100 text-sm p-[12px] mt-[4px] rounded-xl text-blue-700 cursor-pointer hover:bg-blue-200 transition-all"
                        onClick={addRow}
                    >
                        <AddRoundedIcon fontSize="small"/>행 추가
                    </div>
                }
                {data?.leavesType.length === 0 && !editMode &&
                    <p className="text-base text-center p-[20px]">등록된 데이터가 없습니다.</p>
                }
            </div>
        </>
    )
}