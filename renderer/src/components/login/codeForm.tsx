import { useEffect, useState } from "react"
import Logo from "../../assets/logo.png"

export function CodeForm({ isVisible }:{ isVisible : boolean }){
    const [code, setCode] = useState("");
    const [time, setTime] = useState(300);
    const [resendActive, setResendActive] = useState(false)

    //TODO: timer 커스텀 훅 만들어서 분리시키기
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

    const minute = String(Math.floor(time / 60)).padStart(2, "0");
    const second = String(time % 60).padStart(2, "0");

    const codeSubmit = () => {
        console.log(code)
    }
    return(
        <div className="flex flex-col justify-center items-center gap-[48px] w-full flex-shrink-0 p-[48px]">
            <div className="flex flex-col justify-center items-center w-full gap-[48px]">
                    <img src={Logo} alt="Logo" />
                    <div className="text-center">
                        <p className="text-[28px] font-bold">인증코드 입력</p>
                        <p className="text-base mt-[12px]">
                            이메일로 전송된 인증코드를 확인해주세요. <br />
                            남은 만료 시간 : {minute}분 {second}초
                        </p>
                    </div>
                </div>
                <div className="text-base w-full">
                    <label htmlFor="code">인증코드{resendActive ? <button>재전송</button> : null}</label>
                    <input
                        type="text"
                        id="code"
                        placeholder="인증코드"
                        className="w-full mt-[8px] p-[20px] rounded-2xl border border-gray-40"
                        value={code}
                        onChange={e => setCode(e.target.value)}
                    />
                </div>
                <button className="w-full rounded-2xl bg-blue-700 text-white p-[20px]" onClick={() => codeSubmit()}>이메일 인증하기</button>
        </div>
    )
}