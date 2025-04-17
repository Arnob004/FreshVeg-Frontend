import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  // localStorage থেকে থিমের বর্তমান অবস্থা পড়া
  const storedTheme = localStorage.getItem("darkMode") === "true";

  const [darkMode, setDarkMode] = useState(storedTheme);

  const toggleTheme = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode); // নতুন থিম সংরক্ষণ
      return newMode;
    });
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
