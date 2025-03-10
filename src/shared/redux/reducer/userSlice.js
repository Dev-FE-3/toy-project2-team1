import { createSlice } from '@reduxjs/toolkit'

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

// basic
// export const userReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_USER:
//       return {
//         ...state,
//         ...action.data,
//       }

//     case INITIALIZE:
//       return initialState
//   }

//   return { ...state }
// }

// redux toolkit
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.uid = action.payload.data.uid
      state.name = action.payload.data.name
      state.role = action.payload.data.role
      state.email = action.payload.data.email
      state.hireDate = action.payload.data.hireDate
      state.user = action.payload.data
    },
    initialize: (state) => {
      // console.log('useSlice state: ', state)
      return initialState
    },
  },
})

export const { setUser, initialize } = userSlice.actions
export default userSlice.reducer
