import { Routes, Route, Navigate } from "react-router-dom"
import { PublicRoute, PrivateRoute } from "./utils/routerState"
import LoginPage from "./pages/login"
import DashboardPage from "./pages/dashboard"
import { ToastContainer } from "react-toastify"
import { PrivateLayout } from "./components/common/privateLayout"
import 'react-toastify/ReactToastify.css'
import AttendancePage from "./pages/attendance"
import { AdminLeaveSettingsPage } from "./pages/adminSettings"

function App() {
  return(
    <>
      <Routes>
        // outlet 컴포넌트 사용으로 토큰이 없을 때 접근 가능한 자식 라우트 렌더링
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        // outlet 컴포넌트 사용으로 토큰이 있을 때 접근 가능한 자식 라우트 렌더링
        <Route element={<PrivateRoute />}>
          // 기본 layout 설정
          <Route element={<PrivateLayout />}>
            // 기본 라우트를 /dashboard로 설정
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/attendance/attendance" element={<AttendancePage />} />
            <Route path="/admin/leaveSettings" element={<AdminLeaveSettingsPage />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer 
        autoClose={3000}
        newestOnTop
        closeOnClick
        theme="colored"
      />
    </>
  )
}

export default App
