import React from 'react';

export const DarkModeContext = React.createContext();

export const DarkModeProvider = props => {
    const [darkMode, setDarkMode] = React.useState(false);
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    return (
      <DarkModeContext.Provider value={{darkMode,toggleDarkMode}}>
          {props.children}
      </DarkModeContext.Provider>
      );
}