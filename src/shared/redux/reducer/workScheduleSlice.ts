import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// 수정 페이로드 타입 정의
interface EditEventPayload {
  editEventId: string
  editEventData: CalendarEvent
}

// 삭제 페이로드 타입 정의
interface DeleteEventPayload {
  docId: string
}

// 이벤트 ID 설정 페이로드 타입 정의
interface SetEditEventIdPayload {
  id: string
}

// 이벤트 타입 정의
interface CalendarEvent {
  id: string
  docId: string
  title: string
  start: string | Date
  end: string | Date
  eventCategory: 'work' | 'personal' | 'closed'
  description?: string
  // 필요한 다른 속성들도 추가할 수 있습니다
}

// 상태 타입 정의
interface WorkScheduleState {
  calendarEvents: CalendarEvent[] // 일정 목록
  isSidebarOpen: boolean // 사이드바 열림 여부
  modalAddMode: boolean // 모달(추가 모드) 활성화 여부
  modalEditMode: boolean // 모달(수정 모드) 활성화 여부
  selectedDate: string | Date | null // 선택된 날짜
  editEventId: string | null // 수정할 이벤트 ID
}

// 초기 상태 정의
const initialState: WorkScheduleState = {
  calendarEvents: [], // 일정 목록
  isSidebarOpen: false, // 사이드바 열림 여부
  modalAddMode: false, // 모달(추가 모드) 활성화 여부
  modalEditMode: false, // 모달(수정 모드) 활성화 여부
  selectedDate: null, // 선택된 날짜
  editEventId: null, // 수정할 이벤트 ID
}

const workScheduleSlice = createSlice({
  name: 'workSchedule',
  initialState,
  reducers: {
    // 일정 목록 설정
    setCalendarEvents: (state, action: PayloadAction<CalendarEvent[]>) => {
      state.calendarEvents = action.payload
    },
    // 일정 추가
    addCalendarEvents: (state, action: PayloadAction<CalendarEvent>) => {
      state.calendarEvents.push(action.payload)
    },
    // 일정 수정
    editCalendarEvents: (state, action: PayloadAction<EditEventPayload>) => {
      state.calendarEvents = state.calendarEvents.map((event) =>
        event.id === action.payload.editEventId ? action.payload.editEventData : event,
      )
    },
    // 일정 삭제
    deleteCalendarEvents: (state, action: PayloadAction<DeleteEventPayload>) => {
      state.calendarEvents = state.calendarEvents.filter(
        (event) => event.docId !== action.payload.docId,
      )
    },
    // 선택된 날짜 설정
    setSelectedDate: (state, action: PayloadAction<string | Date | null>) => {
      state.selectedDate = action.payload
    },
    // 선택된 날짜 초기화
    initSelectedDate: (state) => {
      state.selectedDate = null
    },
    // 사이드바 열림 여부 설정
    setIsSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload
    },
    // 모달(추가 모드) 활성화 여부 설정
    setModalAddMode: (state, action: PayloadAction<boolean>) => {
      state.modalAddMode = action.payload
    },
    // 모달(수정 모드) 활성화 여부 설정
    setModalEditMode: (state, action: PayloadAction<boolean>) => {
      state.modalEditMode = action.payload
    },
    // 일정 수정에 필요한 이벤트 ID 설정
    setEditEventId: (state, action: PayloadAction<SetEditEventIdPayload>) => {
      state.editEventId = action.payload.id
    },
  },
})

export const {
  setCalendarEvents,
  addCalendarEvents,
  editCalendarEvents,
  deleteCalendarEvents,
  setSelectedDate,
  initSelectedDate,
  setIsSidebarOpen,
  setModalAddMode,
  setModalEditMode,
  setEditEventId,
} = workScheduleSlice.actions
export default workScheduleSlice.reducer
