import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { payStubReducer } from './payStubReducer'

const appReducer = combineReducers({
  user: userReducer,
  payStub: payStubReducer,
})

// rootReducer에서 INIT 액션 타입 처리
export const rootReducer = (state, action) => {
  if (action.type === 'INIT') {
    // INIT 액션 시, 전체 상태를 null 또는 초기값으로 리셋
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}
