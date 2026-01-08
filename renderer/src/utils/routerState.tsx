import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../hooks/auth/useAuthStore";

// Outlet: 자식 라우트를 렌더링하는 컴포넌트
// 공개 라우트: 로그인 상태가 아닐 때 접근 가능한 라우트
export function PublicRoute(){
    const token = useAuthStore(state => state.token);
    return token ? <Navigate to="/dashboard" replace/> : <Outlet />;
}

// 비공개 라우트: 로그인 상태일 때 접근 가능한 라우트
export function PrivateRoute(){
    const token = useAuthStore(state => state.token);
    return token ? <Outlet /> : <Navigate to="/login" replace/>;
}