import { AppBar, styled } from "@mui/material";
import { headerShadow } from "../../../../themes/utils/shadows";

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    boxShadow: headerShadow[1],
    position: "fixed", // or "sticky"
    top: 0,
    left: 0,
    right: 0,
    height: 40,
  }));
  