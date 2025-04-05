import React from "react";
import {  Toolbar, Typography } from "@mui/material";
import { StyledAppBar, StyledHeaderToolbar } from "./style/HeaderStyle";
import { HeaderProps } from "../../../utils/types/componentsTypes";

export default function Header({ text }: HeaderProps) {
  return (
    <StyledAppBar>
      <StyledHeaderToolbar
      >
        <Typography variant="mavenMediumText">{text}</Typography>
      </StyledHeaderToolbar>
    </StyledAppBar>
  );
}
