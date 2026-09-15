import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const ThemeMode = createContext();
function DarkModeProvider({ children }) {
  const [isDarkMode, setisDarkMode] = useLocalStorageState(false, "isDarkMode");
  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.remove("dark-mode");
        document.documentElement.classList.add("light-mode");
      }
    },
    [isDarkMode],
  );
  function ToggleMode() {
    setisDarkMode((mode) => !mode);
  }
  return (
    <ThemeMode.Provider value={{ isDarkMode, ToggleMode }}>
      {children}
    </ThemeMode.Provider>
  );
}

function useDarkMode() {
  const context = useContext(ThemeMode);
  if (!context) throw new Error("Darkmode was using outside provider");
  return context;
}

export { DarkModeProvider, useDarkMode };
