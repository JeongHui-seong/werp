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
    startdate: string;
    enddate: string;
    status: string;
    reason: string | null;
    approvedAt: string | null;
    createdAt: string;
    rejectionReason: string | null;
    approverName: string | null;
    leaveType: string;
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