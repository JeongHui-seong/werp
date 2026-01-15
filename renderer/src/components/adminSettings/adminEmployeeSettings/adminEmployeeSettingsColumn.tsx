import type { ColumnDef } from "@tanstack/react-table";
import { IndeterminateCheckbox } from "../../table/IndeterminateCheckbox";
import type { fetchUserTypeResponse } from "../../../types/user/fetchUserType";
import { format } from "date-fns-tz";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

export const employeesColumn = (
    roleData: Array<{ id: number; name: string }>,
    deptData: Array<{ id: number; name: string }>,
    statusMap: readonly ("active" | "inactive" | "quit")[],
    status: string,
    onChangeDeptId: (value: string) => void,
    deptId: string,
    onChangeRoleId: (value: string) => void,
    roleId: string,
    onChangeStatus: (value: string) => void,
): ColumnDef<fetchUserTypeResponse>[] => [
    {
        id: "select",
        enableSorting: false,
        header: ({ table }) => (
            <IndeterminateCheckbox
                checked={table.getIsAllRowsSelected()}
                indeterminate={table.getIsSomeRowsSelected()}
                onChange={table.getToggleAllRowsSelectedHandler()}
            />
        ),
        cell: ({ row }) => (
            <IndeterminateCheckbox
                checked={row.getIsSelected()}
                disabled={!row.getCanSelect()}
                onChange={row.getToggleSelectedHandler()}
            />
        ),
    },
    { accessorKey: "name", header: "이름" },
    { accessorKey: "email", header: "이메일" },
    {
        id: "department",
        header: () => (
            <div
                className="w-full flex flex-col items-center justify-center gap-[6px]"
            >   
                <p>부서</p>
                <select
                    className="w-[calc(100%-12px)] px-[6px] py-[3px] text-sm border border-gray-40 rounded-2xl"
                    name="dept" id="dept"
                    onChange={e => onChangeDeptId(e.target.value)}
                    value={deptId}
                >
                    <option value="">All</option>
                    {deptData.map((dept: {id: number; name: string;}) => (
                        <option key={dept.id} value={String(dept.id)}>
                            {dept.name}
                        </option>
                    ))}
                </select>
            </div>
        ),
        accessorFn: row => row.department.name,
        enableSorting: false,
    },
    {   
        id: "role",
        header: () => (
            <div
                className="w-full flex flex-col items-center justify-center gap-[6px]"
            >   
                <p>직급</p>
                <select
                    className="w-[calc(100%-12px)] px-[6px] py-[3px] text-sm border border-gray-40 rounded-2xl"
                    name="role" id="role"
                    onChange={e => onChangeRoleId(e.target.value)}
                    value={roleId}
                >
                    <option value="">All</option>
                    {roleData.map((role: {id: number; name: string;}) => (
                        <option key={role.id} value={String(role.id)}>
                            {role.name}
                        </option>
                    ))}
                </select>
            </div>
        ),
        accessorFn: row => row.role.name,
        enableSorting: false,
    },
    {   
        id: "status",
        header: () => (
            <div
                className="w-full flex flex-col items-center justify-center gap-[6px]"
            >   
                <p>상태</p>
                <select
                    className="w-[calc(100%-12px)] px-[6px] py-[3px] text-sm border border-gray-40 rounded-2xl"
                    name="status" id="status"
                    onChange={e => onChangeStatus(e.target.value)}
                    value={status}
                >
                    <option value="">All</option>
                    {statusMap.map((s: string) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
            </div>
        ),
        accessorFn: row => row.status,
        enableSorting: false,
    },
    {
        header: "입사일",
        accessorFn: row => format(new Date(row.hireDate), "yyyy-MM-dd"),
    },
    {
        id: "actions",
        header: "",
        enableSorting: false,
        cell: ({ row, table }) => (
            <button
                onClick={() => table.options.meta?.openDetail(row.original)}
                className="cursor-pointer"
            >
                <SearchRoundedIcon fontSize="small" />
            </button>
        )
    }
];
