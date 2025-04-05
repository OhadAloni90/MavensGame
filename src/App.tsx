import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import SignInPage from "./shared/pages/SignInPage/SignInPage";
import GamePage from "./shared/pages/GamePage/GamePage";
import LeaderboardPage from "./shared/pages/LeaderBoardPage/LeaderboardPage";
import Header from "./shared/components/Header/Header";
import GradientBackground from "./themes/utils/backgrounds";
import { Box, styled } from "@mui/material";
import { MainProvider } from "./providers/GameContext";

export default function App() {
  const StyledLayoutContainer = styled(Box)(({ theme }) => ({
    width: "100vw",
    height: "100vh",
    position: "relative",
  }));
  const StyledLayout = styled(Box)(({ theme }) => ({
    marginTop: "40px",
    height: "calc(100vh - 40px)",
  }));

  const Layout = () => {
    return (
      <StyledLayoutContainer>
        <Header text="mavens Game" />
        <StyledLayout>
          <Outlet />
        </StyledLayout>
      </StyledLayoutContainer>
    );
  };
  return (
    <MainProvider>
      <GradientBackground>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<SignInPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
          </Route>
        </Routes>
      </GradientBackground>
    </MainProvider>
  );
}
