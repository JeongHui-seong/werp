import { EmailForm } from "./emailForm"
import type { EmailResult } from "../../types/login/emailResult"
import { CodeForm } from "./codeForm";
import { useState } from "react";
import { motion } from "framer-motion";

export function Loginform(){
    const [step, setStep] = useState<"email" | "code">("email")
    const handleEmailResult = (res: EmailResult) => {
        if (!res.success) return;
        console.log(res)
        setStep("code")
    }
    return(
        <div className="rounded-2xl shadow-sm bg-white overflow-hidden w-[488px]">
            <motion.div
                className="flex"
                animate={{ x: step == "code" ? "-100%" : "0%"}}
                transition={{ duration: 0.3}}
            >
                <EmailForm emailResult={handleEmailResult}/>
                <CodeForm />
            </motion.div>
        </div>
    )
}