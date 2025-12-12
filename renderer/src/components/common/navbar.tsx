import { NavLink, useLocation } from "react-router-dom";
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { useState } from "react";

export function Navbar(){
    const [openMenu, setOpenMenu] = useState<String | null>(null);
    const { pathname } = useLocation();

    const toggleMenu = (menu: string) => {
        setOpenMenu(prev => (prev === menu ? null : menu))
    }
    const isAttendanceActive = pathname.startsWith("/attendance")
    return (
        <div className="w-[200px] min-h-[calc(100vh-80px)] rounded-tr-xl bg-white p-[20px]">
            <ul>
                <li>
                    <NavLink to='/dashboard' onClick={() => setOpenMenu(null)} className={({isActive}) => `w-full flex gap-[8px] px-[12px] py-[10px] cursor-pointer rounded-[12px] transition-all duration-200 ${isActive ? "bg-gray-100" : ''}`}><GridViewRoundedIcon /> <p>대시보드</p></NavLink>
                </li>
                <li>
                    <p onClick={() => toggleMenu("attendance")} className={`flex justify-between px-[12px] py-[10px] cursor-pointer rounded-[12px] transition-all duration-200 ${isAttendanceActive ? "bg-gray-100" : ""}`}><span className="flex gap-[8px]"><CalendarMonthRoundedIcon />근태관리</span><KeyboardArrowRightRoundedIcon className={`${openMenu === "attendance" ? "rotate-90" : ""}`}/></p>
                    <ul className={`overflow-hidden ${openMenu === "attendance" ? "h-full" : "h-0"}`}>
                        <li>
                            <NavLink to='/attendance/attendance'  className={({isActive}) => `w-full flex gap-[8px] px-[24px] py-[10px] cursor-pointer rounded-[12px] transition-all duration-200 ${isActive ? "text-blue-700" : ''}`}>근태 현황</NavLink>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}