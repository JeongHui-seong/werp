import { useRef, useState } from "react";
import { useGetAllUsers } from "../../../hooks/admin/users/useGetAllUsers";
import { EmployeesTable } from "./adminEmployeeSettingsTable";
import type { usersColumnRef } from "../../../types/user/fetchUserType";

export function AdminEmployeeSettingsCard(){
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { data: usersData } = useGetAllUsers({ page, limit });
    const recordData = usersData?.data;
    const employeesColumnRef = useRef<usersColumnRef>(null)
    console.log(usersData)
    return(
        <div className="w-full h-full bg-white p-[20px] rounded-2xl overflow-hidden flex flex-col">
            <h2 className="font-bold text-center text-lg">직원 관리 설정</h2>
            <div className="flex w-full justify-end items-center gap-[20px] mt-[20px]">
                <button className="px-[12px] py-[6px] rounded-2xl text-base bg-green-700 text-white cursor-pointer hover:bg-green-600 transition-all">추가하기</button>
                <button className="px-[12px] py-[6px] rounded-2xl text-base bg-red-700  text-white cursor-pointer hover:bg-red-600 transition-all">삭제하기</button>
            </div>
            <EmployeesTable ref={employeesColumnRef} recordData={recordData} filename={"employees_data.csv"} />
        </div>
    )
}