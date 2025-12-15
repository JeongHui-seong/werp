import Logo from "../../assets/logo.png"
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import { useUserStore } from "../../hooks/useUserStore";
import { useClockIn } from "../../hooks/useClockIn";
import { useClockOut } from "../../hooks/useClockOut";
import { useAttendanceToday } from "../../hooks/useAttendanceToday";

export function Header(){
    const userName = useUserStore().user?.name;
    const { mutate: clockIn } = useClockIn();
    const { mutate: clockOut } = useClockOut();
    const { data, isLoading } = useAttendanceToday();
    const attendance = data?.attendance;
    const isWorking = attendance?.clockin && !attendance?.clockout
    const isDisabled = attendance?.clockin && attendance?.clockout

    let clockInOutBtnText = attendance && isWorking ? "퇴근하기" : "출근하기";
    
    const handleAttendance = () => {
        if (attendance && isWorking) {
            clockOut(attendance?.id);
        } else {
            clockIn();
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
                    disabled={isDisabled}
                    onClick={() => handleAttendance()}
                    className={`px-[12px] py-[6px] rounded-[12px] text-sm tracking-[-0.02em] transition-all ${isDisabled ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-700 cursor-pointer text-white"}`}
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