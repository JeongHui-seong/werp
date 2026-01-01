import { useAuthStore } from "../hooks/auth/useAuthStore";
import type { upsertLeavesTypePayload } from "../types/leaves/leavesType"; 

const url: string = import.meta.env.VITE_BASE_URL

export const fetchLeavesType = async () => {
    const token = useAuthStore.getState().token;
    try{
        const res = await fetch(`${url}/leaves/types`, {
            method: "GET",
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.message)
        }
        const data = await res.json();
        return data;
    } catch (err) {
        console.log("fetchLeaves api error : ", err);
    }
}

export const updateLeavesType = async (leaveTypes : upsertLeavesTypePayload) => {
    const token = useAuthStore.getState().token;
    try{
        const res = await fetch(`${url}/leaves/types`, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ leaveTypes })
        })
        if(!res.ok) {
            const error = await res.json();
            throw new Error(error.message)
        }
        const data = await res.json();
        return data;
    } catch (err) {
        console.log("updateLeavesType api error : ", err)
    }
}

export const deleteLeavesType = async (ids : number[]) => {
    const token = useAuthStore.getState().token;
    try{
        const res = await fetch(`${url}/leaves/types`, {
            method: "DELETE",
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ ids })
        })
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }
        const data = await res.json();
        return data;
    } catch (err) {
        console.log("deleteLeavesType api error : ", err)
    }
}

export const fetchLeavesPolicy = async (year: number) => {
    const token = useAuthStore.getState().token;
    try{
        const res = await fetch(`${url}/leaves/policy?year=${year}`, {
            method: "GET",
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }
        const data = await res.json();
        return data;
    } catch (err) {
        console.log("fetchLeavesPolicy api error : ", err)
    }
}

export const updateLeavesPolicy = async (year: number, days: number) => {
    const token = useAuthStore.getState().token;
    try{
        const res = await fetch(`${url}/leaves/policy`,{
            method: "PUT",
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ year, days })
        })
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }
        const data = await res.json();
        return data;
    } catch (err) {
        console.log("updateLeavesPolicy api error : ", err)
    }
}
        