import { INITIALIZE, SET_USER } from '../constants/user'

const initialState = {
  uid: null,
  name: null,
  role: null,
  email: null,
  hireDate: null,
  jobTitle: null,
  phoneNumber: null,
  totalLeaves: null,
  usedLeaves: null,
  department: null,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.data,
      }

    case INITIALIZE:
      return initialState
  }

  return { ...state }
}
