export interface EmailResult {
    success: boolean;
    message: string;
    code?: string;
    email: string;
}

export interface EmailFormProps {
    emailResult: (data: EmailResult) => void;
}