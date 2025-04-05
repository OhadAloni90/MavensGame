// theme/components.ts
import { Theme } from "@mui/material/styles";
import {  CSSObject } from "@mui/system";

export default function componentsOverride(theme: Theme) {
  const { palette, shape } = theme;
  // !--- Button Overrides ---!
    // !--- Outlined Button Overrides! ---
    const outlinedButtonStyles: CSSObject = {
      borderColor: palette.baseGray4.main,
      backgroundColor: palette.baseWhite.main,
      borderWidth: "1px",
      borderStyle: "solid",
      boxShadow: theme?.customShadows?.outlinebuttonShadow,
      borderRadius: shape.borderRadius,
      "&:hover": {
        borderColor: palette.baseGray.main,
      },
    };
  const buttonRootStyles: CSSObject = {
    textTransform: "none",
    borderRadius: shape.borderRadius,
  };
  const containedPrimaryStyles: CSSObject = {
    backgroundColor: palette.primary.main,
    color: palette.baseWhite?.main,
    "&:hover": {
      backgroundColor: palette.baseGray3.main,
    },
    borderRadius: shape.borderRadius,
    width: "144px",
    height: "36px",
    padding: "4px 12px",
    boxShadow: theme?.customShadows?.buttonShadow
  };
  // !--- Outlined Input Overrides ---!
  const outlinedInputRootStyles: CSSObject = {
    width: "280px",
    maxHeight: 36,
    fontSize: theme.typography.body2?.fontSize,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: palette.baseGray.main,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: palette.primary.main,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: palette.primary.main,
    },
    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: palette?.infoRed?.main,
    },
  };
  // !--- Filled Input Overrides  ---!
  const filledInputRootStyles: CSSObject = {
    backgroundColor: "#f5f5f5",
    "&:hover": {
      backgroundColor: "#eee",
    },
    "&.Mui-focused": {
      backgroundColor: palette?.baseWhite?.main,
    },
    "&.Mui-error": {
      backgroundColor: palette?.infoRed?.main,
    },
  };
  // !--- Form Label Overrides ---!
  const formLabelStyles: CSSObject = {
    width: "auto",
    color: "#999",
    "&.Mui-focused": {
      color: palette.primary.main,
    },
    "&.Mui-error": {
      color: palette.infoRed.main,
    },
  };
  // ---!!! Alert (for Toasts) Overrides !!!----
  const alertRootStyles: CSSObject = {
    //  alert is between 500px and 800px wide
    minWidth: 500,
    maxWidth: 200,
    fontWeight: 'medium',
    borderRadius: shape.borderRadius,
    boxShadow: theme?.customShadows?.alert[0],
    color: palette.primary.main,
    border: `1px solid ${palette.baseGray2.main}`,
    padding: '2px 12px'
  };

  return {
    // Buttons
    MuiButton: {
      styleOverrides: {
        root: buttonRootStyles,
        containedPrimary: containedPrimaryStyles,
        outlined: outlinedButtonStyles, 
      },
    },
    // Inputs
    MuiOutlinedInput: {
      styleOverrides: {
        minWidth: 280,
        root: outlinedInputRootStyles,
        input: {
          fontStyle: "normal", // default italic when not focused
          "&:focus": {
            fontStyle: "normal",
          },
          "&:hover": {
            fontStyle: "italic",
          },
          "&:placeholder-shown": {
            fontStyle: "italic",
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        minWidth: 280,
        root: filledInputRootStyles,
        
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        minWidth: 280,
        root: formLabelStyles,
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          // Affects all icons inside all IconButtons!
          "& .MuiSvgIcon-root": {
            color: theme?.palette?.baseGray2?.main,
          },
        },
      },
    },
    // Toasts (Alerts & Snackbars)
    MuiAlert: {
      styleOverrides: {
        root: alertRootStyles,
        //  success alerts in standard variant
        standardSuccess: {
          backgroundColor: theme.palette.common.white,
          color: palette.infoGreen.main, // text color
          "& .MuiAlert-icon": {
            color: palette.infoGreen.main, // success icon color
          },
          // Overrides the close "X" (action area) so it’s NOT green
          "& .MuiAlert-action .MuiIconButton-root": {
            color: palette.baseGray?.main,
          },
        },
        //  For error alerts in standard variant
        standardError: {
          backgroundColor: theme.palette.common.white,
          color: palette.infoRed.main,
          "& .MuiAlert-icon": {
            color: palette.infoRed.main, // error icon color
          },
          // Make the close "X" neutral
          "& .MuiAlert-action .MuiIconButton-root": {
            color: theme.palette.baseGray.main,
          },
        },
      },
    },

  };
}
