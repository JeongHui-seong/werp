import { Header } from "./header"
import { Navbar } from "./navbar"
import { Outlet } from "react-router-dom"

export function PrivateLayout(){
    return(
        <>
            <div className="w-full h-[100vh] flex flex-col gap-[20px] bg-gray-100">
                <Header />
                <div className="w-full flex gap-[20px]">
                    <Navbar />
                    <Outlet />
                </div>
            </div>
        </>
    )
}