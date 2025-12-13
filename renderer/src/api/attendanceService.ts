import { useAuthStore } from "../hooks/useAuthStore"

const url: string = import.meta.env.VITE_BASE_URL

export const clockIn = async() => {
    const token = useAuthStore.getState().token;
    if (!token) {
        return {
            "success": false,
            "message": "로그인 상태에 문제가 생겼습니다. 다시 로그인 부탁드립니다."
        }
    }
    try{
        const res = await fetch(`${url}/attendance/clockin`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        if (!res.ok) {
            return {
                "success": false,
                "message": "출근 등록에 실패하였습니다. 잠시 후 다시 시도해주세요."
            }
        }
        const data = await res.json()
        return data;
    } catch (err) {
        console.log("clockIn API 오류 : ", err)
    }
}