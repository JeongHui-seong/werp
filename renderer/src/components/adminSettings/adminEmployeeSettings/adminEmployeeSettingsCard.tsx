import { useRef, useState } from "react";
import { useGetAllUsers } from "../../../hooks/admin/users/useGetAllUsers";
import { EmployeesTable } from "./adminEmployeeSettingsTable";
import type { usersColumnRef } from "../../../types/user/fetchUserType";
import { AdminEmployeeSettingsCreateModal } from "./adminEmployeeSettingsCreateModal";
import type { RowSelectionState } from "@tanstack/react-table";
import { useDeleteUser } from "../../../hooks/admin/users/useDeleteUser";
import type { dialog } from "../../../types/dialogData";
import { toast } from "react-toastify";
import { Dialog } from "../../common/dialog";

export function AdminEmployeeSettingsCard(){
    const { mutate: deleteUser } = useDeleteUser()
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const { data: usersData } = useGetAllUsers({ page, limit });
    const recordData = usersData?.data;
    const employeesColumnRef = useRef<usersColumnRef>(null);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [dialogData, setDialogData] = useState<dialog | null>(null);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const onDelete = () => {
        const ids = Object.keys(rowSelection)
        
        if (ids.length === 0) {
            toast.error("삭제할 항목을 선택해주세요.");
            return;
        }

        setDialogData({
            title: "직원 삭제",
            content: `${ids.length}명의 직원을 삭제하시겠습니까?`,
            okButtonText: "삭제하기",
            onOK: () => {
                deleteUser(ids);
            }
        })

        setDialogOpen(true)
    }

    return(
        <>
            {dialogData &&
                <Dialog 
                    dialogData={dialogData}
                    onClose={() => setDialogOpen(false)}
                    open={dialogOpen}
                />
            }
            <div className="w-full h-full bg-white p-[20px] rounded-2xl overflow-hidden flex flex-col">
                <h2 className="font-bold text-center text-lg">직원 관리 설정</h2>
                <div className="flex w-full justify-end items-center gap-[20px] mt-[20px]">
                    <button 
                        onClick={() => setCreateModalOpen(true)}
                        className="px-[12px] py-[6px] rounded-2xl text-base bg-green-700 text-white cursor-pointer hover:bg-green-600 transition-all"
                    >추가하기</button>
                    <button
                        onClick={() => onDelete()}
                        className="px-[12px] py-[6px] rounded-2xl text-base bg-red-700  text-white cursor-pointer hover:bg-red-600 transition-all"
                    >삭제하기</button>
                </div>
                <EmployeesTable
                    ref={employeesColumnRef}
                    recordData={recordData}
                    filename={"employees_data.csv"}
                    rowSelection={rowSelection}
                    setRowSelection={setRowSelection}
                />
                <AdminEmployeeSettingsCreateModal
                    open={createModalOpen}
                    onClose={() => setCreateModalOpen(false)}
                />
            </div>
        </>
    )
}