import { motion } from "framer-motion";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import type { createUserDialogProps } from "../../../types/user/createUserType";
import { useEffect, useState } from "react";
import { useGetRoleDept } from "../../../hooks/admin/users/useGetRoleDept";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import type { dialog } from "../../../types/dialogData";
import { Dialog } from "../../common/dialog";
import { useCreateUser } from "../../../hooks/admin/users/useCreateUser";

export function AdminEmployeeSettingsCreateModal({open, onClose}: createUserDialogProps){
    const { data: roleDeptData } = useGetRoleDept();
    const { mutate: createUser } = useCreateUser()
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [status, setStatus] = useState<StatusKey>("active");
    const [hireDate, setHireDate] = useState<Date>(new Date());
    const [roleId, setRoleId] = useState<number | null>(null);
    const [deptId, setDeptId] = useState<number | null>(null);
    const [dialogData, setDialogData] = useState<dialog | null>(null);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    useEffect(() => {
        if (roleDeptData) {
            setRoleId(roleDeptData.role[0].id);
            setDeptId(roleDeptData.dept[0].id)
        }
    },[roleDeptData])

    const statusMap = {
        active: "활성",
        inactive: "비활성",
        quit: "퇴사",
    } as const;

    type StatusKey = keyof typeof statusMap;

    const payload = {
        email,
        name,
        phone,
        status,
        hire_date: hireDate,
        dept_id: deptId || 1,
        role_id: roleId || 1
    }

    const onCreate = () => {
        setDialogData({
            title: "직원 추가",
            content: "직원을 추가하시겠습니까?",
            okButtonText: "추가하기",
            onOK: () => {
                createUser(payload);
                onClose();
            }
        })
        setDialogOpen(true)
    }

    const checkPayload = () => {
        if (name.trim().length === 0) {
            toast.error("이름을 작성해주세요.");
            return;
        }
        if (email.trim().length === 0) {
            toast.error("이메일을 작성해주세요.");
            return;
        } 
        if (phone.trim().length === 0) {
            toast.error("전화번호를 작성해주세요.");
            return;
        }
        onCreate();
    }

    if(!open) return null;

    return (
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                        </li>
                        <li className="flex items-center">
                            <div
                                className="w-[140px] h-[48px] flex items-center px-[20px]"
                            ><p className="text-base font-bold">이메일</p></div>
                            <input
                            className="h-[48px] flex-1 text-base flex items-center border border-gray-40 rounded-2xl px-[12px]"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </li>
                        <li className="flex items-center">
                            <div
                                className="w-[140px] h-[48px] flex items-center px-[20px]"
                            ><p className="text-base font-bold">부서</p></div>
                            <select name="department" id="department"
                                value={deptId ?? 1}
                                className="h-[48px] flex-1 text-base flex items-center border border-gray-40 rounded-2xl px-[12px]"
                                onChange={(e) => setDeptId(Number(e.target.value))}
                            >
                                {roleDeptData.dept.map((dept: { id: number; name: string }) => (
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
                                value={roleId ?? 1}
                                className="h-[48px] flex-1 text-base flex items-center border border-gray-40 rounded-2xl px-[12px]"
                                onChange={(e) => setRoleId(Number(e.target.value))}
                            >
                                {roleDeptData.role.map((role: { id: number; name: string }) => (
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
                                    selected={hireDate}
                                    onChange={(date: Date | null) => {
                                        if (!date) return;
                                        setHireDate(date)
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
                                value={status}
                                className="h-[48px] flex-1 text-base flex items-center border border-gray-40 rounded-2xl px-[12px]"
                                onChange={(e) => {
                                    const selectedStatus = e.target.value as StatusKey;
                                    setStatus(selectedStatus)
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
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="숫자만 입력해주세요."
                            />
                        </li>
                    </ul>
                    <div className="p-[20px] flex items-center justify-end">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                checkPayload()
                            }}
                            className={"bg-green-700 text-white cursor-pointer hover:bg-green-600 transition-all px-[12px] py-[6px] rounded-2xl text-base"}
                        >추가하기</button>
                    </div>
                </motion.div>
            </div>
        </>
    )
}