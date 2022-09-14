import { combineReducers } from '@reduxjs/toolkit';
import test from './reducers/testSlice';
import todo from './reducers/todoSlice';
const rootReducer = combineReducers({
  test,
  todo,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
