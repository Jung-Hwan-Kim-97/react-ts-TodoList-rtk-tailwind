import React, { useState } from 'react';
// import { TodoBodyProps } from './TodoBody';
import { deleteTodo, getTodo, editTodo, GetPayload } from '../store/api/todoApi';
import { useAppDispatch } from '../store/hooks';
//react-icons
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { BsCheck2 } from 'react-icons/bs';
import { MdOutlineCancel } from 'react-icons/md';
//dayjs
import dayjs from 'dayjs';

export interface TodoBodyProps {
  item: GetPayload;
}

const TodoItem = ({ item }: TodoBodyProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editTodoContent, setEditTodoContent] = useState('');
  const dispatch = useAppDispatch();

  const todoModeHandler = () => {
    setIsEditMode(!isEditMode);
  };

  const saveEditedTodoHandler = () => {
    if (editTodoContent.trim().length < 2) {
      alert('2글자 이상 입력 해 주세영!');
      return;
    }
    dispatch(
      editTodo({
        id: item.id,
        title: editTodoContent,
        done: item.done,
        order: item.order,
      }),
    );
    setIsEditMode(!isEditMode);
  };

  const enterKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (editTodoContent.trim().length < 2) {
        alert('2글자 이상 입력 해 주세영!');
        return;
      }
      dispatch(
        editTodo({
          id: item.id,
          title: editTodoContent,
          done: item.done,
          order: item.order,
        }),
      );
      setIsEditMode(!isEditMode);
    }
  };

  const createTodoTime = dayjs(item.createdAt).format('YY년 MM월 DD일 HH시 mm분');
  const updateTodoTime = dayjs(item.updatedAt).format('YY년 MM월 DD일 HH시 mm분');

  return (
    <>
      {isEditMode ? (
        <li className="container my-3 flex justify-between border-[1px] border-gray-900 p-2">
          <section className="flex flex-col  justify-around">
            <input
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEditTodoContent(e.currentTarget.value);
              }}
              onKeyDown={enterKeyHandler}
              className=" box-border border-[2px]  border-[#C5C5E6]"
            />
            <p>생성일:{createTodoTime}</p>
            <p>수정일:{updateTodoTime}</p>
          </section>
          <section>
            <button onClick={saveEditedTodoHandler} className=" hover:text-[green]">
              <BsCheck2 size="25" />
            </button>
            <button className="hover:text-[red]">
              <MdOutlineCancel size="25" onClick={todoModeHandler} />
            </button>
          </section>
        </li>
      ) : (
        <li className="container my-3 flex justify-between border-[1px] border-gray-900 p-2">
          <section className=" flex flex-col  justify-around">
            <p>TODO: {item.title}</p>
            <p>생성일:{createTodoTime}</p>
            <p>수정일:{updateTodoTime}</p>
          </section>
          <section>
            <button className=" hover:text-[orange]">
              <AiOutlineEdit size="25" onClick={todoModeHandler} />
            </button>
            <button className="hover:text-[red]">
              <AiOutlineDelete
                size="25"
                onClick={async () => {
                  await dispatch(deleteTodo({ id: item.id }));
                  dispatch(getTodo());
                }}
              />
            </button>
          </section>
        </li>
      )}
    </>
  );
};

export default TodoItem;
