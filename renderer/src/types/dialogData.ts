export interface dialog{
    title: string;
    content: string;
    okButtonText: string;
    onOK: () => void;
}

export interface dialogProps{
    dialogData: dialog | null;
    open: boolean;
    onClose: () => void;
}