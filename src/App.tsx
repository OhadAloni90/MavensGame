import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import SignInPage from "./shared/pages/SignInPage/SignInPage";
import GamePage from "./shared/pages/GamePage/GamePage";
import LeaderboardPage from "./shared/pages/LeaderBoardPage/LeaderboardPage";
import Header from "./shared/components/Header/Header";
import GradientBackground from "./themes/utils/backgrounds";
import { Box } from "@mui/material";
import { MainProvider } from "./providers/GameContext";
export const UserContext = React.createContext<{
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}>({
  userId: "",
  setUserId: () => {},
});

export default function App() {
  const [userId, setUserId] = React.useState("");
  const Layout = () => {
    return (
      <Box sx={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Header
        text="mavens Game"
      />
      <Box
        sx={{
          marginTop: "40px",
          height: "calc(100vh - 40px)",
        }}
      >
        <Outlet />
      </Box>
    </Box>
    );
  };
  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      <MainProvider>
        <GradientBackground
          sx={{
            width: "100vw",
            height: "100vh",          // Fill the entire viewport
            display: "flex",
            flexDirection: "column",  // So children can be stacked vertically
            margin: 0,
            padding: 0,
                  }}
        >
          <Routes>
            <Route path="/" element={<Layout />}>
            <Route index  element={<SignInPage />} />
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/game" element={<GamePage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
            </Route>
          </Routes>
        </GradientBackground>
      </MainProvider>
    </UserContext.Provider>
  );
}
