import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const headers = {
  'content-type': 'application/json',
  apikey: import.meta.env.VITE_REACT_API_KEY,
  username: 'KimJungHwan',
};
//getTodo
export interface GetPayload extends PostPayload {
  id: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}
const getTodo = createAsyncThunk('todoSlice/getTodo', async () => {
  const { data } = await axios({
    method: 'GET',
    url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
    headers,
  });
  return data;
});
//createTodo
export interface PostPayload {
  title: string;
  order: number;
}

const createTodo = createAsyncThunk(
  'todoSlice/createTodo',
  async (payload: PostPayload) => {
    const { title, order } = payload;

    const { data } = await axios({
      method: 'POST',
      url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
      headers,
      data: {
        title,
        order,
      },
    });
    return data;
  },
);

//editTodo

export interface EditTodo {
  id: string;
  title: string;
  done: boolean;
  order: number;
}

const editTodo = createAsyncThunk('todoSlice/editTodo', async (payload: EditTodo) => {
  const { id, title, order, done } = payload;
  const { data } = await axios({
    url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`,
    method: 'PUT',
    headers,
    data: {
      title,
      order,
      done,
    },
  });
  return data;
});

//deleteTodo

export interface DeletePayload {
  id: string;
}

const deleteTodo = createAsyncThunk(
  'todoSlice/deleteTodo',
  async (payload: DeletePayload) => {
    const { id } = payload;
    const { data } = await axios({
      url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`,
      method: 'DELETE',
      headers,
    });
    return data;
  },
);

export { getTodo, createTodo, editTodo, deleteTodo };
