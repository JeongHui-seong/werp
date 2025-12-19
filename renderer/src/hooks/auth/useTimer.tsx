import { useEffect, useState } from "react";

export default function useTimer({ isVisible } : { isVisible: boolean }){
    const [time, setTime] = useState(300);
    const [resendActive, setResendActive] = useState(false)
    useEffect(() => {
        if (!isVisible) return;
        if (time <= 0) {
            setResendActive(true);
            return;
        }
    
        const timer = setInterval(() => {
            setTime(time => time - 1);
        }, 1000)
    
        return () => clearInterval(timer);
    },[time, isVisible]);

    return { time, resendActive }
}