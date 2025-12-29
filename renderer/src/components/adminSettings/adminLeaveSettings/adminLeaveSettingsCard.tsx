import { useEffect, useState } from "react";
import { useLeavesType } from "../../../hooks/leaves/useLeavesType";
import { LeavesSettingsTable } from "../adminLeaveSettings/adminLeaveSettingsTable";
import type { leavesTypeDraft } from "../../../types/leaves/leavesType";
import AddRoundedIcon from '@mui/icons-material/AddRounded';

export function AdminLeaveSettingsCard(){
    //TODO
    //type의 이름이 같은지 확인하는 로직
    //upsert로 수정/삽입 기능
    const { data } = useLeavesType();
    const [editMode, setEditMode] = useState(false);
    const [draftRows, setDraftRows] = useState<leavesTypeDraft[]>([]);

    const addRow = () => {
        setDraftRows(prev => [
            ...prev,
            {
                rowId: crypto.randomUUID(),
                type: "",
                days: 0,
                isDirty: true,
                isNew: true,
            }
        ])
    }

    const payload = draftRows
        .filter(r => r.isNew || r.isDirty)
        .map(r => ({
            type: r.type,
            days: Number(r.days)
        }));

    const handleEdit = () => {
        //TODO
        //API 연결, useMutation써서 처리
    }

    useEffect(() => {
        if (data?.leavesType) {
            setDraftRows(
                data.leavesType.map((row: leavesTypeDraft) => ({
                    ...row,
                    isDirty: false,
                    isNew: false,
                }))
            )
        }
    }, [data]);

    return(
        <div className="w-full h-full bg-white p-[20px] rounded-2xl overflow-hidden flex flex-col">
            <h2 className="font-bold text-center text-lg">휴가 설정</h2>
            <div className="flex w-full justify-end items-center gap-[20px]">
                {!editMode ? (
                    <>
                        <button
                            className="px-[12px] py-[6px] rounded-2xl text-base bg-white border border-black text-black cursor-pointer hover:bg-gray-100 transition-all"
                            onClick={() => setEditMode(true)}
                        >편집하기</button>
                        <button
                            className="px-[12px] py-[6px] rounded-2xl text-base bg-red-700 text-white cursor-pointer hover:bg-red-600 transition-all"
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
                                            isDirty: false,
                                            isNew: false
                                        }))
                                    )
                                }
                                setDraftRows([]);
                                setEditMode(false);
                            }}
                        >취소</button>
                        <button
                            className="px-[12px] py-[6px] rounded-2xl text-base bg-green-700 text-white cursor-pointer hover:bg-green-600 transition-all"
                            onClick={() => {
                                console.log(draftRows)
                                setEditMode(false);
                            }}
                        >수정하기</button>
                    </>
                )}
            </div>
            <LeavesSettingsTable
                recordData={draftRows}
                editMode={editMode}
                onChange={setDraftRows}
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
    )
}