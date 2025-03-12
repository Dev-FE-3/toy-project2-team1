import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  data: [],
  filteredData: [],
  isLoading: true,
  error: null,
  currentPage: 1,
  expandedId: null,
  filterValue: 0,
};

// redux toolkit
const myDocumentSlice = createSlice({
  name: 'myDocument',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
      state.filteredData = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFilterValue: (state, action) => {
      state.filterValue = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
      state.expandedId = null;
    },
    toggleRow: (state, action) => {
      state.expandedId = state.expandedId === action.payload ? null : action.payload;
    },
    filterData: (state) => {
      state.filteredData = state.data.filter(item => {
        if (state.filterValue === 0) return true;
        if (state.filterValue === 1) return item.approvalStatus === '결재대기';
        if (state.filterValue === 2) return item.approvalStatus === '승인';
        if (state.filterValue === 3) return item.approvalStatus === '반려';
        return true;
      });
      state.expandedId = null;
      state.currentPage = 1;
    },
  },
});

export const {
  setData,
  setLoading,
  setError,
  setFilterValue,
  setCurrentPage,
  toggleRow,
  filterData,
} = myDocumentSlice.actions;

export default myDocumentSlice.reducer;