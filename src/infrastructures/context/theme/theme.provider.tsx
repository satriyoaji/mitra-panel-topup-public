"use client";

import React, { useEffect, useState } from "react";
import ThemeContext, { ThemeDispatch } from "./theme.context";
import { roboto, fonts } from "./fonts";
import { primaryColors, secondaryColors } from "./colors";
import { ITheme } from "@/types/utils";
import { SetCookie } from "@/infrastructures/cookieStore";

const getInitialState = (): ITheme => {
  return global?.window?.localStorage?.getItem("theme")
    ? JSON.parse(localStorage.getItem("theme") as string)
    : {
        logo: "/assets/illustration/logo/1.png",
        primary: {
          title: "red",
          class: "theme-primary-red",
        },
        secondary: {
          title: "teal",
          class: "theme-secondary-teal",
        },
        font: {
          title: "Roboto",
          class: roboto,
        },
      };
};

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ITheme>(getInitialState);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
    setThemeCookie(theme.version);
  }, [theme]);

  const setThemeCookie = (version: string) => {
    SetCookie("version", version);
  };

  //get template

  const dispatch = (data: ThemeDispatch) => {
    switch (data.action) {
      case "SET_FONT":
        setTheme((prev) => ({ ...prev, font: data.payload }));
        return;
      case "SET_VERSION":
        setTheme((prev) => ({ ...prev, ve: data.payload }));
        return;
      case "SET_PRIMARY_COLOR":
        setTheme((prev) => ({ ...prev, primary: data.payload }));
        return;
      case "SET_SECONDARY_COLOR":
        setTheme((prev) => ({ ...prev, secondary: data.payload }));
        return;
      case "RAND_THEME":
        setTheme({
          logo: `/assets/illustration/logo/${getRandomInt(4)}.png`,
          font: fonts[getRandomInt(fonts.length)],
          primary: primaryColors[getRandomInt(primaryColors.length)],
          secondary: secondaryColors[getRandomInt(secondaryColors.length)],
          version: `${getRandomInt(2)}`,
        });
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
