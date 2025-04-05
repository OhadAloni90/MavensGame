import React from "react";
import {  Toolbar, Typography } from "@mui/material";
import { StyledAppBar } from "./style/HeaderStyle";
import { HeaderProps } from "../../../utils/types/componentsTypes";

export default function Header({ text }: HeaderProps) {
  return (
    <StyledAppBar>
      <Toolbar
        sx={{
          minHeight: "40px !important",
          display: "flex",
          alignItems: "center",
          px: 2,
        }}
      >
        <Typography variant="mavenMediumText">{text}</Typography>
      </Toolbar>
    </StyledAppBar>
  );
}
