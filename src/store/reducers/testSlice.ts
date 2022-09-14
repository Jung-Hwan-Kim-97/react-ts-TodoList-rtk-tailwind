import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StateType {
  count: number;
  testArr: Array<ItestArr>;
}

export interface ItestArr {
  id: number;
  name: string;
  password: string;
}

const initialState: StateType = {
  count: 1,
  testArr: [],
};

const testSlice = createSlice({
  name: 'testSlice',
  initialState,
  reducers: {
    up: (state) => {
      state.count += 1;
    },
    down: (state) => {
      state.count -= 1;
    },
    getUser: (state, action: PayloadAction<ItestArr>) => {
      state.testArr = state.testArr.concat(action.payload);
    },
  },
});

export const { up, down, getUser } = testSlice.actions;

export default testSlice.reducer;
