# werp
[werp backend github](https://github.com/JeongHui-seong/werp_backend)
## React + Vite + Tailwind + Typescript + Electron ERP 개인 프로젝트
## Electron 선택 이유
- React로 Desktop App을 만들 수 있는 경험
- OS 수준의 기능 활용 가능
- ERP 프로그램은 Web보다 Desktop App 형태가 자연스럽다고 느낌
## Zustand 활용
- 로그인 상태 관리 (토큰값 유무에 따른 라우터 접근 정의)
## framer-motion 활용
- 쉽고 자연스러운 애니메이션 구현을 위한 framer-motion 활용
## react-toastify 활용
- 액션 완료 혹은 실패를 토스트 알림으로 쉽게 확인할 수 있게 구현하기 위한 react-toastify 활용
## tanstack query 활용
- 캐싱을 이용하여 불필요한 네트워크 요청을 줄이기 위한 tanstack query 활용
## tanstack table 활용
- 자유로운 커스텀 디자인과 편한 데이터 정렬, 필터링 등 가벼운 테이블 사용을 위해 tanstack table 활용

### 로그인 기능
- 사용자가 입력한 이메일을 기반으로 인증 절차 진행, 백엔드에서는 SendGrid를 이용해 해당 이메일로 일회용 인증 코드를 발급하며, 사용자는 전달받은 코드를 입력해 본인 여부 검증

### 출퇴근 기능 및 년월별 근태 확인
- 출근/퇴근 버튼을 누르면 자동으로 등록 시간이 등록되고, 출근이 등록되면 자동으로 퇴근 버튼으로 바뀌고, 퇴근이 등록되면 자동으로 출/퇴근 버튼은 비활성화. 총 근무시간, 평균 근무시간, 초과 근무시간, 지각 시간 등 해당 년월의 요약을 볼 수 있으며 tanstack table로 상세한 근태 확인 가능. header 클릭 시 해당 열을 기준으로 오름/내림차순 정렬. tanstack query를 이용하여 출근 혹은 퇴근이 등록되면 캐시를 무효화해 자동으로 업데이트되게 구현. 상세한 근태 정보는 CSV 파일로 다운받을 수 있게 구현.