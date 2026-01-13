import { forwardRef, useImperativeHandle, useState } from "react";
import type { fetchUserTypeResponse, usersColumnProps, usersColumnRef } from "../../../types/user/fetchUserType";
import { getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useCsvExport } from "../../../hooks/table/useCsvExport";
import { TableUI } from "../../table/tableUI";
import { employeesColumn } from "./adminEmployeeSettingsColumn";
import { AdminEmployeeSettingsDetailModal } from "./adminEmployeeSettingsDetailModal";


export const EmployeesTable = forwardRef<usersColumnRef, usersColumnProps>(({ recordData, filename, rowSelection, setRowSelection }, ref) => {
    const [selectedRow, setSelectedRow] =
        useState<fetchUserTypeResponse | null>(null);

    const openDetail = (row: fetchUserTypeResponse) => {
        setSelectedRow(row);
    };

    const closeDetail = () => {
        setSelectedRow(null);
    };

    const table = useReactTable<fetchUserTypeResponse>({
        data: recordData ?? [],
        columns: employeesColumn,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        enableSorting: true,
        meta: {
            openDetail,
        },
        state: {
            rowSelection,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        getRowId: row => row.id,
    });

    const handleExportToCsv = useCsvExport(table, filename);

    useImperativeHandle(ref, () => ({
        exportToCsv: handleExportToCsv,
    }));


    return(
        <div className="mt-[20px] w-full overflow-auto text-base text-center">
            <AdminEmployeeSettingsDetailModal
                open={!!selectedRow}
                data={selectedRow}
                onClose={closeDetail}
            />
            <TableUI table={table} />
        </div>
    )
})