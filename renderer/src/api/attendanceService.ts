import { useAuthStore } from "../hooks/useAuthStore"

const url: string = import.meta.env.VITE_BASE_URL

export const clockIn = async( date:string ) => {
    const token = useAuthStore.getState().token;
    if (!token) {
        throw new Error("로그인 상태에 문제가 생겼습니다. 다시 로그인 부탁드립니다.")
    }
    try{
        const res = await fetch(`${url}/attendance/clockin`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ date, clockin: new Date().toISOString() })
        });
        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.message)
        }
        const data = await res.json()
        return data;
    } catch (err) {
        console.log("clockIn API 오류 : ", err)
    }
}

export const fetchTodayAttendance = async(date: string) => {
    const token = useAuthStore.getState().token;
    if (!token) {
        throw new Error("로그인 상태에 문제가 생겼습니다. 다시 로그인 부탁드립니다.")
    }
    try{
        const res = await fetch(`${url}/attendance/today?date=${date}`,{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        if (!res.ok){
            const error = await res.json()
            throw new Error(error.message)
        }
        const data = await res.json()
        return data
    } catch (err) {
        console.log("fetchTodayAttendance API 오류 : ", err)
    }
}

export const clockOut = async(attendanceId:number) => {
    const token = useAuthStore.getState().token;
    if (!token) {
        throw new Error("로그인 상태에 문제가 생겼습니다. 다시 로그인 부탁드립니다.");
    }
    try{
        const res = await fetch(`${url}/attendance/clockout`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ attendanceId, clockout: new Date().toISOString() })
        });
        if (!res.ok){
            const error = await res.json();
            throw new Error(error.message);
        }
        const data = await res.json();
        return data
    } catch (err) {
        console.log("clockOut API 오류 : ", err);
    }
}