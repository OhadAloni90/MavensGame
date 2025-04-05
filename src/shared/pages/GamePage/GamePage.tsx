import React, { useEffect, useState, useRef, useContext } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { UserContext } from "../../../App";
import { GradientLinearProgress } from "../../components/Loader/Loader";
import GameButton from "../../components/Button/Button";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import { IndicatorBox, LoaderBox, moveUpFade, StyledGameBox, StyledGameEndedBox } from "./style/GameStyledBoxes";
import { defaultContainerStyles, StyledGameContainer } from "../../../themes/utils/GlobalContainerStyles";
import GameHeader from "./components/GameHeader";
import { BASE_URL } from "../../../utils/vars";
import { UserReactionMessages } from "../../../utils/enums";
import { useGameContext } from "../../../providers/GameContext";
import { GameState } from "../../../utils/types/gameTypes";
import theme from "../../../themes";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const randomDelay = () => Math.floor(Math.random() * 3000) + 2000;

export default function GamePage() {
  const directions: ("left" | "right" | "up" | "down")[] = ["left", "right", "up", "down"];
  const randomDirection = (): "left" | "right" | "up" | "down" =>
    directions[Math.floor(Math.random() * directions.length)];

  const { userId } = useContext(UserContext);
  const { showToast, state, dispatch } = useGameContext();
  const navigate = useNavigate();
  // Keep a stable reference to showToast
  const showToastRef = useRef(showToast);

  // Game states
  const [gameState, setGameState] = useState<GameState>("WAITING");
  const [score, setScore] = useState<number>(0);
  const scoreRef = useRef<number>(0);
  const [indicatorSide, setIndicatorSide] = useState<"left" | "right" | "up" | "down" | null>(null);
  const gameStateRef = useRef(gameState);
  useEffect(() => {
    showToastRef.current = showToast;
  }, [showToast]);
  // Inside your GamePage component
  const tooSoonToastShownRef = useRef(false);
  // Global key listener for "waiting" mode:
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStateRef.current === "WAITING" && !tooSoonToastShownRef.current) {
        const key = e.key.toLowerCase();
        // Check for any valid input key: "a", "d", "w", or "s"
        if (["a", "d", "w", "s"].includes(key)) {
          tooSoonToastShownRef.current = true;
          showToastRef.current(UserReactionMessages["TooSoon"], "error");
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);
  const [restartCount, setRestartCount] = useState(0);
  const gameLoopInstanceIdRef = useRef(0);
  useEffect(() => {
    if (!userId) return;
    gameLoopInstanceIdRef.current++;
    const currentInstanceId = gameLoopInstanceIdRef.current;
    const runGameLoop = async () => {
      while (currentInstanceId === gameLoopInstanceIdRef.current) {
        setGameState("WAITING");
        setIndicatorSide(null);
        await delay(randomDelay());
        if (currentInstanceId !== gameLoopInstanceIdRef.current) break;
        const side = randomDirection();
        setIndicatorSide(side);
        setGameState("SHOWING");
        dispatch({ type: "HIDE_TOAST" });
        const reactionResult = await waitForKeyPress(side, 1000);
        if (reactionResult === "success") {
          playSound("/sounds/smb_coin.wav");
          scoreRef.current += 1;
          setScore(scoreRef.current);
          showToastRef.current(UserReactionMessages["Success"], "success");
        } else {
          playSound("/sounds/smb_bump.wav");
          setGameState("ENDED");
          showToastRef.current(UserReactionMessages[reactionResult === "tooLate" ? "TooLate" : "WrongKey"], "error");
          await saveScore(false);
          break;
        }
      }
    };
    runGameLoop();
    return () => {
      gameLoopInstanceIdRef.current++;
    };
  }, [userId, restartCount]);
  // Wait for correct key press
  const waitForKeyPress = (
    expected: "left" | "right" | "up" | "down",
    timeout: number
  ): Promise<"success" | "wrongKey" | "tooLate"> => {
    return new Promise((resolve) => {
      let reaction: "success" | "wrongKey" | null = null;
      const onKeyDown = (e: KeyboardEvent) => {
        if (gameStateRef.current !== "SHOWING") return;
        if (reaction !== null) return;
        const key = e.key.toLowerCase();
        const correct =
          (expected === "left" && key === "a") ||
          (expected === "right" && key === "d") ||
          (expected === "up" && key === "w") ||
          (expected === "down" && key === "s");
        reaction = correct ? "success" : "wrongKey";
      };
      window.addEventListener("keydown", onKeyDown);
      setTimeout(() => {
        window.removeEventListener("keydown", onKeyDown);
        resolve(reaction !== null ? reaction : "tooLate");
      }, timeout);
    });
  };
  const playSound = (src: string) => {
    const audio = new Audio(src);
    audio.play().catch((err) => console.error("Audio play error:", err));
  };
  const saveScore = async (success: boolean) => {
    try {
      await fetch(`${BASE_URL}/api/saveScore`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, score: scoreRef.current, success }),
      });
    } catch (err) {
      showToast("Failed to save score. Try again later!", "error");
      console.error("Failed to save score:", err);
    }
  };
  // Restart
  const handleRestart = () => {
    setScore(0);
    scoreRef.current = 0;
    setIndicatorSide(null);
    setGameState("WAITING");
    setRestartCount((prev) => prev + 1);
  };

  return (
    <Container
      sx={{
        ...defaultContainerStyles,
      }}
    >
      <StyledGameContainer>
        {/*  In-game header */}
        {state.playerName && <GameHeader gameState={gameState} playerName={state.playerName} score={score} />}
        {/* WAITING / SHOWING / ENDED inside the same container */}
        {gameState === "WAITING" && (
          <LoaderBox>
            <GradientLinearProgress variant="indeterminate" />
          </LoaderBox>
        )}
        {gameState === "SHOWING" && indicatorSide && (
          <StyledGameBox>
            <IndicatorBox
              sx={{
                // Position based on the direction
                ...(indicatorSide === "left" && { left: "20%" }),
                ...(indicatorSide === "right" && { right: "20%" }),
                ...(indicatorSide === "up" && { top: "20%", left: "50%", transform: "translateX(-50%)" }),
                ...(indicatorSide === "down" && { bottom: "-40%", left: "50%", transform: "translateX(-50%)" }),
                boxShadow: theme?.customShadows?.gameCube,
                animation: `${moveUpFade} 1s forwards`,
              }}
            >
              <Box
                sx={{
                  backgroundColor: theme?.palette?.basePinkSecondary.main,
                  width: "45px",
                  height: "45px",
                  borderRadius: "10.5px",
                }}
              ></Box>
            </IndicatorBox>
          </StyledGameBox>
        )}
        {gameState === "ENDED" && (
          <StyledGameEndedBox>
            <Typography
              variant="mavensBigTitleBold"
              sx={{ color: theme?.palette?.infoRed?.main, fontWeight: "bold", mb: 4 }}
            >
              GAME OVER!
            </Typography>
            <Typography variant="mavensBigTitleBold" sx={{ mb: 4 }}>
              [Score {score}]
            </Typography>
            <Box>
              <Button variant="outlined" onClick={() => navigate("/leaderboard")}>
                <Typography variant="mavenMediumText">Highscore</Typography>
              </Button>
              <GameButton
                sx={{ m: 1 }}
                width={163}
                text="Restart Game"
                icon={<SendIcon />}
                iconPosition="start"
                fullWidth={true}
                onClick={handleRestart}
              />
            </Box>
          </StyledGameEndedBox>
        )}
      </StyledGameContainer>
    </Container>
  );
}
