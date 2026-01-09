import type { ColumnDef } from "@tanstack/react-table";
import { IndeterminateCheckbox } from "../../table/IndeterminateCheckbox";
import type { fetchUserTypeResponse } from "../../../types/user/fetchUserType";
import { format } from "date-fns-tz";

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
    { header: "부서", accessorFn: row => row.department.name },
    { header: "직급", accessorFn: row => row.role.name },
    { accessorKey: "email", header: "이메일" },
    { accessorKey: "phone", header: "전화번호" },
    {
        header: "입사일",
        accessorFn: row => format(new Date(row.hire_date), "yyyy-MM-dd"),
    },
];
