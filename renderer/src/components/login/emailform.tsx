import { useState } from "react"
import Logo from "../../assets/logo.png"
import useEmailValidation from "../../hooks/useEmailValidation";

export function Emailform(){
    const [email, setEmail] = useState("");
    const emailValid = useEmailValidation(email);

    const emailSubmit = () => {
        if (!emailValid) return console.log("실패");
        console.log("성공")
    }
    // console.log(email)
    return(
        <div className="flex flex-col rounded-2xl p-[48px] gap-[48px] shadow-sm bg-white">
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
            <div className="text-base">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="example@example.com"
                    className="w-full mt-[8px] p-[20px] rounded-2xl border border-gray-40"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <button className="w-full rounded-2xl bg-blue-700 text-white p-[20px]" onClick={() => emailSubmit()}>이메일 인증하기</button>
        </div>
    )
}