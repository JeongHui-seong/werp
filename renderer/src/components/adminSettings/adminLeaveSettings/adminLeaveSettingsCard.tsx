import { useLeavesType } from "../../../hooks/leaves/useLeavesType";
import { LeavesSettingsTable } from "../adminLeaveSettings/adminLeaveSettingsTable"

export function AdminLeaveSettingsCard(){
    //TODO
    //type의 이름이 같은지 확인하는 로직
    //upsert로 수정/삽입 기능
    //row selection https://tanstack.com/table/latest/docs/framework/react/examples/row-selection
    //https://zodev.tistory.com/entry/React-CommonTable-%ED%8E%B8%EC%A7%91%EB%AA%A8%EB%93%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%B3%80%EA%B2%BD-%ED%96%89-%EC%B6%94%EA%B0%80-%EC%82%AD%EC%A0%9C
    const { data: leavesType } = useLeavesType();
    console.log(leavesType?.leavesType.length)
    return(
        <div className="w-full h-full bg-white p-[20px] rounded-2xl overflow-hidden flex flex-col">
            <h2 className="font-bold text-center text-lg">휴가 설정</h2>
            <LeavesSettingsTable recordData={leavesType}/>
            {leavesType?.leavesType.length === 0 &&
                <p className="text-base text-center p-[20px]">등록된 데이터가 없습니다.</p>
            }
        </div>
    )
}