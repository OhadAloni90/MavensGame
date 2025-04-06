import React, { useEffect, useState, useRef, useContext } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { GradientLinearProgress } from "../../components/Loader/Loader";
import GameButton from "../../components/Button/Button";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import {
  IndicatorBox,
  LoaderBox,
  moveUpFade,
  StyledGameBox,
  StyledGameEndedBox,
  StyledInnerIndicator,
} from "./style/GameStyledBoxes";
import { defaultContainerStyles, StyledGameContainer } from "../../../themes/utils/GlobalContainerStyles";
import GameHeader from "./components/GameHeader";
import { BASE_URL } from "../../../utils/vars";
import { UserReactionMessages } from "../../../utils/enums";
import { useGameContext } from "../../../providers/GameContext";
import { GameState } from "../../../utils/types/gameTypes";
import theme from "../../../themes";
import KeyboardDisplay from "../../components/KeyboardDisplay/DiamondKeyboardDisplay";
import DiamondKeyboard from "../../components/KeyboardDisplay/DiamondKeyboardDisplay";
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const randomDelay = () => Math.floor(Math.random() * 3000) + 2000;

export default function GamePage() {
  // Difficulty state; initially null means no selection yet.
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard" | null>(null);

  // Allowed directions and a random selector.
  const directions: ("left" | "right" | "up" | "down")[] = ["left", "right", "up", "down"];
  const randomDirection = (): "left" | "right" | "up" | "down" =>
    directions[Math.floor(Math.random() * directions.length)];
  const { showToast, state, dispatch } = useGameContext();
  const navigate = useNavigate();
  const showToastRef = useRef(showToast);

  // Game state variables.
  const [gameState, setGameState] = useState<GameState>("WAITING");
  const [score, setScore] = useState<number>(0);
  const scoreRef = useRef<number>(0);
  const [indicatorSide, setIndicatorSide] = useState<"left" | "right" | "up" | "down" | null>(null);
  const gameStateRef = useRef(gameState);
  useEffect(() => {
    showToastRef.current = showToast;
  }, [showToast]);
  // Global key listener for "waiting" mode:
  const tooSoonToastShownRef = useRef(false);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStateRef.current === "WAITING" && !tooSoonToastShownRef.current) {
        const key = e.key.toLowerCase();
        if (["a", "d", "w", "s"].includes(key)) {
          tooSoonToastShownRef.current = true;
          showToastRef.current(UserReactionMessages["TooSoon"], "error");
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!state?.userId) {
      navigate("/");
    }
    if (gameState === "WAITING") {
      tooSoonToastShownRef.current = false;
    }
    gameStateRef.current = gameState;
  }, [gameState, state, navigate, showToast]);

  const [restartCount, setRestartCount] = useState(0);
  const gameLoopInstanceIdRef = useRef(0);

  useEffect(() => {
    // First, if user is not authenticated, navigate away.
    if (!state?.userId) {
      showToast("Failed to Authenticate user. Returning to log-in page.", "error");
      navigate("/");
      return;
    }
    // Do nothing if difficulty is not chosen.
    if (difficulty === null) return;
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
        // Timeout based on difficulty: hard=1000ms, medium=2000ms, easy=3000ms.
        const timeout = difficulty === "hard" ? 1000 : difficulty === "medium" ? 2000 : 3000;
        const reactionResult = await waitForKeyPress(side, timeout);
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
  }, [state?.userId, restartCount, difficulty, dispatch]);

  // Wait for correct key press. If a key is pressed, resolve immediately.
  const waitForKeyPress = (
    expected: "left" | "right" | "up" | "down",
    timeout: number
  ): Promise<"success" | "wrongKey" | "tooLate"> => {
    return new Promise((resolve) => {
      let resolved = false;
      const onKeyDown = (e: KeyboardEvent) => {
        if (gameStateRef.current !== "SHOWING") return;
        const key = e.key.toLowerCase();
        const correct =
          (expected === "left" && key === "a") ||
          (expected === "right" && key === "d") ||
          (expected === "up" && key === "w") ||
          (expected === "down" && key === "s");
        const reaction = correct ? "success" : "wrongKey";
        if (!resolved) {
          resolved = true;
          window.removeEventListener("keydown", onKeyDown);
          clearTimeout(timeoutId);
          resolve(reaction);
        }
      };
      window.addEventListener("keydown", onKeyDown);
      const timeoutId = setTimeout(() => {
        window.removeEventListener("keydown", onKeyDown);
        if (!resolved) {
          resolved = true;
          resolve("tooLate");
        }
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
        body: JSON.stringify({ userId: state?.userId, score: scoreRef.current, success }),
      });
    } catch (err) {
      showToast("Failed to save score. Try again later!", "error");
      console.error("Failed to save score:", err);
    }
  };

  const mapDirectionToKey = (dir: "left" | "right" | "up" | "down"): "w" | "a" | "s" | "d" => {
    switch (dir) {
      case "left":
        return "a";
      case "right":
        return "d";
      case "up":
        return "w";
      case "down":
        return "s";
    }
  };
  const handleRestart = () => {
    setScore(0);
    scoreRef.current = 0;
    setIndicatorSide(null);
    setGameState("WAITING");
    setRestartCount((prev) => prev + 1);
    setDifficulty(null); // Reset difficulty so selection UI appears again
  };

  // If difficulty is not set, show the selection UI:
  if (difficulty === null) {
    return (
      <Container sx={defaultContainerStyles}>
        <Typography variant="mavensBigTitleBold" mt={10}>
          Select Difficulty
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button variant="contained" onClick={() => setDifficulty("easy")}>
            Easy
          </Button>
          <Button
            variant="contained"
            onClick={() => setDifficulty("medium")}
            sx={{ ml: 2, backgroundColor: theme?.palette?.infoGreen?.main }}
          >
            Medium
          </Button>
          <Button
            variant="contained"
            onClick={() => setDifficulty("hard")}
            sx={{ ml: 2, backgroundColor: theme?.palette?.basePinkSecondary?.main }}
          >
            Hard
          </Button>
        </Box>
      </Container>
    );
  }

  // Otherwise, render the game UI:
  return (
    <Container sx={defaultContainerStyles}>
      <StyledGameContainer>
        {state.username && <GameHeader gameState={gameState} playerName={state.username} score={score} />}
        {gameState === "WAITING" && (
          <LoaderBox>
            <GradientLinearProgress variant="indeterminate" />
          </LoaderBox>
        )}
        {gameState === "SHOWING" && indicatorSide && (
          <>
            <StyledGameBox>
              <IndicatorBox
                sx={{
                  ...(indicatorSide === "left" && { left: "20%" }),
                  ...(indicatorSide === "right" && { right: "20%" }),
                  ...(indicatorSide === "up" && { top: "20%", left: "50%", transform: "translateX(-50%)" }),
                  ...(indicatorSide === "down" && { bottom: "-40%", left: "50%", transform: "translateX(-50%)" }),
                  boxShadow: theme?.customShadows?.gameCube,
                  // Dynamically set animation duration based on difficulty:
                  animation: `${moveUpFade} ${difficulty === "hard" ? 1 : difficulty === "medium" ? 2 : 3}s forwards`,
                }}
              >
                <StyledInnerIndicator />
              </IndicatorBox>
            </StyledGameBox>
            <DiamondKeyboard activeKey={mapDirectionToKey(indicatorSide)} />
          </>
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
                fullWidth
                onClick={handleRestart}
              />
            </Box>

          </StyledGameEndedBox>
        )}
      </StyledGameContainer>
    </Container>
  );
}
