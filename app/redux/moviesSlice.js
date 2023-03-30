import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  page: 1,
  total: 0,
  data: [],
  lastSearch: {},
  searchHistory: {},
};

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    pageIncrement: (state, action) => {
      state.page += action?.payload || 1;
    },
    setPage: (state, action) => {
      state.page = action?.payload;
    },
    setMovies: (state, action) => {
      state.data = action?.payload;
    },
    setTotal: (state, action) => {
      state.total = action?.payload;
    },
    setLastSearch: (state, action) => {
      state.lastSearch = action?.payload;
    },
    initialize: state => {
      state.page = 1;
      state.total = 0;
      state.data = [];
    },
    addHistory: (state, action) => {
      state.searchHistory = {...state.searchHistory, ...action.payload};
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  pageIncrement,
  setPage,
  setMovies,
  setTotal,
  initialize,
  setLastSearch,
  addHistory,
} = movieSlice.actions;

export default movieSlice.reducer;
