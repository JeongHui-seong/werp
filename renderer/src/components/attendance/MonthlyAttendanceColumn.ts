import type { ColumnDef } from "@tanstack/react-table";
import type { attendanceRow } from "../../types/attendance/attendanceRow";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { timeFormatSeconds, timeFormatMinutes } from "../../utils/timeFormat"

export const attendanceColumn: ColumnDef<attendanceRow>[] = [
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
                return timeFormatSeconds(value);
            },
            meta: {
                exportValue: (value: number) => {
                    return timeFormatSeconds(value);
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
                return timeFormatSeconds(value)
            },
            meta: {
                exportValue: (value: number) => {
                    return timeFormatSeconds(value);
                }
            }
        },
        {
            accessorKey: "worktime",
            header: "근무 시간",
            cell: info => {
                const value = info.getValue<number | null>();
                return timeFormatMinutes(value)
            },
            meta: {
                exportValue: (value: number) => {
                    return timeFormatMinutes(value);
                }
            },
            sortDescFirst: false,
        },
        {
            accessorKey: "lateTime",
            header: "지각 시간",
            cell: info => {
                const value = info.getValue<number>();
                return timeFormatMinutes(value);
            },
            meta: {
                exportValue: (value:number) => {
                    return timeFormatMinutes(value);
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