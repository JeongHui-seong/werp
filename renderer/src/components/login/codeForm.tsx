import { useState } from "react"
import Logo from "../../assets/logo.png"
import useTimer from "../../hooks/useTimer";
import { login, resendVerification } from "../../api/authService";
import { toast } from "react-toastify";
import { useAuthStore } from "../../hooks/useAuthStore";

interface codeParams {
    isVisible : boolean;
    emailCode: string;
    email: string;
}

export function CodeForm({ isVisible, emailCode, email }:codeParams){
    const [code, setCode] = useState("");
    const timer = useTimer({isVisible});
    const setToken = useAuthStore(state => state.setToken);

    const minute = String(Math.floor(timer.time / 60)).padStart(2, "0");
    const second = String(timer.time % 60).padStart(2, "0");

    const codeSubmit = async () => {
        if (emailCode !== code) {
            toast.error("인증코드가 일치하지 않습니다.");
            return;
        }
        try{
            const res = await login(email);
            if (!res.success) {
                toast.error(res.message);
                return;
            }
            toast.success(res.message);
            setToken(res.token);
            //TODO: 유저 정보 zustand 저장
        } catch (err) {
            toast.error("로그인 중 네트워크 오류가 발생했습니다.")
            console.log("codeSubmit Error: ", err);
        }
    }
    //TODO: 엔터 눌렀을 때도 코드 submit되는 기능 구현하기, 코드 검증하는 동안 스피너 구현

    const codeResend = async() => {
        try{
            const res = await resendVerification(email);
            if (!res.success) {
                toast.error(res.message);
                return;
            }
            setCode(res.code);
            toast.success(res.message);
        } catch (err) {
            toast.error("코드 재전송 중 네트워크 오류가 발생했습니다.");
            console.log("codeResend Error: ", err);
        }
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
                    <label htmlFor="code" className="w-full flex items-center justify-between">인증코드{timer.resendActive ? <button className="cursor-pointer text-blue-700" onClick={() => codeResend()}>재전송</button> : null}</label>
                    <input
                        type="text"
                        id="code"
                        placeholder="인증코드"
                        className="w-full mt-[8px] p-[20px] rounded-2xl border border-gray-40"
                        value={code}
                        onChange={e => setCode(e.target.value)}
                    />
                </div>
                <button className="w-full rounded-2xl bg-blue-700 text-white p-[20px] cursor-pointer" onClick={() => codeSubmit()}>이메일 인증하기</button>
        </div>
    )
}