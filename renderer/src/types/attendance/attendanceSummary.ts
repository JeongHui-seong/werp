export type attendanceSummary = {
    totalWorkMinutes: number;
    avgWorkMinutes: number;
    overtimeMinutes: number;
    lateMinutes: number;
}

export type attendanceSummaryProps = {
    summaryData?: attendanceSummary
}