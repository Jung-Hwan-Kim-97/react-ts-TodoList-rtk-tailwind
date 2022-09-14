import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useTestSlice = () => {
  const { count, testArr } = useAppSelector((state) => state.test);

  return { count, testArr };
};

export const useTodoSlice = () => {
  const { loading, todoList } = useAppSelector((state) => state.todo);

  return { loading, todoList };
};
