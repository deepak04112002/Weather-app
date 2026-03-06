import { createContext, useState, useMemo, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext();

export const useThemeMode = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState('dark');

  const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                primary: { main: '#0284c7' },
                secondary: { main: '#0ea5e9' },
                background: { default: '#f0f9ff', paper: '#ffffff' },
                text: { primary: '#0c4a6e', secondary: '#64748b' },
              }
            : {
                primary: { main: '#ffffff' },
                secondary: { main: '#60a5fa' },
                background: { default: '#000000', paper: '#0a0a0a' },
                text: { primary: '#ffffff', secondary: '#a1a1aa' },
              }),
        },
        typography: {
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", "Roboto", sans-serif',
        },
        shape: { borderRadius: 16 },
        shadows: [
          'none',
          '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          '0 2px 8px 0 rgba(0, 0, 0, 0.12)',
          '0 4px 12px 0 rgba(0, 0, 0, 0.15)',
          '0 8px 24px 0 rgba(0, 0, 0, 0.18)',
          '0 12px 32px 0 rgba(0, 0, 0, 0.2)',
          ...Array(19).fill('none'),
        ],
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
