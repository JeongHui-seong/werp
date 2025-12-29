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