import type { ColumnDef } from "@tanstack/react-table";
import { IndeterminateCheckbox } from "../../table/IndeterminateCheckbox";
import type { fetchUserTypeResponse } from "../../../types/user/fetchUserType";
import { format } from "date-fns-tz";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const statusMap: Record<string, string> = {
    active: "활성",
    inactive: "비활성",
    quit: "퇴사",
}

const roleMap: Record<string, string> = {
    admin: "관리자",
    employee: "사원",
}

export const employeesColumn: ColumnDef<fetchUserTypeResponse>[] = [
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
    { header: "부서", accessorFn: row => row.department.name },
    {
        header: "직급",
        accessorFn: row => roleMap[row.role.name] ?? row.role.name,
    },
    {
        header: "상태",
        accessorFn: row => statusMap[row.status] ?? row.status,
    },
    {
        header: "입사일",
        accessorFn: row => format(new Date(row.hire_date), "yyyy-MM-dd"),
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
