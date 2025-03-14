import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  date: null,
}

const payStubSlice = createSlice({
  name: 'payStub',
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload.data.date
    },
  },
})

export const { setDate } = payStubSlice.actions
export default payStubSlice.reducer
