interface Clockin {
    id: string;
    userId: string;
    date: string;
    clockin: string;
    clockout: string | null;
}

export interface ClockinResponse{
    attendance: Clockin;
    success: boolean;
    message: string;
}