import { getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import type { leavesType, leavesTypeProps } from "../../../types/leaves/leavesType";
import { leavesTypeColumn } from "./adminLeaveSettingsColumn";
import { TableUI } from "../../table/tableUI";

export const LeavesSettingsTable = ({ recordData }: leavesTypeProps) => {
    const table = useReactTable<leavesType>({
        data: recordData ?? [],
        columns: leavesTypeColumn,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        enableSorting: true,
    });

    return(
        <div className="mt-[20px] w-full overflow-auto text-base text-center">
            <TableUI table={table} />
        </div>
    )
}