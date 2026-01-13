export type createUserDialogProps = {
    open: boolean;
    onClose: () => void;
}

export type createUserPayload = {
    email: string;
    name: string;
    phone: string;
    status: "active" | "inactive" | "quit";
    hire_date: Date;
    dept_id: number;
    role_id: number;
}