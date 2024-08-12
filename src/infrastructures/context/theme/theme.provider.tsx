"use client";

import React, { useEffect, useState } from "react";
import ThemeContext, { ThemeDispatch } from "./theme.context";
import { ITheme } from "@/types/utils";

const getInitialState = (): ITheme => {
  return global?.window?.localStorage?.getItem("theme")
    ? JSON.parse(localStorage.getItem("theme") as string)
    : {
        primary: "#ef4444",
      };
};

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ITheme>(getInitialState);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  //get template

  const dispatch = (data: ThemeDispatch) => {
    switch (data.action) {
      case "SET_PRIMARY_COLOR":
        setTheme((prev) => ({ ...prev, primary: data.payload }));
        return;
      default:
        return;
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        data: theme,
        dispatch,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
