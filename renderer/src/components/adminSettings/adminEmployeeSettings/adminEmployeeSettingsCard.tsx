import { useMemo, useState } from "react";
import { useGetAllUsers } from "../../../hooks/admin/users/useGetAllUsers";
import { EmployeesTable } from "./adminEmployeeSettingsTable";
import type { fetchUserTypeResponse } from "../../../types/user/fetchUserType";
import { AdminEmployeeSettingsCreateModal } from "./adminEmployeeSettingsCreateModal";
import { getCoreRowModel, getFilteredRowModel, useReactTable, type RowSelectionState, type SortingState } from "@tanstack/react-table";
import { useDeleteUser } from "../../../hooks/admin/users/useDeleteUser";
import type { dialog } from "../../../types/dialogData";
import { toast } from "react-toastify";
import { Dialog } from "../../common/dialog";
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import { employeesColumn } from "./adminEmployeeSettingsColumn";
import { AdminEmployeeSettingsDetailModal } from "./adminEmployeeSettingsDetailModal";
import { useGetRoleDept } from "../../../hooks/admin/users/useGetRoleDept";
import { useSearchParams } from "react-router-dom";
import type { fetchUserSort } from "../../../types/user/fetchUserType";

export function AdminEmployeeSettingsCard(){
    const { mutate: deleteUser } = useDeleteUser();

    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 10);
    console.log(searchParams.toString())

    const deptId = searchParams.get("deptId") ?? "";
    const onChangeDeptId = (value: string) => {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);

            value ? params.set("deptId", value)
                    : params.delete("deptId");

            params.set("page", "1");
            return params;
        })
    }

    const roleId = searchParams.get("roleId") ?? "";
    const onChangeRoleId = (value: string) => {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);

            value ? params.set("roleId", value)
                    : params.delete("roleId");

            params.set("page", "1");
            return params;
        })
    }

    const statusMap = ["active", "inactive", "quit"] as const;
    type Status = typeof statusMap[number];
    const status = searchParams.get("status") ?? "";
    const onChangeStatus = (value: string) => {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);

            value ? params.set("status", value)
                    : params.delete("status");

            params.set("page", "1");
            return params;
        })
    }

    const isStatus = (value: string | null): value is Status => {
        return statusMap.includes(value as Status)
    }

    const filter = {
        ...(deptId && { deptId }),
        ...(roleId && { roleId }),
        ...(isStatus(status) && { status }),
    };
    
    const sortBy = searchParams.get("sortBy");
    const order = searchParams.get("order") as "asc" | "desc" | null;

    const sort: fetchUserSort | undefined = sortBy && order
        ? {[sortBy] : order} : undefined;

    const sorting = useMemo<SortingState>(() => {
        if (!sortBy || !order) return [];
        return [{id: sortBy, desc: "desc" === order}]
    }, [sortBy, order]);

    const [searchValue, setSearchValue] = useState<string>("");
    const keyword = searchParams.get("keyword");
    const onSearch = () => {
        if (searchValue.trim().length === 0) {
            toast.error("검색어를 입력해주세요.");
            return; 
        } 

        setSearchParams(prev => {
            const params = new URLSearchParams(prev);
            params.set("keyword", searchValue);
            params.set("page", "1");
            return params;
        })
    }
    const clearSearch = () => {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);
            params.delete("keyword");
            params.set("page", "1");
            return params;
        });
        setSearchValue("");
    }
    const searchFields = ["name", "email", "phone"] as const;
    const search = keyword ? {
        keyword,
        fields: searchFields,
    } : undefined;

    const { data: usersData } = useGetAllUsers({ page, limit, sort, filter, search});
    const recordData = usersData?.data;

    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [dialogData, setDialogData] = useState<dialog | null>(null);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const { data: roleDeptData } = useGetRoleDept();
    const roleData = roleDeptData?.role || [];
    const deptData = roleDeptData?.dept || [];
    const columns = employeesColumn(
        roleData, deptData, statusMap, status, onChangeDeptId, deptId, onChangeRoleId, roleId, onChangeStatus)

    const [selectedRow, setSelectedRow] =
        useState<fetchUserTypeResponse | null>(null);

    const openDetail = (row: fetchUserTypeResponse) => {
        setSelectedRow(row);
    };

    const closeDetail = () => {
        setSelectedRow(null);
    };

    const table = useReactTable({
        data: recordData ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualSorting: true,
        enableSorting: true,
        state: {
            rowSelection,
            sorting,
        },
        meta: {
            openDetail
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        getRowId: row => row.id,
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: updater => {
            const next = typeof updater === "function" ?
                updater(sorting) : updater;

            const first = next[0];

            setSearchParams(prev => {
                const params = new URLSearchParams(prev);

                if (!first) {
                    params.delete("sortBy");
                    params.delete("order");
                } else {
                    params.set("sortBy", first.id);
                    params.set("order", first.desc ? "desc" : "asc");
                    params.set("page", "1");
                }

                return params;
            })
        }
    });
    

    const onDelete = () => {
        const ids = Object.keys(rowSelection)
        
        if (ids.length === 0) {
            toast.error("삭제할 항목을 선택해주세요.");
            return;
        }

        setDialogData({
            title: "직원 삭제",
            content: `${ids.length}명의 직원을 삭제하시겠습니까?`,
            okButtonText: "삭제하기",
            onOK: () => {
                deleteUser(ids);
            }
        })

        setDialogOpen(true)
    }

    return(
        <>
            {dialogData &&
                <Dialog 
                    dialogData={dialogData}
                    onClose={() => setDialogOpen(false)}
                    open={dialogOpen}
                />
            }
            <div className="w-full h-full bg-white p-[20px] rounded-2xl overflow-hidden flex flex-col">
                <h2 className="font-bold text-center text-lg">직원 관리 설정</h2>
                <div className="flex w-full justify-end items-center gap-[20px] mt-[20px]">
                    <button 
                        onClick={() => setCreateModalOpen(true)}
                        className="px-[12px] py-[6px] rounded-2xl text-base bg-green-700 text-white cursor-pointer hover:bg-green-600 transition-all"
                    >추가하기</button>
                    <button
                        onClick={() => onDelete()}
                        className="px-[12px] py-[6px] rounded-2xl text-base bg-red-700  text-white cursor-pointer hover:bg-red-600 transition-all"
                    >삭제하기</button>
                </div>
                <div className="flex align-center justify-start gap-[12px] mt-[20px]">
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="이름, 이메일, 전화번호 검색"
                        className="rounded-2xl border border-gray-40 px-[12px] py-[6px] text-base w-[250px]"
                    />
                    <button
                        className="rounded-2xl border border-gray-40 px-[12px] py-[6px] bg-white text-base hover:bg-gray-100 transition-all cursor-pointer"
                        onClick={onSearch}
                    >검색</button>
                    {keyword && 
                        <button
                            onClick={clearSearch}
                            className="rounded-2xl border border-gray-40 px-[12px] py-[6px] bg-white text-base hover:bg-gray-100 transition-all cursor-pointer"
                        >검색 초기화</button>
                    }
                </div>
                <EmployeesTable
                    table={table}
                />
                <AdminEmployeeSettingsDetailModal
                    open={!!selectedRow}
                    data={selectedRow}
                    onClose={closeDetail}
                />
                <div className="flex items-center justify-end w-full gap-[12px] mt-[20px]">
                    <button
                        className="cursor-pointer flex items-center justify-center p-[3px] border border-black text-base text-black bg-white rounded-lg hover:bg-gray-100 transition-all"
                        onClick={() => table.firstPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <KeyboardDoubleArrowLeftRoundedIcon fontSize="small" />
                    </button>
                    <button
                        className="cursor-pointer flex items-center justify-center p-[3px] border border-black text-base text-black bg-white rounded-lg hover:bg-gray-100 transition-all"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <KeyboardArrowLeftRoundedIcon fontSize="small" />
                    </button>
                    <span className="text-base text-black">
                        {`${table.getState().pagination.pageIndex + 1} / ${table.getPageCount().toLocaleString()}`}
                    </span>
                    <button
                        className="cursor-pointer flex items-center justify-center p-[3px] border border-black text-base text-black bg-white rounded-lg hover:bg-gray-100 transition-all"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <KeyboardArrowRightRoundedIcon fontSize="small" />
                    </button>
                    <button
                        className="cursor-pointer flex items-center justify-center p-[3px] border border-black text-base text-black bg-white rounded-lg hover:bg-gray-100 transition-all"
                        onClick={() => table.lastPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <KeyboardDoubleArrowRightRoundedIcon fontSize="small" />
                    </button>
                    <select name="limit" id="limit"
                        value={limit}
                        className="cursor-pointer flex items-center justify-center p-[3px] border border-black text-base text-black bg-white rounded-lg hover:bg-gray-100 transition-all"
                        onChange={(e) => {
                            setSearchParams(prev => {
                                const params = new URLSearchParams(prev);
                                params.set("limit", e.target.value);
                                params.set("page", "1");
                                return params;
                            })
                        }}
                    >
                        {[10,20,30,40,50].map(n => (
                            <option key={n} value={n}>
                                {`${n}개씩 보기`}
                            </option>
                        ))}
                    </select>
                </div>
                <AdminEmployeeSettingsCreateModal
                    open={createModalOpen}
                    onClose={() => setCreateModalOpen(false)}
                />
            </div>
        </>
    )
}