import { NavLink, useLocation } from "react-router-dom";
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import { useState } from "react";
import { useUserStore } from "../../hooks/auth/useUserStore";

export function Navbar(){
    type MenuKey = "attendance" | "admin";
    const [openMenu, setOpenMenu] = useState<Record<MenuKey, boolean>>({
        attendance: false,
        admin: false,
    });
    const { pathname } = useLocation();

    const toggleMenu = (menu: MenuKey) => {
        setOpenMenu(prev => ({
            ...prev,
            [menu]: !prev[menu]
        }))
    }

    const isAttendanceActive = pathname.startsWith("/attendance");
    const isAdminActive = pathname.startsWith("/admin");

    const user = useUserStore();

    return (
        <div className="w-[200px] min-h-[calc(100vh-80px)] rounded-tr-2xl bg-white p-[20px]">
            <ul>
                <li>
                    <NavLink to='/dashboard' className={({isActive}) => `w-full flex gap-[8px] px-[12px] py-[10px] cursor-pointer rounded-2xl transition-all duration-200 ${isActive ? "bg-gray-100" : ''}`}><GridViewRoundedIcon /> <p>대시보드</p></NavLink>
                </li>
                <li>
                    <p onClick={() => toggleMenu("attendance")} className={`flex justify-between px-[12px] py-[10px] cursor-pointer rounded-2xl transition-all duration-200 ${isAttendanceActive ? "bg-gray-100" : ""}`}><span className="flex gap-[8px]"><CalendarMonthRoundedIcon />근태관리</span><KeyboardArrowRightRoundedIcon className={`${openMenu.attendance ? "rotate-90" : ""}`}/></p>
                    <ul className={`overflow-hidden ${openMenu.attendance ? "h-full" : "h-0"}`}>
                        <li>
                            <NavLink to='/attendance/attendance'  className={({isActive}) => `w-full flex gap-[8px] px-[24px] py-[10px] cursor-pointer rounded-2xl transition-all duration-200 ${isActive ? "text-blue-700" : ''}`}>근태 현황</NavLink>
                        </li>
                        <li>
                            <NavLink to='/attendance/leaves'  className={({isActive}) => `w-full flex gap-[8px] px-[24px] py-[10px] cursor-pointer rounded-2xl transition-all duration-200 ${isActive ? "text-blue-700" : ''}`}>휴가 현황</NavLink>
                        </li>
                    </ul>
                </li>
                {user?.user?.role === "admin" &&                 
                    <li>
                        <p onClick={() => toggleMenu("admin")} className={`flex justify-between px-[12px] py-[10px] cursor-pointer rounded-2xl transition-all duration-200 ${isAdminActive ? "bg-gray-100" : ""}`}><span className="flex gap-[8px]"><ManageAccountsRoundedIcon />관리자</span><KeyboardArrowRightRoundedIcon className={`${openMenu.admin ? "rotate-90" : ""}`}/></p>
                        <ul className={`overflow-hidden ${openMenu.admin ? "h-full" : "h-0"}`}>
                            <li>
                                <NavLink to='/admin/leaveSettings'  className={({isActive}) => `w-full flex gap-[8px] px-[24px] py-[10px] cursor-pointer rounded-2xl transition-all duration-200 ${isActive ? "text-blue-700" : ''}`}>휴가 설정</NavLink>
                            </li>
                        </ul>
                    </li>
                }
            </ul>
        </div>
    )
}