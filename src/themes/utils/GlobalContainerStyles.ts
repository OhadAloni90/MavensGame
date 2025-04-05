import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
export const defaultContainerStyles = {
  minWidth: '100vw',
  height: '100%', // Allow the container to fill the parent's height (which is calc(100vh - 40px))
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

export const defaultGameContainerrStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};
export const ContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
    position: 'relative'
}));
export const StyledHighScoreContainer =  styled(Box)(({ theme }) => ({
  height: "auto",
  display: "flex",
  width: '75%',
  overflow: "hidden",
  flexDirection: "column",
  margin: "2rem auto",          // center horizontally + top/bottom margin
  borderRadius: theme?.shape?.borderRadius,
  boxShadow: theme?.customShadows?.dialogs,
  backgroundColor: theme.palette.baseWhite.main,
  border: `1px solid ${theme.palette.basePinkSecondary.main}`,
  marginBottom: 6,
}));
export const StyledGameContainer = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "100%",                  // 90% of the parent width
  flex: 1,
  display: "flex",
  flexDirection: "column",
  margin: "2rem auto",          // center horizontally + top/bottom margin
  borderRadius: theme?.gameDialog?.borderRadius,
  boxShadow: theme?.customShadows?.gameBoxShadow,
  backgroundColor: theme.palette.baseWhite.main,
  border: `1px solid ${theme.palette.baseGray.main}`,
}));
export const PageBackground = styled(Box)(({ theme }) => ({
  width: "100vw",
  minHeight: "100vh",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.baseWhite.main,
}));
