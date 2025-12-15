interface attendance {
    id: string;
    userId: string;
    date: string;
    clockin: string;
    clockout: string | null;
}

export interface attendanceResponse{
    attendance: attendance;
    success: boolean;
    message: string;
}