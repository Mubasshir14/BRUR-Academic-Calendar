import React, { createContext, useContext, useState } from "react";
import { useColorScheme } from "react-native";
import { lightColors, darkColors } from "./colors";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const system = useColorScheme();
  const [mode, setMode] = useState("system"); // light | dark | system

  const theme =
    mode === "system"
      ? system === "dark"
        ? darkColors
        : lightColors
      : mode === "dark"
      ? darkColors
      : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
