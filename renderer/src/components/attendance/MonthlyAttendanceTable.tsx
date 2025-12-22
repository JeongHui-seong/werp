import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import type { attendanceRowProps, attendanceRow } from "../../types/attendance/attendanceRow";
import { type ColumnDef, useReactTable, flexRender, getCoreRowModel, getSortedRowModel } from "@tanstack/react-table";
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded';
import type { monthlyAttendanceRef } from "../../types/attendance/attendanceRow";
import { forwardRef, useImperativeHandle } from "react";

export const MonthlyAttendanceTable = forwardRef<monthlyAttendanceRef, attendanceRowProps>(({ recordData, filename }, ref) => {
    const attendanceColumn: ColumnDef<attendanceRow>[] = [
        {
            accessorKey: "date",
            header: "날짜",
            cell: info => {
                return format(new Date(info.getValue<string>()), "yyyy년 MM월 dd일");
            },
            meta:{
                exportValue: (value: string) => {return format(new Date(value), "yyyy년 MM월 dd일")}
            }
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
            },
            meta: {
                exportValue: (value: number) => {
                    if (!value) return "-";

                    const h = Math.floor(value / 3600);
                    const m = Math.floor((value % 3600) / 60);
                    const s = value % 60
                    return `${h}시 ${m}분 ${s}초`;
                }
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
            },
            meta: {
                exportValue: (value: number) => {
                    if (!value) return "-";

                    const h = Math.floor(value / 3600);
                    const m = Math.floor((value % 3600) / 60);
                    const s = value % 60
                    return `${h}시 ${m}분 ${s}초`;
                }
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
            meta: {
                exportValue: (value: number) => {
                    if(!value) return "-";
                    const h = Math.floor(value / 60);
                    const m = value % 60;
                    if (h === 0) return `${m}분`
                    return `${h}시간 ${m}분`;
                }
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
            meta: {
                exportValue: (value:number) => {
                    if (value === 0) return "-";
                    const h = Math.floor(value / 60);
                    const m = value % 60;
                    if (h === 0) return `${m}분`
                    return `${h}시간 ${m}분`;
                }
            },
            sortDescFirst: false,
        },
        {
            accessorKey: "note",
            header: "비고",
            cell: info => info.getValue() ?? "-",
            meta:{
                exportValue: (value:string) => {
                    return value;
                }
            }
        },
    ]

    const table = useReactTable<attendanceRow>({
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

    const handleExportToCsv = (): void => {
        const headers = table.getVisibleLeafColumns();

        const csvHeaders = headers.map(header => {
            const h = header.columnDef.header;
            return typeof h === 'string' ? h : ""
        })

        const columns = table.getVisibleLeafColumns();

        const rows = table.getRowModel().rows.map(row =>
            columns.map(column => {
                const cell = row.getVisibleCells()
                .find(c => c.column.id === column.id);

                if (!cell) return "";

                const meta = column.columnDef.meta as any;

                // CSV 전용 값 우선 사용
                if (meta?.exportValue) {
                return meta.exportValue(cell.getValue());
                }

                // fallback (문자/숫자만)
                const value = cell.getValue();
                return typeof value === "string" || typeof value === "number"
                ? value
                : "";
            })
        );



        // CSV 문자열 생성
        const csvContent =
        [csvHeaders, ...rows]
            .map(row => row.map(v => `"${String(v)}"`).join(","))
            .join("\n");

        // 다운로드
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${filename}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    useImperativeHandle(ref, () => ({
        exportToCsv: handleExportToCsv,
    }));


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
        </div>
    )
})