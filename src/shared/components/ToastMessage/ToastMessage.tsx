import React from "react";
import { Alert, Box, Portal, SvgIcon, Typography } from "@mui/material";
import { StyledToastBox } from "./style/StyledToastBox";
type ToastMessageProps = {
  open: boolean;
  message: string;
  severity?: "success" | "error" | "info" | "warning";
  onClose?: () => void;
  container?: Element | null;
};
export default function ToastMessage({ open, message, severity = "success", onClose, container }: ToastMessageProps) {
  if (!open) return null;
  const SuccessIcon = () => {
    return (
      <SvgIcon>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
            fill="#30A66D"
          />
          <path
            d="M13.4375 8.125L8.85156 12.5L6.5625 10.3125"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </SvgIcon>
    );
  };
  const ErrorIcon = () => {
    return (
      <SvgIcon>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
            fill="#F04747"
          />
          <path d="M7.5 7.50024L12.5 12.5002" stroke="white" stroke-linecap="round" />
          <path d="M12.5 7.50024L7.5 12.5002" stroke="white" stroke-linecap="round" />
        </svg>
      </SvgIcon>
    );
  };
  return (
    <Portal container={container}>
      <StyledToastBox mb={3}>
        <Alert
          icon={severity === "success" ? <SuccessIcon /> : <ErrorIcon />}
          severity={severity}
          onClose={onClose}
          
        >
          <Typography  variant="mavenMediumText">
          {message}
          </Typography>
        </Alert>
      </StyledToastBox>
    </Portal>
  );
}
