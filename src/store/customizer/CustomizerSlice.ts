import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import config from 'src/config/app.config';

interface CustomizerState {
  isLanguage: string;

}

const initialState: CustomizerState = {
  isLanguage: localStorage.getItem('language') || config.isLanguage,
};

const customizerSlice = createSlice({
  name: 'customizer',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.isLanguage = action.payload;
      localStorage.setItem('language', action.payload);
    }
  },
});

export const { setLanguage } = customizerSlice.actions;
export default customizerSlice.reducer;