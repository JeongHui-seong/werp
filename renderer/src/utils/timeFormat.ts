export const timeFormatSeconds = (value?: number | null) => {
    if (!value) return "-";

    const h = Math.floor(value / 3600);
    const m = Math.floor((value % 3600) / 60);
    const s = value % 60
    return `${h}시 ${m}분 ${s}초`;
}

export const timeFormatMinutes = (value?: number | null) => {
    if (!value) return "-";

    const h = Math.floor(value / 60);
    const m = value % 60;
    if (h === 0) return `${m}분`
    return `${h}시간 ${m}분`;
}