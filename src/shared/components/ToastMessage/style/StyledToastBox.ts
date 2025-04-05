import { Box, styled } from "@mui/material";

export const StyledToastBox =  styled(Box)(({  }) => ({
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1300, // make sure it appears above other content
    bottom:22,
}))