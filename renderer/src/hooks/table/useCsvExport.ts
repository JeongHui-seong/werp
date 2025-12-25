import type { Table } from "@tanstack/react-table";

export const useCsvExport = <T>(
    table: Table<T>,
    filename: string
) => {
    return () => {
        const headers = table.getVisibleLeafColumns();

        const csvHeaders = headers.map(header => {
            const h = header.columnDef.header;
            return typeof h === 'string' ? h : ""
        })

        const columns = table.getVisibleLeafColumns();

        const rows = table.getRowModel().rows.map(row =>
            columns.map(column => {
                const cell = row.getVisibleCells()
                .find(c => c.column.id === column.id);

                if (!cell) return "";

                const meta = column.columnDef.meta as any;

                // CSV 전용 값 우선 사용
                if (meta?.exportValue) {
                return meta.exportValue(cell.getValue());
                }

                // fallback (문자/숫자만)
                const value = cell.getValue();
                return typeof value === "string" || typeof value === "number"
                ? value
                : "";
            })
        );



        // CSV 문자열 생성
        const csvContent =
        [csvHeaders, ...rows]
            .map(row => row.map(v => `"${String(v)}"`).join(","))
            .join("\n");

        // 다운로드
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${filename}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }
    };