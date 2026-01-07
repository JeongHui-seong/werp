import type { ColumnDef } from "@tanstack/react-table";
import type { leavesColumnRow } from "../../types/leaves/leavesType";
import { format } from "date-fns";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

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
            cell: info => info.getValue<string>(),
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
