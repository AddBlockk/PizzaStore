import { createSlice } from "@reduxjs/toolkit";
import { CategoryId } from "../../types/interfaces";

const initialState: CategoryId = {
  categoryId: 0,
  sort: 0,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
  },
});

export const { setCategoryId, setSort } = filterSlice.actions;

export default filterSlice.reducer;
