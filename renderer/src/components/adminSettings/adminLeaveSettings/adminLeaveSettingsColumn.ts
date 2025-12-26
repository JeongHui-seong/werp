import type { ColumnDef } from "@tanstack/react-table";
import type { leavesType } from "../../../types/leaves/leavesType";

export const leavesTypeColumn: ColumnDef<leavesType>[] = [
        {
            accessorKey: "id",
            header: "No",
            cell: info => info.getValue(),
        },
        {
            accessorKey: "type",
            header: "휴가 타입",
            cell: info => info.getValue(),
        },
        {
            accessorKey: "days",
            header: "차감 일수",
            cell: info => info.getValue(),
        },
    ]