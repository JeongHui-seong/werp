import Logo from "../../assets/logo.png"
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import { useUserStore } from "../../hooks/useUserStore";

export function Header(){
    const userName = useUserStore().user?.name;
    return(
        <div className="w-full h-[60px] flex items-center justify-between px-[20px] bg-white">
            <div className="h-[20px]">
                <img src={Logo} alt="logo" className="h-full"/>
            </div>
            <div className="flex items-center justify-center gap-[20px]">
                <button className="px-[12px] py-[6px] rounded-[12px] text-sm bg-blue-700 cursor-pointer text-white tracking-[-0.02em]">출근하기</button>
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