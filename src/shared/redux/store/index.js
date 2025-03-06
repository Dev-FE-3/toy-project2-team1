import { createStore } from 'redux'
import { rootReducer } from '../reducer'

// 세션 스토리지에서 상태 불러오기
const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem('reduxState')
    return serializedState ? JSON.parse(serializedState) : undefined
  } catch (err) {
    console.error('세션 스토리지에서 상태를 불러오는 중 오류 발생', err)
    return undefined
  }
}

// 초기 상태를 불러옴
const preloadedState = loadState()

export const store = createStore(
  rootReducer,
  preloadedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

store.subscribe(() => {
  try {
    const state = store.getState()
    const serializedState = JSON.stringify(state)
    sessionStorage.setItem('reduxState', serializedState)
  } catch (err) {
    console.error('세션 스토리지에 상태를 저장하는 중 오류 발생', err)
  }
})
