import React, { useEffect, useState } from 'react';
import { useAppDispatch, useTestSlice } from '../store/hooks';
import { up, down, getUser, ItestArr } from '../store/reducers/testSlice';
const Test = () => {
  const dispatch = useAppDispatch();
  const { count, testArr } = useTestSlice();

  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const nameHandler: React.ChangeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setName(e.currentTarget.value);
  };

  const passwordHandler: React.ChangeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPassword(e.currentTarget.value);
  };

  const formHandler: React.FormEventHandler | React.MouseEventHandler = (
    e: React.FormEvent<HTMLFormElement | HTMLInputElement>,
  ) => {
    e.preventDefault();
    dispatch(
      getUser({
        name,
        password,
        id: Math.random(),
      }),
    );
  };
  useEffect(() => {
    console.log(testArr);
  }, [testArr]);

  return (
    <>
      <div>{count}</div>
      <button
        onClick={() => {
          dispatch(up());
        }}
      >
        +
      </button>
      <div>{count}</div>
      <button
        onClick={() => {
          dispatch(down());
        }}
      >
        -
      </button>
      <form onSubmit={formHandler} className="  border-2 border-red-600">
        <label>
          이름:
          <input
            type="text"
            onChange={nameHandler}
            className="box-border border-2 border-black "
          />
        </label>
        <label>
          비밀번호:
          <input
            type="text"
            onChange={passwordHandler}
            className="box-border border-2 border-black "
          />
        </label>
        <button className="border-2 border-green-500" onClick={formHandler}>
          제출
        </button>
      </form>
      <ul>
        {testArr?.length > 0 &&
          testArr.map((item: ItestArr) => {
            return (
              <li key={item.id}>
                <p>{item.name}</p>
                <p>{item.password}</p>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Test;
