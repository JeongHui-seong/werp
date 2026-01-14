import type { RowSelectionState } from "@tanstack/react-table";

type fetchUserFilter = {
    status?: "active" | "inactive" | "quit";
    roleName?: string;
    deptName?: string;
}

type fetchUserSort = {
    name?: "asc" | "desc";
    email?: "asc" | "desc";
    hireDate?: "asc" | "desc";
}

type fetchUserSearch = {
    keyword?: string;
    fields?: "name" | "email" | "phone";
}

export type fetchUserTypeRequest = {
    page: number;
    limit: number;
    filter?: fetchUserFilter;
    sort?: fetchUserSort;
    search?: fetchUserSearch;
}

export type fetchUserTypeResponse = {
    department: {
        id: number;
        name: string;
    };
    email: string;
    hireDate: string;
    id: string;
    name: string;
    phone: string;
    role: {
        id: number;
        name: string;
    };
    status: "active" | "inactive" | "quit";
}

export type usersColumnProps = {
    recordData?: fetchUserTypeResponse[];
    filename: string;
    rowSelection: RowSelectionState;
    setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>;
}

export type usersColumnRef = {
    exportToCsv: () => void;
}

export type userDetailDialogProps = {
    open: boolean;
    data: fetchUserTypeResponse | null;
    onClose: () => void;
}