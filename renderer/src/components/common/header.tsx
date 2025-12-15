import Logo from "../../assets/logo.png"
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import { useUserStore } from "../../hooks/useUserStore";
import { useClockIn } from "../../hooks/useClockIn";
import { useAttendanceToday } from "../../hooks/useAttendanceToday";

export function Header(){
    const userName = useUserStore().user?.name;
    const { mutate: clockIn } = useClockIn();
    const { data, isLoading } = useAttendanceToday();
    const attendance = data?.attendance;

    let clockInOutBtnText = "출근하기";

    if (attendance) {
        if (attendance.clockin && !attendance.clockout) {
            clockInOutBtnText = "퇴근하기"
        }
    }
    
    console.log(attendance)

    return(
        <div className="w-full h-[60px] flex items-center justify-between px-[20px] bg-white">
            <div className="h-[20px]">
                <img src={Logo} alt="logo" className="h-full"/>
            </div>
            <div className="flex items-center justify-center gap-[20px]">
                <button
                    onClick={() => clockIn()}
                    className="px-[12px] py-[6px] rounded-[12px] text-sm bg-blue-700 cursor-pointer text-white tracking-[-0.02em]"
                >{isLoading ? "로딩 중" : clockInOutBtnText}</button>
                <div className="flex items-center justify-center gap-[12px]">
                    <div className="cursor-pointer">
                        <NotificationsNoneRoundedIcon className="cursor-pointer"/>
                    </div>
                    <p className="text-sm">{userName}</p>
                </div>
            </div>
        </div>
    )
}