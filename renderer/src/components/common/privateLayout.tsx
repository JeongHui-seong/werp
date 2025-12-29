import { Header } from "./header"
import { Navbar } from "./navbar"
import { Outlet } from "react-router-dom"

export function PrivateLayout(){
    return(
        <>
            <div className="w-full h-[100vh] flex flex-col gap-[20px] bg-gray-100 relative">
                <Header />
                <div className="w-full max-h-[calc(100vh-80px)] flex gap-[20px]">
                    <Navbar />
                    <Outlet />
                </div>
            </div>
        </>
    )
}