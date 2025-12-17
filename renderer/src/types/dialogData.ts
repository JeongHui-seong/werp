export interface dialog{
    title: string;
    content: string;
    okButtonText: string;
    onOK: () => void;
}

export interface dialogProps{
    dialogData: dialog;
    open: boolean;
    onClose: () => void;
}