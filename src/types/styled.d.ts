import 'styled-components';
import { lightTheme } from '@/styles/theme';
import type { ThemeMode } from '@/styles/theme';

type BaseTheme = Omit<typeof lightTheme, 'mode'> & { mode: ThemeMode };

declare module 'styled-components' {
  export interface DefaultTheme extends BaseTheme {}
}
