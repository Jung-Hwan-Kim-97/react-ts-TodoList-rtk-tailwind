import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
//todoApi api logic
import { getTodo, createTodo, deleteTodo, editTodo } from '../api/todoApi';
//todoApi interface
import { GetPayload } from '../api/todoApi';
interface TodoType {
  loading: 'nomal' | 'pending' | 'success' | 'failed';
  todoList: GetPayload[];
}

const initialState: TodoType = {
  loading: 'nomal',
  todoList: [],
};

const todoSlice = createSlice({
  name: 'todoSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //getTodo
    builder.addCase(getTodo.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getTodo.fulfilled, (state, action: PayloadAction<GetPayload[]>) => {
      state.loading = 'success';
      state.todoList = action.payload;
    });
    builder.addCase(getTodo.rejected, (state) => {
      state.loading = 'failed';
    });

    //createTodo
    builder.addCase(createTodo.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(createTodo.fulfilled, (state, action: PayloadAction<GetPayload>) => {
      state.loading = 'success';
      state.todoList = state.todoList.concat(action.payload);
    });
    builder.addCase(createTodo.rejected, (state) => {
      state.loading = 'failed';
    });

    //editTodo
    builder.addCase(editTodo.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(editTodo.fulfilled, (state, action: PayloadAction<GetPayload>) => {
      state.loading = 'success';
      state.todoList = state.todoList.map((item: GetPayload) => {
        return item.id === action.payload.id ? (item = action.payload) : item;
      });
    });
    builder.addCase(editTodo.rejected, (state) => {
      state.loading = 'failed';
    });

    //deleteTodo
    builder.addCase(deleteTodo.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(deleteTodo.fulfilled, (state) => {
      state.loading = 'success';
      // action: PayloadAction<boolean>
      // state.todoList = state.todoList.filter((item: GetPayload) => {
      //   return item.done !== action.payload.done;
      // });

      // deleteTodo가 동작하면 서버에서 반환값이 true만 오고 알아서 해당 todo가 삭제되는 형태이기 때문에 filter함수를 이용한
      // 삭제기능 구현 불가 때문에 TodoItem.tsx 에서 dispatch시 get 함수를 호출하게 만듬
      // 원래는 filter함수를 이용한 삭제기능을 하는게 더 좋음
    });
    builder.addCase(deleteTodo.rejected, (state) => {
      state.loading = 'failed';
    });
  },
});

export default todoSlice.reducer;
