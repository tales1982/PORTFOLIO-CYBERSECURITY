import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Locale } from '@/types';

interface LanguageState {
  locale: Locale;
}

const initialState: LanguageState = {
  locale: 'en',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<Locale>) => {
      state.locale = action.payload;
    },
  },
});

export const { setLocale } = languageSlice.actions;
export default languageSlice.reducer;
