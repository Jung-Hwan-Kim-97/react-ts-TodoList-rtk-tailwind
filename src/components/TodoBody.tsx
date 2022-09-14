import React, { useState } from 'react';
import TodoItem from './TodoItem';
import { useAppDispatch, useTodoSlice } from '../store/hooks';
import { createTodo, GetPayload } from '../store/api/todoApi';
//react-icons
import { MdAddCircleOutline } from 'react-icons/md';
//spinner-bg
import spinner from '../assets/spinner.gif';

export interface TodoBodyProps {
  item: GetPayload;
}
const TodoBody = () => {
  const dispatch = useAppDispatch();
  const { loading, todoList } = useTodoSlice();
  const [todoTitle, setTodoTitle] = useState<string>('');
  const todoOrder = new Date().getTime();

  const todoTitleHandler: React.ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.currentTarget.value);
  };

  const makeTodoItemHandler: React.FormEventHandler = (e: React.FormEvent<HTMLFormElement>) => {
    if (todoTitle.trim().length < 2) {
      alert('2글자 이상 입력 해 주세영!');
      return;
    }
    e.preventDefault();

    dispatch(
      createTodo({
        title: todoTitle,
        order: todoOrder,
      }),
    );
    setTodoTitle('');
  };

  return (
    <div className=" relative h-[550px] w-[40%] overflow-y-auto bg-white ">
      <form className="flex" onSubmit={makeTodoItemHandler}>
        <input
          type="text"
          className="box-border  h-6 grow  border-2 border-black focus:bg-slate-600"
          onChange={todoTitleHandler}
          value={todoTitle}
        />
        <button className="  hover:text-[orange]">
          <MdAddCircleOutline size="25" />
        </button>
      </form>

      <ul>
        {todoList?.length > 0 &&
          todoList.map((item: GetPayload) => {
            return <TodoItem key={item.id} item={item} />;
          })}
      </ul>

      {loading === 'pending' && (
        <img
          src={spinner}
          alt="loading-bg"
          className="absolute  left-[33%] top-[30%] h-52 w-52 bg-transparent bg-spinner"
        />
      )}
      {loading === 'failed' && <p>네크워크 통신에 문제가 있습니다!</p>}
    </div>
  );
};

export default TodoBody;
