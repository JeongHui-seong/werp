import { useEffect, useState } from "react";

export default function useEmailValidation(value: string){
    const [isValid, setIsValid] = useState(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const checkEmail = () => {
        setIsValid(emailRegex.test(value))
    }

    useEffect(() => {
        checkEmail()
    },[value])

    // 캐시를 활용한 성능 최적화, useEffect 의존성으로 객체 생성 시마다 리렌더링 문제 해결
    // 그치만 무거운 연산이 아니라고 생각하기 때문에 useEffect 사용
    // useMemo(() => checkEmail(), [value])
    
    return isValid;
}