import React, { useEffect } from 'react';
import Test from './components/Test';
import { getTodo } from './store/api/todoApi';
import { useAppDispatch, useTodoSlice } from './store/hooks';
import TodoHeader from './components/TodoHeader';
import TodoBody from './components/TodoBody';
const App = () => {
  const dispatch = useAppDispatch();
  const { loading, todoList } = useTodoSlice();

  useEffect(() => {
    dispatch(getTodo());
  }, []);

  return (
    <div className="flex h-[100vh] flex-col items-center justify-center bg-black">
      <TodoHeader />
      <TodoBody />
    </div>
  );
};

export default App;
