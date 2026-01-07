import type { Dispatch, SetStateAction } from "react";

export type leavesSummary = {
    remainingLeaves: number;
    usedLeaves: number;
    pendingLeaves: number;
}

export type leavesSummaryProps = {
    summaryData?: leavesSummary
}

export type leavesColumnRow = {
    id: number;
    start_date: string;
    end_date: string;
    status: string;
    reason: string | null;
    approved_at: string | null;
    created_at: string;
    rejection_reason: string | null;
    approver_name: string | null;
    leave_type: string;
}

export type leavesColumnProps = {
    recordData?: leavesColumnRow[];
    filename: string;
}

export type leavesColumnRef = {
    exportToCsv: () => void;
}

export type createLeavesDialogProps = {
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export type createLeavesPayload = {
    created_at: string;
    leave_type: string;
    startdate: string | null;
    enddate: string | null;
    reason: string;
}

export type LeaveDetailModalProps = {
    open: boolean;
    data: leavesColumnRow | null;
    onClose: () => void;
}