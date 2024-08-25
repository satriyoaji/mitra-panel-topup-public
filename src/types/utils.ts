import { NextFont } from "next/dist/compiled/@next/font";

export type TPrimaryPallete = {
  title: string;
  class: string;
};

export interface TSecondaryPallete extends TPrimaryPallete {}

export type TFont = {
  title: string;
  class: NextFont;
};

export type TPaginationMeta = {
  limit: number;
  page: number;
  total: number;
};

export interface ITheme {
  version: string;
  primary: string;
}

export interface IBanner {
  id: number;
  name: string;
  image_url: string;
  is_clickable: boolean;
  is_hyperlink: boolean;
  hyperlink_url: string;
}

export interface ISosmed {
  key: string;
  name: string;
  value: string;
}

export interface ISiteProfile {
  name: string;
  logo_url: string;
  title: string;
  keywords: string;
  description: string;
  terms_condition: string;
  privacy_policy: string;
  theme_color: string;
}
