import type { upsertLeavesTypePayload } from "../types/leaves/leavesType"; 

const url: string = import.meta.env.VITE_BASE_URL

export const fetchLeavesType = async () => {
    try{
        const res = await fetch(`${url}/leaves/types`, {
            method: "GET",
            headers: {
                'Content-Type' : 'application/json'
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
    try{
        const res = await fetch(`${url}/leaves/types`, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
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
    try{
        const res = await fetch(`${url}/leaves/types`, {
            method: "DELETE",
            headers: {
                'Content-Type' : 'application/json'
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