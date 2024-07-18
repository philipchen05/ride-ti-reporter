import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

interface AuthState {
  isAuthenticated: boolean;
  user: string;
  pswrd: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: '',
  pswrd: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
    setPswrd: (state, action: PayloadAction<string>) => {
      state.pswrd = action.payload;
    },
    resetAuth: (state) => {
      state.isAuthenticated = false;
      state.user = '';
      state.pswrd = '';
    },
  },
});

export const { setAuthenticated, setUser, setPswrd, resetAuth } = authSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
