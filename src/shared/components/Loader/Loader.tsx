import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import theme from "../../../themes";

export const GradientLinearProgress = styled(LinearProgress)(() => ({
  height: 11,
  borderRadius: 9999, // large radius for a pill shape
  // Makes the track transparent -> Them,  add a white border and a subtle shadow:
  backgroundColor: "transparent",
  border: "3px solid #fff",
  boxShadow: theme?.customShadows?.loaderShadow,
  // Style the bar (the actual moving part) with a gradient and matching round ends:
  "& .MuiLinearProgress-bar": {
    borderRadius: 9999,
    background: "linear-gradient(113.09deg, #E6D4DC 17.21%, #8CD9DA 128.66%)",
  },
}));
