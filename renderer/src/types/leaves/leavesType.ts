import type { RowSelectionState } from "@tanstack/react-table";

export type leavesType = {
    id?: number;
    type: string;
    days: number;
}

export type leavesTypeDraft = {
    rowId: string;
    id?: number;
    type: string;
    days: number | string;
    isDirty: boolean;
    isNew: boolean;
    original:{
        type: string;
        days: number | string;
    }
}

export type leavesTypeProps = {
    recordData?: leavesTypeDraft[];
    editMode: boolean;
    onChange: React.Dispatch<React.SetStateAction<leavesTypeDraft[]>>;
    rowSelection: RowSelectionState;
    setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>;
}

export type upsertLeavesTypePayload = leavesType[];

export type Response = {
    success: boolean;
    message: string;
}

export type updateLeavesPolicyPayload = {
    year: number;
    days: number;
}