import { SET_DATE } from '../constants/payStub'

const initialState = {
  date: null,
}

export const payStubReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATE:
      return {
        ...state,
        ...action.data,
      }
  }

  return { ...state }
}
