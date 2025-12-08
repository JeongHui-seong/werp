const url: string = import.meta.env.VITE_BASE_URL

export const emailValidation = async(email: string) => {
    try {
        const res = await fetch(`${url}/auth/find-email`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        const data = await res.json();
        return data;
    } catch (err) {
        console.log("emailValidation API 오류: ", err);
    }
}

export const resendVerification = async(email: string) => {
    try{
        const res = await fetch(`${url}/auth/resend-code`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        const data = await res.json()
        return data;
    } catch (err) {
        console.log("resendVerification API 오류: ", err);
    }
}

export const login = async (email: string) => {
    try{
        const res = await fetch(`${url}/auth/login`, {
            method : "POST",
            headers : {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
        const data = await res.json();
        return data;
    } catch (err) {
        console.log("login API 오류: ", err);
    }
}