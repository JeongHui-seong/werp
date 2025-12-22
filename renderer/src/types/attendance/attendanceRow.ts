export type attendanceRow = {
    date: string;
    clockIn: string | null;
    clockOut: string | null;
    worktime: number | null;
    lateTime: number;
    leave: string | null;
    note: string | null;
}

export type attendanceRowProps = {
    recordData?: attendanceRow[];
}