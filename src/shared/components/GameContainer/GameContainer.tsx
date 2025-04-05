// GameContainer.tsx
import React from "react";
import { Box, BoxProps } from "@mui/material";
import { styled } from "@mui/material/styles";
type GameContainerProps = {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  fill?: boolean; // if true, fill parent with an offset
} & BoxProps;

const StyledContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.baseWhite?.main ?? "#FFFFFF",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme?.customShadows?.dialogs,
  padding: "25px 20px 20px 20px",
  margin: "0 auto",
}));

export default function GameContainer({ children, width, height, fill = false, sx, ...rest }: GameContainerProps) {
  return (
    <StyledContainer
      sx={{
        minWidth: width || 400,
        maxHeight: height || 120,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </StyledContainer>
  );
}
