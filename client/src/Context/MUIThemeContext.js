import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const CustomThemeContext = React.createContext();

export const CustomThemeProvider = props => {
const [mode, setMode] = React.useState('light');  

function toggleTheme() {
    mode === 'dark' ? setMode('light') : setMode('dark');
  }

const theme = React.useMemo(
    () => {
        return createTheme({
            palette: {
              mode: mode,
            }
          });
    },
    [mode],
  );

  return (
    <CustomThemeContext.Provider value={toggleTheme}>
      <ThemeProvider theme={theme}>
        {props.children}
      </ThemeProvider>
    </CustomThemeContext.Provider>
  );
}

export function useToggleTheme() {
  const context = React.useContext(CustomThemeContext);
  if (context === undefined) {
    throw new Error("useCustomThemeContext must be used within an CustomThemeProvider");
  }
  return context;
}