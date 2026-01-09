type fetchUserFilter = {
    status?: "active" | "inactive";
    roleName?: string;
    deptName?: string;
}

type fetchUserSort = {
    name?: "ASC" | "DESC";
    email?: "ASC" | "DESC";
    phone?: "ASC" | "DESC";
    hireDate?: "ASC" | "DESC";
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
    hire_date: string;
    id: string;
    name: string;
    phone: string;
    role: {
        id: number;
        name: string;
    };
    status: "active" | "inactive";
}

export type usersColumnProps = {
    recordData?: fetchUserTypeResponse[];
    filename: string;
}

export type usersColumnRef = {
    exportToCsv: () => void;
}