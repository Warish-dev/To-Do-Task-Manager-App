import React, { createContext, useContext, useEffect, useState } from "react";

export type ColorTheme = "green" | "blue" | "orange" | "yellow";
export type DarkMode = "dark" | "light";

export type ThemeContextType = {
  colorTheme: ColorTheme;
  darkMode: DarkMode;
  setColorTheme: (theme: ColorTheme) => void;
  setDarkMode: (mode: DarkMode) => void;
};

const defaultThemeContext: ThemeContextType = {
  colorTheme: "green",
  darkMode: "light",
  setColorTheme: () => {},
  setDarkMode: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colorTheme, setColorTheme] = useState<ColorTheme>("green");
  const [darkMode, setDarkMode] = useState<DarkMode>("light");

  useEffect(() => {
    // Load theme preferences from localStorage
    const savedColorTheme = localStorage.getItem("colorTheme") as ColorTheme;
    const savedDarkMode = localStorage.getItem("darkMode") as DarkMode;

    if (savedColorTheme) {
      setColorTheme(savedColorTheme);
    }

    if (savedDarkMode) {
      setDarkMode(savedDarkMode);
      document.documentElement.classList.toggle("dark", savedDarkMode === "dark");
    } else {
      // Check system preference
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(isDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", isDark);
    }
  }, []);

  useEffect(() => {
    // Apply theme class to body based on selected color theme
    document.body.classList.remove("theme-green", "theme-blue", "theme-orange", "theme-yellow");
    document.body.classList.add(`theme-${colorTheme}`);
    localStorage.setItem("colorTheme", colorTheme);
  }, [colorTheme]);

  useEffect(() => {
    // Toggle dark mode class
    document.documentElement.classList.toggle("dark", darkMode === "dark");
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ colorTheme, darkMode, setColorTheme, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};