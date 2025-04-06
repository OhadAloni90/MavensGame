import React from "react";
import { styled, keyframes } from "@mui/material/styles";
import { Box } from "@mui/material";
interface DiamondKeyboardProps {
  activeKey?: "w" | "a" | "s" | "d";
}
const clickEffect = keyframes`
  0% { transform: scale(1); }
  25% { transform: scale(1.2); }
  50% { transform: scale(0.8); }
  75% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;
const DiamondContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '10%',
  right: 'calc(50% - 60px)',
  width: '120px',
  height: '120px',
}));
const DiamondKey = styled(Box, {
  shouldForwardProp: (prop) => !["$isActive", "$posX", "$posY"].includes(prop as string),
})<{ $isActive?: boolean; $posX: number; $posY: number }>(
  ({ theme, $isActive, $posX, $posY }) => ({
    position: "absolute",
    width: "40px",
    height: "40px",
    lineHeight: "40px",
    borderRadius: "4px",
    backgroundColor: theme.palette.baseGray3.main,
    color: theme.palette.baseWhite.main,
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 500,
    textTransform: "uppercase",
    textAlign: "center",
    userSelect: "none",
    left: `${$posX}px`,
    top: `${$posY}px`,
    transition: "all 0.5s ease-out",
    border: `3px solid ${theme.palette.primary.main}`,
    boxShadow: "inset 0 0 3px rgba(0,0,0,0.5)",
    ...($isActive && {
      animation: `${clickEffect} 0.5s ease-out 3`,
      backgroundColor: theme.palette.basePinkSecondary.main,
      color: "#000",
    }),
  })
);
const DiamondKeyboard: React.FC<DiamondKeyboardProps> = ({ activeKey }) => {
  return (
    <DiamondContainer>
      {/* W at top */}
      <DiamondKey $isActive={activeKey === "w"} $posX={40} $posY={0}>
        W
      </DiamondKey>
      {/* A on left */}
      <DiamondKey $isActive={activeKey === "a"} $posX={-20} $posY={50}>
        A
      </DiamondKey>
      {/* D on right */}
      <DiamondKey $isActive={activeKey === "d"} $posX={100} $posY={50}>
        D
      </DiamondKey>
      {/* S at bottom */}
      <DiamondKey $isActive={activeKey === "s"} $posX={40} $posY={100}>
        S
      </DiamondKey>
    </DiamondContainer>
  );
};

export default DiamondKeyboard;
