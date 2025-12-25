import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded';

export const SortIcon = ({ column }: {column : any}) => {
        const sort = column.getIsSorted();

        if (sort === 'asc') return <ArrowUpwardRoundedIcon fontSize="small" />
        if (sort === 'desc') return <ArrowDownwardRoundedIcon fontSize="small" />
        return <SwapVertRoundedIcon fontSize="small"/>
}