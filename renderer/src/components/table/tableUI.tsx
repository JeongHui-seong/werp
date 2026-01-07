import { flexRender } from "@tanstack/react-table"
import { SortIcon } from "./sortIcon"
import type { Table } from "@tanstack/react-table"

interface TableUIProps<T> {
    table: Table<T>
}

export function TableUI<T>({ table }: TableUIProps<T>){
    return (
        <table className="min-w-full h-full border-collapse">
            <thead className="sticky top-0 z-10 bg-gray-100">
                {table.getHeaderGroups().map(headerGroup => (
                    <tr
                        key={headerGroup.id}
                    >
                        {headerGroup.headers.map(header => (
                            <th
                                key={header.id}
                                className="py-[6px] px-[12px] border border-gray-200 cursor-pointer whitespace-nowrap"
                                onClick={header.column.getToggleSortingHandler()}
                                style={{
                                    position: header.column.getIsPinned() ? "sticky" : "relative",
                                    right: header.column.getIsPinned() ? 0 : undefined,
                                    backgroundColor: header.column.getIsPinned() ? "#f3f4f6" : undefined,
                                    zIndex: header.column.getIsPinned() ? 18 : 1,
                                }}
                            >
                                <div className="flex gap-[4px] items-center justify-center">
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                    {header.column.getCanSort() && (
                                        <SortIcon column={header.column} />
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr
                        key={row.id}
                        className="hover:bg-gray-100 transition-all"
                    >
                        {row.getVisibleCells().map(cell => (
                            <td
                                key={cell.id}
                                className="py-[6px] px-[12px] border border-gray-200 whitespace-nowrap break-all"
                                style={{
                                    position: cell.column.getIsPinned() ? "sticky" : "relative",
                                    right: cell.column.getIsPinned() ? 0 : undefined,
                                    backgroundColor: cell.column.getIsPinned() ? "#ffffff" : undefined,
                                    zIndex: cell.column.getIsPinned() ? 18 : 1,
                                    cursor: cell.column.getIsPinned() ? "pointer" : "inherit",
                                }}
                            >
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}