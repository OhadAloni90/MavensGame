import { Box, keyframes, styled } from "@mui/material";

export const LoaderBox = styled(Box)(({ theme }) => ({
    width: '555px',
    margin: "20px auto",
    textAlign: "center",
    height: "100%",
    display: "flex",
    alignItems: "cneter",
    flexDirection: "column",
    justifyContent: "center",
  }));
  export const IndicatorBox = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    borderRadius: "16.5px",
    backgroundColor: theme?.palette?.baseWhite.main,
    width: "60px",
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }));
  export const StyledGameBox = styled(Box)(({}) => ({
    position: "relative",
    width: "100%",
    flex: 1,
    mt: 2,
    padding: 1,
  }));
  export const StyledGameEndedBox = styled(Box)(({}) => ({
    textAlign: "center",
    height: "100%",
    display: "flex",
    alignItems: "cneter",
    flexDirection: "column",
    justifyContent: "center",
  }))
  export const StyledInnerIndicator = styled(Box)(({theme}) => ({
      backgroundColor: theme?.palette?.basePinkSecondary.main,
      width: "45px",
      height: "45px",
      borderRadius: "10.5px",
  }))
  export const moveUpFade = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-10px);
    opacity: 0;
  }
`;

export const AnimatedIndicator = styled(Box)(({ theme }) => ({
  animation: `${moveUpFade} 1s forwards`, // runs for 1 second
}));