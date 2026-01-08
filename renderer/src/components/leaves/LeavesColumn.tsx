import type { ColumnDef } from "@tanstack/react-table";
import type { leavesColumnRow } from "../../types/leaves/leavesType";
import { format } from "date-fns";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const statusMap: Record<string, { label: string; bg: string }> = {
    approved: { label: "승인", bg: "bg-green-700" },
    pending: { label: "대기", bg: "bg-yellow-400" },
    rejected: { label: "거절", bg: "bg-red-700" },
}

export const leavesColumn: ColumnDef<leavesColumnRow>[] = [
        {
            accessorKey: "leave_type",
            header: "휴가 종류",
            cell: info => info.getValue<string>(),
            meta: {
                exportValue: (value: string) => {
                    return value;
                }
            }
        },
        {
            accessorKey: "created_at",
            header: "휴가 신청일",
            cell: info => {
                const value = info.getValue<string>();
                return format(new Date(value), "yyyy년 MM일 dd일");
            },
            meta: {
                exportValue: (value: string) => {
                    return format(new Date(value), "yyyy년 MM일 dd일");
                }
            }
        },
        {
            accessorKey: "status",
            header: "상태",
            cell: info => {
                const status = info.getValue<string>();
                const config = statusMap[status];
                return (
                    <span className={`${config.bg} text-white py-1 px-2 rounded-2xl text-sm`}>
                        {config.label}
                    </span>
                )
            },
            meta:{
                exportValue: (value:string) => {
                    return value;
                }
            }
        },
        {
            accessorKey: "start_date",
            header: "휴가 개시일",
            cell: info => {
                const value = info.getValue<string>();
                return format(new Date(value), "yyyy년 MM월 dd일");
            },
            meta: {
                exportValue: (value: string) => {
                    return format(new Date(value), "yyyy년 MM월 dd일");
                }
            }
        },
        {
            accessorKey: "end_date",
            header: "휴가 종료일",
            cell: info => {
                const value = info.getValue<string>();
                return format(new Date(value), "yyyy년 MM월 dd일");
            },
            meta: {
                exportValue: (value: string) => {
                    return format(new Date(value), "yyyy년 MM월 dd일");
                }
            }
        },
        {
            id: "actions",
            header: "",
            enableSorting: false,
            cell: ({ row, table }) => (
                <button
                    onClick={() => table.options.meta?.openDetail(row.original)}
                    className="cursor-pointer"
                >
                    <SearchRoundedIcon fontSize="small" />
                </button>
            )
        }
    ]
