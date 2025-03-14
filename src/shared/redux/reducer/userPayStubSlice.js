import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  date: null,
  filteredData: null,
  isNoData: false,
  isShow: false,
}

const userPayStubSlice = createSlice({
  name: 'userPayStub',
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload
    },
    setFilteredData: (state, action) => {
      state.filteredData = action.payload
    },
    setIsNoData: (state, action) => {
      state.isNoData = action.payload
    },
    toggleIsShow: (state, action) => {
      state.isShow = !state.isShow
    },
  },
})

export const { setDate, setFilteredData, setIsNoData, toggleIsShow } = userPayStubSlice.actions
export default userPayStubSlice.reducer
