import type { dialogProps } from "../../types/dialogData";
import { motion } from "framer-motion";

export function Dialog({dialogData, onClose, open}: dialogProps){
    if (!open || !dialogData) return null;

    return(
        <div
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-30">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="rounded-2xl border border-gray-40 w-[300px] overflow-hidden bg-white text-base">
                <div className="h-[48px] bg-gray-100 flex items-center px-[20px] w-full">
                    <p>{dialogData.title}</p>
                </div>
                <div className="h-[80px] w-full px-[20px] flex items-center">
                    <p>{dialogData.content}</p>
                </div>
                <div className="flex items-center px-[20px] justify-between w-full h-[60px]">
                    <button
                        className="w-[124px] h-[40px] rounded-2xl bg-gray-100 cursor-pointer"
                        onClick={() => onClose()}
                    >취소</button>
                    <button
                        className="w-[124px] h-[40px] rounded-2xl bg-blue-700 cursor-pointer text-white"
                        onClick={() => {
                            dialogData.onOK()
                            onClose()
                        }}
                    >
                        {dialogData.okButtonText}
                    </button>
                </div>
            </motion.div>
        </div>
    )

}