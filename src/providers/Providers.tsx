'use client';

import { Provider, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store, RootState } from '@/store';
import { lightTheme, darkTheme } from '@/styles/theme';
import { GlobalStyles } from '@/styles/GlobalStyles';
import { setTheme } from '@/store/themeSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function ThemeSync({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const theme = themeMode === 'dark' ? darkTheme : lightTheme;

  useEffect(() => {
    const stored = localStorage.getItem('portfolio-theme');
    if (stored === 'light' || stored === 'dark') {
      dispatch(setTheme(stored));
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      dispatch(setTheme('dark'));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('portfolio-theme', themeMode);
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeSync>{children}</ThemeSync>
    </Provider>
  );
}
