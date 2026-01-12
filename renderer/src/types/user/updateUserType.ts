export type updateUserPayload = {
    name?: string,
    email?: string,
    phone?: string,
    status?: "active" | "inactive" | "quit",
    departmentId?: number,
    roleId?: number,
    hire_date?: string;
}

export type updateUserHookType = {
    id: string;
    payload: updateUserPayload;
}