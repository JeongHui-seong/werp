import { useState } from "react";
import Logo from "../../assets/logo.png"
import useEmailValidation from "../../hooks/auth/useEmailValidation";
import { emailValidation, login } from "../../api/authService";
import type { EmailFormProps } from "../../types/login/emailResult"
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import { useAuthStore } from "../../hooks/auth/useAuthStore";
import { useUserStore } from "../../hooks/auth/useUserStore";


export function EmailForm({ emailResult }: EmailFormProps){
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const emailValid = useEmailValidation(email);
    const setToken = useAuthStore(state => state.setToken);
    const setUser = useUserStore(state => state.setUser);

    const emailSubmit = async () => {
        try{
            if (!emailValid) return toast.error("이메일 형식이 아닙니다.");
            setIsLoading(true);
            if (email.trim() === "everyadmin1@hs.com" || email.trim() === "everyemployee1@hs.com") {
                const res = await login(email);
                if (!res.success) {
                    toast.error(res.message);
                    return;
                }
                toast.success(res.message);
                setToken(res.token);
                setUser(res.user);
            } else {
                const res = await emailValidation(email);
                emailResult({...res, email});
            }
        } catch (err) {
            toast.error("이메일 확인 중 네트워크 오류가 발생했습니다.");
            console.log("emailSubmit Error: ", err)
        } finally {
            setIsLoading(false);
        }
    }

    return(
        <div className="flex flex-col justify-center items-center gap-[48px] w-full flex-shrink-0 p-[48px]">
            <div className="flex flex-col justify-center items-center w-full gap-[48px]">
                    <img src={Logo} alt="Logo" />
                    <div className="text-center">
                        <p className="text-[28px] font-bold">이메일 인증</p>
                        <p className="text-base mt-[12px]">
                            현재 서비스는 이메일 인증된 회원에 한해 이용이 가능합니다. <br />
                            이메일 인증을 진행해주세요.
                        </p>
                    </div>
                </div>
                <div className="text-base w-full">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="example@example.com"
                        className="w-full mt-[8px] p-[20px] rounded-2xl border border-gray-40"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                emailSubmit()
                            }
                        }}
                    />
                </div>
                <button className="w-full rounded-2xl bg-blue-700 text-white p-[20px] cursor-pointer" onClick={() => emailSubmit()}>{isLoading ? <SyncLoader size={8} color="#ffffff"/> : "이메일 인증하기"}</button>
        </div>
    )
}