import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../reducer/userSlice'
import workScheduleReducer from '../reducer/workScheduleSlice'

// 세션 스토리지에서 상태 불러오기
const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem('userState')

    // 저장된 데이터가 없는 경우
    if (!serializedState) {
      return undefined
    }

    // JSON 파싱 및 기본 구조 확인
    const parsedState = JSON.parse(serializedState)
    // console.log(' loadState ~ parsedState: ', parsedState)
    if (!parsedState || typeof parsedState !== 'object') {
      throw new Error('Invalid state structure')
    }

    return { user: parsedState }
  } catch (err) {
    console.error('세션 스토리지에서 상태를 불러오는 중 오류 발생', err)
    return undefined
  }
}

// 초기 상태를 불러옴
const preloadedState = loadState()

export const store = configureStore({
  reducer: {
    user: userReducer,
    workSchedule: workScheduleReducer,
  },
  preloadedState,
})

// 스토어 변경 시 세션 스토리지에 저장
store.subscribe(() => {
  try {
    const userState = store.getState().user
    const serializedState = JSON.stringify(userState)
    sessionStorage.setItem('userState', serializedState)
  } catch (err) {
    console.error('세션 스토리지에 상태를 저장하는 중 오류 발생', err)
  }
})
