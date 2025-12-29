import { getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import type { leavesTypeDraft, leavesTypeProps } from "../../../types/leaves/leavesType";
import { leavesTypeColumn } from "./adminLeaveSettingsColumn";
import { TableUI } from "../../table/tableUI";
import { useMemo } from "react";

export const LeavesSettingsTable = ({ recordData, editMode, onChange }: leavesTypeProps) => {
    const columns = useMemo(() => leavesTypeColumn(editMode, onChange), [editMode, onChange])
    const table = useReactTable<leavesTypeDraft>({
        data: recordData ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        enableSorting: !editMode,
        enableRowSelection: true,
        getRowId: row => row.rowId,
    });

    return(
        <div className="mt-[20px] w-full overflow-auto text-base text-center">
            <TableUI table={table} />
        </div>
    )
}