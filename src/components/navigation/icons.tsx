import { Github, Laptop, Palette, Twitter } from "lucide-react";

export const Icons = {
  logo: Laptop,
  palette: Palette,
  gitHub: Github,
  twitter: Twitter,
};

export type IconName = keyof typeof Icons;
