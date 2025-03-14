import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
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

// redux toolkit
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => (state = { ...action.payload.data }),
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
