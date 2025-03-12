import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  data: [],
  filteredData: [],
  isLoading: true,
  error: null,
  currentPage: 1,
  expandedId: null,
  filterValue: 0,
  filterValueChanged: false,
};

// redux toolkit
const approvalSlice = createSlice({
  name: 'approval',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
      state.filteredData = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setFilterValue: (state, action) => {
      state.filterValue = action.payload;
      state.filterValueChanged = true;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
      state.expandedId = null;
    },
    toggleRow: (state, action) => {
      state.expandedId = state.expandedId === action.payload ? null : action.payload;
    },
    updateItemStatus: (state, action) => {
      const { id, newStatus } = action.payload;
      state.data = state.data.map(item =>
        item.id === id ? { ...item, approvalStatus: newStatus } : item
      );
      state.filterValueChanged = false;
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
      if (state.filterValueChanged) {
        state.currentPage = 1;
        state.filterValueChanged = false;
      }
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
  updateItemStatus,
  filterData,
} = approvalSlice.actions;

export default approvalSlice.reducer;