import { useAuthStore } from "../hooks/auth/useAuthStore"
import type { fetchUserTypeRequest } from "../types/user/fetchUserType";
import type { updateUserPayload } from "../types/user/updateUserType";

const url: string = import.meta.env.VITE_BASE_URL

export const fetchAllUsers = async ({page, limit, filter, sort, search}:fetchUserTypeRequest) => {
    const token = useAuthStore.getState().token;
    const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
    });

    if (filter) params.append('filter', JSON.stringify(filter));
    if (sort) params.append('sort', JSON.stringify(sort));
    if (search) params.append('search', JSON.stringify(search));

    try {
        const res = await fetch(`${url}/user/get-all?${params.toString()}`, {
            method: "GET",
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }

        const data = await res.json();
        return data;
    } catch (err) {
        console.log("fetchAllUsers API error: ", err);
    }

}

export const fetchRoleAndDept = async () => {
    const token = useAuthStore.getState().token;

    try {
        const res = await fetch(`${url}/user/get-roledept`, {
            method: "GET",
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }

        const data = await res.json();
        return data;

    } catch (err) {
        console.log("fetchRoleAndDept API error: ", err);
    }
}

export const updateUser = async (id: string, payload: updateUserPayload) => {
    const token = useAuthStore.getState().token;

    try{
        const res = await fetch(`${url}/user/update-user/${id}`,{
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        })

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }

        const data = await res.json();
        return data;
    } catch (err) {
        console.log("updateUser API error : ", err);
    }
}