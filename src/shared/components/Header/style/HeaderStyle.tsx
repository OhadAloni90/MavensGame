import { AppBar, styled, Toolbar } from "@mui/material";
import { headerShadow } from "../../../../themes/utils/shadows";
import theme from "../../../../themes";
export const StyledAppBar = styled(AppBar)(({  }) => ({
    backgroundColor: theme.palette.primary.main,
    boxShadow: theme?.customShadows?.header,
    position: "fixed", // or "sticky"
    top: 0,
    left: 0,
    right: 0,
    height: 40,
  }));
  export const StyledHeaderToolbar = styled(Toolbar)(({ theme }) => ({
    minHeight: "40px !important",
    display: "flex",
    alignItems: "center",
    px: 2,
  }))