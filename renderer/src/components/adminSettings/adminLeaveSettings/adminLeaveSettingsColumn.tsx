import type { ColumnDef } from "@tanstack/react-table";
import type { leavesTypeDraft } from "../../../types/leaves/leavesType";
import { IndeterminateCheckbox } from "../../table/IndeterminateCheckbox";
import type React from "react";

export const leavesTypeColumn = (
    editMode: boolean,
    setRows: React.Dispatch<React.SetStateAction<leavesTypeDraft[]>>
): ColumnDef<leavesTypeDraft>[] => [
        {
            id: 'select',
            enableSorting: false,
            header: ({ table }) => ( !editMode &&
                <IndeterminateCheckbox
                    checked={table.getIsAllRowsSelected()}
                    indeterminate={table.getIsSomeRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                />
            ),
            cell: ({ row }) => ( !editMode &&
                <IndeterminateCheckbox
                    checked={row.getIsSelected()}
                    disabled={!row.getCanSelect()}
                    onChange={row.getToggleSelectedHandler()}
                />
            ),
        },
        {
            accessorKey: "id",
            header: "No",
            cell: ({ getValue}) =>
                editMode ? (
                    <input
                        value={getValue() as number}
                        disabled
                        className="bg-gray-100 px-[12px] py-[3px] rounded-xl"
                    />
                ) : (getValue()),
        },
        {
            accessorKey: "type",
            header: "휴가 타입",
            cell:  ({ row, getValue}) =>
                editMode ? (
                    <input
                        value={getValue() as string}
                        onChange={e =>setRows(prev =>
                            prev.map((r) =>
                                r.rowId === row.original.rowId ?
                                { ...r, type: e.target.value, isDirty: true}
                                : r    
                            )
                        )}
                        className="border border-gray-700 px-[12px] py-[3px] rounded-xl"
                    />
                ) : (getValue()),
        },
        {
            accessorKey: "days",
            header: "차감 일수",
            cell:  ({ row, getValue}) =>
                editMode ? (
                    <input
                        value={getValue() as number}
                        onChange={e =>setRows(prev =>
                            prev.map((r) =>
                                r.rowId === row.original.rowId ?
                                { ...r, days: e.target.value, isDirty: true}
                                : r    
                            )
                        )}
                        className="border border-gray-700 p-[12px] py-[3px] rounded-xl"
                    />
                ) : (getValue()),
        },
    ]

