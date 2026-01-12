import { motion } from "framer-motion";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import type { fetchUserTypeResponse, userDetailDialogProps } from "../../../types/user/fetchUserType";
import { useEffect, useState } from "react";
import { useGetRoleDept } from "../../../hooks/admin/users/useGetRoleDept";
import DatePicker from "react-datepicker";
import type { updateUserPayload } from "../../../types/user/updateUserType";
import type { dialog } from "../../../types/dialogData";
import { Dialog } from "../../common/dialog";
import { useUpdateUser } from "../../../hooks/admin/users/useUpdateUser";

export function AdminEmployeeSettingsDetailModal({
    open,
    data,
    onClose,
}: userDetailDialogProps){
    const { data: roleDeptData } = useGetRoleDept()
    const [employeeData, setEmployeeData] = useState<fetchUserTypeResponse | null>(null);
    const [oriEmpData, setOriEmpData] = useState<fetchUserTypeResponse | null>(null);
    const [isDirty, setIsDirty] = useState(false);
    const roleData = roleDeptData?.role || [];
    const deptData = roleDeptData?.dept || [];
    const [dialogData, setDialogData] = useState<dialog | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const { mutate : updateUser } = useUpdateUser();
    
    useEffect(() => {
        if(!data) return;

        setEmployeeData(structuredClone(data))
        setOriEmpData(structuredClone(data))
        setIsDirty(false)
    },[data])
    
    if (!open || !data) return null;

    const buildPatchPayload = () => {
        if (!oriEmpData || !employeeData) return null;

        const payload: updateUserPayload = {};

        if (oriEmpData.name !== employeeData.name)
            payload.name = employeeData.name;

        if (oriEmpData.email !== employeeData.email)
            payload.email = employeeData.email;

        if (oriEmpData.phone !== employeeData.phone)
            payload.phone = employeeData.phone;

        if (oriEmpData.status !== employeeData.status)
            payload.status = employeeData.status;

        if (oriEmpData.department.id !== employeeData.department.id)
            payload.departmentId = employeeData.department.id;

        if (oriEmpData.role.id !== employeeData.role.id)
            payload.roleId = employeeData.role.id;

        if (oriEmpData.hire_date !== employeeData.hire_date)
            payload.hire_date = employeeData.hire_date;

        return payload;
    };

    const onCreate = () => {
        setDialogData({
            title: "직원 정보 수정",
            content: "직원 정보를 수정하시겠습니까?",
            okButtonText: "수정하기",
            onOK: () => {
                const payload = buildPatchPayload();
                const id = data.id;
                if (!payload || Object.keys(payload).length === 0) return;
                updateUser({id, payload});
                onClose();
        }});
        setDialogOpen(true);
    }


    const statusMap = {
        active: "활성",
        inactive: "비활성",
        quit: "퇴사",
    } as const;

    type StatusKey = keyof typeof statusMap;

    return(
        <>
            {dialogData &&
                <Dialog
                    dialogData={dialogData}
                    onClose={() => setDialogOpen(false)}
                    open={dialogOpen}
                />
            }
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
                        <h3 className="text-base font-bold">직원 상세 내역</h3>
                        <CloseRoundedIcon
                            onClick={onClose}
                            className="cursor-pointer"
                        />
                    </div>
                    <ul className="bg-white flex-1 overflow-y-auto p-[20px] flex flex-col gap-[12px]">
                        <li className="flex items-center">
                            <div
                                className="w-[140px] h-[48px] flex items-center px-[20px]"
                            ><p className="text-base font-bold">이름</p></div>
                            <input
                            className="h-[48px] flex-1 text-base flex items-center border border-gray-40 rounded-2xl px-[12px]"
                            value={employeeData?.name ?? ""}
                            onChange={(e) => {
                                setEmployeeData(prev => {
                                    if (!prev) return prev;
                                    return {
                                        ...prev,
                                        name: e.target.value
                                    };
                                })
                                setIsDirty(true);   
                            }}
                            />
                        </li>
                        <li className="flex items-center">
                            <div
                                className="w-[140px] h-[48px] flex items-center px-[20px]"
                            ><p className="text-base font-bold">이메일</p></div>
                            <input
                            className="h-[48px] flex-1 text-base flex items-center border border-gray-40 rounded-2xl px-[12px]"
                            value={employeeData?.email ?? ""}
                            onChange={(e) => {
                                setEmployeeData(prev => {
                                    if (!prev) return prev;
                                    return {
                                        ...prev,
                                        email: e.target.value
                                    };
                                })
                                setIsDirty(true);   
                            }}
                            />
                        </li>
                        <li className="flex items-center">
                            <div
                                className="w-[140px] h-[48px] flex items-center px-[20px]"
                            ><p className="text-base font-bold">부서</p></div>
                            <select name="department" id="department"
                                value={employeeData?.department.id ?? ""}
                                className="h-[48px] flex-1 text-base flex items-center border border-gray-40 rounded-2xl px-[12px]"
                                onChange={(e) => {
                                    const selectedDept = deptData.find((dept: { id: number; }) => dept.id === Number(e.target.value));
                                    if (selectedDept) {
                                        setEmployeeData(prev => {
                                            if (!prev) return prev;
                                            return {
                                                ...prev,
                                                department: {
                                                    id: selectedDept.id,
                                                    name: selectedDept.name
                                                }
                                            };
                                        })
                                        setIsDirty(true);   
                                    }}
                                }
                            >
                                {deptData.map((dept: { id: number; name: string }) => (
                                    <option
                                        key={dept.id}
                                        value={dept.id}
                                    >
                                        {dept.name}
                                    </option>
                                ))}
                            </select>
                        </li>
                        <li className="flex items-center">
                            <div
                                className="w-[140px] h-[48px] flex items-center px-[20px]"
                            ><p className="text-base font-bold">직급</p></div>
                            <select name="role" id="role"
                                value={employeeData?.role.id ?? ""}
                                className="h-[48px] flex-1 text-base flex items-center border border-gray-40 rounded-2xl px-[12px]"
                                onChange={(e) => {
                                    const selectedRole = roleData.find((role: { id: number; }) => role.id === Number(e.target.value));
                                    if (selectedRole) {
                                        setEmployeeData(prev => {
                                            if (!prev) return prev;
                                            return {
                                                ...prev,
                                                role: {
                                                    id: selectedRole.id,
                                                    name: selectedRole.name
                                                }
                                            };
                                        })
                                        setIsDirty(true);   
                                    }}}
                            >
                                {roleData.map((role: { id: number; name: string }) => (
                                    <option
                                        key={role.id}
                                        value={role.id}
                                    >
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                        </li>
                        <li className="flex items-center">
                            <div
                                className="w-[140px] h-[48px] flex items-center px-[20px]"
                            ><p className="text-base font-bold">입사일</p></div>
                            <div className="h-[48px] flex-1 text-base flex items-center">
                                <DatePicker
                                    selected={employeeData?.hire_date ? new Date(employeeData.hire_date) : undefined}
                                    onChange={(date: Date | null) => {
                                        if (!date) return;
                                        setEmployeeData(prev => {
                                            if (!prev) return prev;
                                            return {
                                                ...prev,
                                                hire_date: date.toISOString()
                                            }})
                                        setIsDirty(true);
                                    }}
                                    dateFormat="yyyy년 MM월 dd일"
                                    className="border border-gray-40 rounded-2xl px-[12px] py-[6px] cursor-pointer"
                            />
                            </div>
                        </li>
                        <li className="flex items-center">
                            <div
                                className="w-[140px] h-[48px] flex items-center px-[20px]"
                            ><p className="text-base font-bold">상태</p></div>
                            <select name="status" id="status"
                                value={employeeData?.status ?? ""}
                                className="h-[48px] flex-1 text-base flex items-center border border-gray-40 rounded-2xl px-[12px]"
                                onChange={(e) => {
                                    const selectedStatus = e.target.value as StatusKey;
                                    if (selectedStatus) {
                                        setEmployeeData(prev => {
                                            if (!prev) return prev;
                                            return{
                                                ...prev,
                                                status: selectedStatus
                                            }})
                                        setIsDirty(true);
                                    }
                                }}
                            >
                                {Object.entries(statusMap).map(([key, value]) => (
                                    <option
                                        key={key}
                                        value={key}
                                    >
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </li>
                        <li className="flex items-center">
                            <div
                                className="w-[140px] h-[48px] flex items-center px-[20px]"
                            ><p className="text-base font-bold">전화번호</p></div>
                            <input
                                className="h-[48px] flex-1 text-base flex items-center border border-gray-40 rounded-2xl px-[12px]"
                                value={employeeData?.phone ?? ""}
                                onChange={(e) => {
                                    setEmployeeData(prev => {
                                        if (!prev) return prev;
                                        return {
                                            ...prev,
                                            phone: e.target.value
                                        }
                                    });
                                    setIsDirty(true);
                                }}
                            />
                        </li>
                    </ul>
                    <div className="p-[20px] flex items-center justify-end">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onCreate()
                            }}
                            disabled={!isDirty}
                            className={`${!isDirty ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-green-700 text-white cursor-pointer hover:bg-green-600 transition-all"} px-[12px] py-[6px] rounded-2xl text-base`}
                        >수정하기</button>
                    </div>
                </motion.div>
            </div>
        </>
    )
}