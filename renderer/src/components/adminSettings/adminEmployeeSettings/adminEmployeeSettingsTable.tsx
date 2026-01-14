import type { fetchUserTypeResponse } from "../../../types/user/fetchUserType";
import { useReactTable } from "@tanstack/react-table";
import { TableUI } from "../../table/tableUI";


type Props = {
  table: ReturnType<typeof useReactTable<fetchUserTypeResponse>>;
};

export const EmployeesTable = ({ table }: Props) => {
    return(
        <div className="mt-[20px] w-full overflow-auto text-base text-center">
            <TableUI table={table} />
        </div>
    )
}