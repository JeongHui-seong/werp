import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import type { attendanceRowProps, attendanceRow } from "../../types/attendance/attendanceRow";
import { type ColumnDef, useReactTable, flexRender, getCoreRowModel, getSortedRowModel } from "@tanstack/react-table";
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded';

export function MonthlyAttendanceTable({recordData}:attendanceRowProps){
    const attendanceColumn: ColumnDef<attendanceRow>[] = [
        {
            accessorKey: "date",
            header: "날짜",
            cell: info => {
                return format(new Date(info.getValue<string>()), "yyyy년 MM월 dd일");
            },
        },
        {
            id: "clockIn",
            header: "출근 시간",
            accessorFn: row => {
                if (!row.clockIn) return null;

                const date = toZonedTime(
                    new Date(row.clockIn),
                    "Asia/Seoul"
                );

                return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
            },
            cell: info => {
                const value = info.getValue<number | null>();
                if (!value) return "-";

                const h = Math.floor(value / 3600);
                const m = Math.floor((value % 3600) / 60);
                const s = value % 60
                return `${h}시 ${m}분 ${s}초`;
            }
        },
        {
            id: "clockOut",
            header: "퇴근 시간",
            accessorFn: row => {
                if (!row.clockOut) return null;

                const date = toZonedTime(
                    new Date(row.clockOut),
                    "Asia/Seoul"
                );

                return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
            },
            cell: info => {
                const value = info.getValue<number | null>();
                if (!value) return "-";

                const h = Math.floor(value / 3600);
                const m = Math.floor((value % 3600) / 60);
                const s = value % 60
                return `${h}시 ${m}분 ${s}초`;
            }
        },
        {
            accessorKey: "worktime",
            header: "근무 시간",
            cell: info => {
                const value = info.getValue<number | null>();
                if (!value) return "-";
                const h = Math.floor(value / 60);
                const m = value % 60;
                if (h === 0) return `${m}분`
                return `${h}시간 ${m}분`;
            },
            sortDescFirst: false,
        },
        {
            accessorKey: "lateTime",
            header: "지각 시간",
            cell: info => {
            const value = info.getValue<number>();
            if (value === 0) return "-";
            const h = Math.floor(value / 60);
            const m = value % 60;
            if (h === 0) return `${m}분`
            return `${h}시간 ${m}분`;
            },
            sortDescFirst: false,
        },
        {
            accessorKey: "note",
            header: "비고",
            cell: info => info.getValue() ?? "-",
        },
    ]

    const table = useReactTable({
        data: recordData ?? [],
        columns: attendanceColumn,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        enableSorting: true,
    });

    const SortIcon = ({ column }: {column : any}) => {
        const sort = column.getIsSorted();

        if (sort === 'asc') return <ArrowUpwardRoundedIcon fontSize="small" />
        if (sort === 'desc') return <ArrowDownwardRoundedIcon fontSize="small" />
        return <SwapVertRoundedIcon fontSize="small"/>
    }

    return(
        <div className="mt-[20px] w-full max-h-[365px] overflow-auto text-base text-center">
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
                                        <SortIcon column={header.column} />
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
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
        </div>
    )
}