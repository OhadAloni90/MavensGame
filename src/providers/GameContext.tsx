import React, { createContext, useContext, useReducer, ReactNode, useRef } from "react";
import { Box } from "@mui/material";
import ToastMessage from "../shared/components/ToastMessage/ToastMessage";
import { initialState, GameReducer} from "./GameReducers";
import { GameState, ToastSeverity, UIAction } from "../utils/types/UITypes";
type GameContextProps = {
  state: GameState;
  dispatch: React.Dispatch<UIAction>;
  showToast: (message: string, severity?: ToastSeverity) => void;
  onSetLoading: (loading: boolean) => void;
  setUser: (user: string) => void;
};

const GameContext = createContext<GameContextProps | undefined>(undefined);
export const MainProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(GameReducer, initialState);
  const containerRef = useRef<HTMLDivElement>(null);
  const showToast = (message: string, severity: ToastSeverity = "success") => {
    dispatch({ type: "SHOW_TOAST", payload: { message, severity } });
    if (severity !== "success") {
      setTimeout(() => dispatch({ type: "HIDE_TOAST" }), 2000);
    }
  };
  

  const onSetLoading = (loading: boolean) => {
    dispatch({ type: "LOADING", payload: loading });
  };
  const setUser = (user: string) => {
    dispatch({ type: "SET_USER", payload: user });
  };
  return (
    <GameContext.Provider value={{ state, dispatch, showToast, onSetLoading, setUser }}>
      {/* Wrap content in a relative container */}
      <Box ref={containerRef} sx={{ position: "relative", minHeight: "100vh" }}>
        {children}
        <ToastMessage
          open={state.toast.open}
          message={state.toast.message}
          severity={state.toast.severity}
          onClose={() => dispatch({ type: "HIDE_TOAST" })}
          container={containerRef.current} // pass the ref’s current elements..
        />
      </Box>
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a MainProvider");
  }
  return context;
};
