import { configureStore } from '@reduxjs/toolkit';
import customizerReducer from './customizer';
import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    customizer: customizerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks cho Redux với type an toàn
export const useDispatch: () => AppDispatch = useReduxDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export type AppState = RootState;