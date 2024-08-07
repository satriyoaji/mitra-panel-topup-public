"use client";
import {
  ITheme,
  TFont,
  TPrimaryPallete,
  TSecondaryPallete,
} from "@/types/utils";
import React from "react";

export type ThemeSetPrimary = {
  action: "SET_PRIMARY_COLOR";
  payload: TPrimaryPallete;
};
export type ThemeSetSecondary = {
  action: "SET_SECONDARY_COLOR";
  payload: TSecondaryPallete;
};
export type ThemeSetFont = {
  action: "SET_FONT";
  payload: TFont;
};
export type ThemeSetVersion = {
  action: "SET_VERSION";
  payload: string;
};
export type RandTheme = {
  action: "RAND_THEME";
};

export type ThemeDispatch =
  | ThemeSetPrimary
  | ThemeSetSecondary
  | ThemeSetFont
  | ThemeSetVersion
  | RandTheme;

export interface IThemeContext {
  data: ITheme;
  dispatch: (data: ThemeDispatch) => void;
}

const ThemeContext = React.createContext<IThemeContext | null>(null);

export default ThemeContext;
