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
}

export type leavesTypeProps = {
    recordData?: leavesTypeDraft[];
    editMode: boolean;
    onChange: React.Dispatch<React.SetStateAction<leavesTypeDraft[]>>;
}

export type upsertLeavesType = {
    type: string;
    days: number;
}