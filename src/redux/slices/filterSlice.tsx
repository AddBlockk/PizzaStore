import { createSlice } from "@reduxjs/toolkit";
export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;

// export interface CategoryId {
//     categoryId: number;
// }

// const initialState: CategoryId = {
//     categoryId: 0,
//     sort:
// }
