export interface EmailResult {
    success: boolean;
    message: string;
    code: string;
}

export interface EmailFormProps {
    emailResult: (data: EmailResult) => void;
}