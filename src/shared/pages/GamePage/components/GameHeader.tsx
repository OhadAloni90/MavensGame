import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { GameHeaderProps, StyledGameHeaderBoxProps } from "../../../../utils/interfaces/GameProps";
import theme from "../../../../themes";
const StyledGameHeaderBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "gameState",
})<StyledGameHeaderBoxProps>(({ theme, gameState }) => ({
  display: "flex",
  justifyContent: gameState === "ENDED" ? "center" : "space-between",
  alignItems: "center",
  borderBottom: `1px solid ${theme.palette.baseGray.main}`,
  borderTopLeftRadius: theme.gameDialog.borderRadius,
  borderTopRightRadius: theme.gameDialog.borderRadius,
  boxShadow: theme.customShadows.gameHeader,
  padding: '20px',
}));
const GameHeader: React.FC<GameHeaderProps> = ({ gameState, playerName, score }) => {
  return (
    <StyledGameHeaderBox gameState={gameState}>
      <Typography variant="mavensSubTitle" sx={{ color: theme.palette.primary.main }}>
        [{playerName}]
      </Typography>
      {gameState !== "ENDED" && (
        <Typography
          variant="mavensSubTitle"
          sx={{ color: theme.palette.basePinkSecondary.main }}
        >
          [Score {score}]
        </Typography>
      )}
    </StyledGameHeaderBox>
  );
};

export default GameHeader;
