import Logo from "../../assets/logo.png"
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import { useUserStore } from "../../hooks/auth/useUserStore";
import { useClockIn } from "../../hooks/attendance/useClockIn";
import { useClockOut } from "../../hooks/attendance/useClockOut";
import { useAttendanceToday } from "../../hooks/attendance/useAttendanceToday";
import { Dialog } from "./dialog";
import { useRef, useState } from "react";
import type { dialog } from "../../types/dialogData";
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import { useAuthStore } from "../../hooks/auth/useAuthStore";
import { toast } from "react-toastify";
import { useClickOutside } from "../../hooks/common/useClickOutside";

export function Header(){
    const userName = useUserStore().user?.name;
    const { mutate: clockIn } = useClockIn();
    const { mutate: clockOut } = useClockOut();
    const { data, isLoading } = useAttendanceToday();

    const attendance = data?.attendance;
    const isWorking = attendance?.clockin && !attendance?.clockout;
    const isDisabled = attendance?.clockin && attendance?.clockout;

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogData, setDialogData] = useState<dialog | null>(null);

    let clockInOutBtnText = attendance && isWorking ? "퇴근하기" : "출근하기";

    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    const profileMenuRef = useRef<HTMLDivElement>(null);
    useClickOutside(profileMenuRef, () => setProfileMenuOpen(false))
    
    const handleAttendance = () => {
        if (attendance && isWorking) {
            setDialogData({
                title: "퇴근 등록",
                content: "퇴근 등록을 하시겠습니까?",
                okButtonText: "퇴근 등록",
                onOK: () => clockOut(attendance?.id)
            })
        } else {
            setDialogData({
                title: "출근 등록",
                content: "출근 등록을 하시겠습니까?",
                okButtonText: "출근 등록",
                onOK: () => clockIn()
            })
        }

        setDialogOpen(true);
    }

    const handleLogout = () => {
        setDialogData({
            title: "로그아웃",
            content: "로그아웃 하시겠습니까?",
            okButtonText: "로그아웃",
            onOK: () => {
                useAuthStore.getState().clearToken();
                useUserStore.getState().clearUser();
                toast.success("로그아웃 되었습니다.");
            }
        })
        setDialogOpen(true);
    }

    return(
        <>
        {dialogData && (
            <Dialog 
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                dialogData={dialogData}
            />
        )}
            <div
                className="w-full h-[60px] flex items-center justify-between px-[20px] bg-white">
                <div className="h-[20px]">
                    <img src={Logo} alt="logo" className="h-full"/>
                </div>
                <div className="flex items-center justify-center gap-[20px]">
                    <button
                        disabled={isDisabled}
                        onClick={handleAttendance}
                        className={`px-[12px] py-[6px] rounded-2xl text-sm tracking-[-0.02em] transition-all ${isDisabled ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-700 cursor-pointer text-white hover:bg-blue-600 transition-all"}`}
                        >{isLoading ? "로딩 중" : clockInOutBtnText}</button>
                    <div className="flex items-center justify-center gap-[12px]">
                        <div className="cursor-pointer">
                            <NotificationsNoneRoundedIcon className="cursor-pointer"/>
                        </div>
                        <div
                            ref={profileMenuRef}
                            onClick={(e) => {
                                e.stopPropagation();
                                setProfileMenuOpen(prev => !prev);
                            }}
                            className="relative bg-white flex items-center justify-center gap-[8px] cursor-pointer rounded-2xl px-[12px] py-[6px] hover:bg-gray-100 transition-all">
                            <button className="text-sm cursor-pointer">{userName}</button>
                            <ArrowDropDownRoundedIcon />
                            {profileMenuOpen && (
                                <div 
                                    onClick={(e) => e.stopPropagation()}
                                    className="absolute top-[50px] bg-white rounded-2xl shadow-lg flex flex-col ">
                                    <button
                                        onClick={handleLogout}
                                        className="text-sm bg-white cursor-pointer rounded-2xl px-[12px] py-[6px] hover:bg-gray-100 transition-all">로그아웃</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}