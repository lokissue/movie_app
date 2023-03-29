import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  page: 1,
  total: 0,
  data: [],
};

export const counterSlice = createSlice({
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
  },
});

// Action creators are generated for each case reducer function
export const {pageIncrement, setPage, setMovies} = counterSlice.actions;

export default counterSlice.reducer;
