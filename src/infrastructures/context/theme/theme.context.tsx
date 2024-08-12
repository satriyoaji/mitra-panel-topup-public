"use client";
import { ITheme } from "@/types/utils";
import React from "react";

export type ThemeSetPrimary = {
  action: "SET_PRIMARY_COLOR";
  payload: string;
};

export type ThemeDispatch = ThemeSetPrimary;

export interface IThemeContext {
  data: ITheme;
  dispatch: (data: ThemeDispatch) => void;
}

const ThemeContext = React.createContext<IThemeContext | null>(null);

export default ThemeContext;
