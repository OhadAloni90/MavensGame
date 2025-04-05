import { ButtonProps } from "@mui/material";

export type GameButtonProps = {
    text: string;
    icon?: React.ReactNode;         // the icon component, e.g, <PlayArrowIcon />
    iconPosition?: 'start' | 'end'; // whether to place icon at start or end
    width?: number;
    onClick: () => void;
  } & Omit<ButtonProps, 'startIcon' | 'endIcon'>; 
  // We omit the built-in startIcon/endIcon so we can control them ourselves.
  
export type HeaderProps = {
  text: string;
};