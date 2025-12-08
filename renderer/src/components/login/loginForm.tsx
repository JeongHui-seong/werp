import { EmailForm } from "./emailForm"
import type { EmailResult } from "../../types/login/emailResult"
import { CodeForm } from "./codeForm";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export function Loginform(){
    const [step, setStep] = useState<"email" | "code">("email")
    const [emailCode, setEmailCode] = useState("")
    const [email, setEmail] = useState("")

    const handleEmailResult = (res: EmailResult) => {
        if (!res.success) return toast.error(res.message);
        toast.success(res.message);
        setStep("code");
        setEmailCode(res.code || "");
        setEmail(res.email);
    }
    return(
        <div className="rounded-2xl shadow-sm bg-white overflow-hidden w-[488px]">
            <motion.div
                className="flex"
                animate={{ x: step == "code" ? "-100%" : "0%"}}
                transition={{ duration: 0.3}}
            >
                <EmailForm emailResult={handleEmailResult}/>
                <CodeForm emailCode={emailCode} isVisible={step === "code"} email={email}/>
            </motion.div>
        </div>
    )
}