import { styled } from '@mui/material/styles';
const GradientBackground = styled('div')(() => ({
  minHeight: '100vh',
  background: 'linear-gradient(113.09deg, #F5EDF0 17.21%, rgba(197, 226, 226, 0.32) 128.66%);',
  width: "100vw",
  height: "100vh",          // Fill the entire viewport
  display: "flex",
  flexDirection: "column",  // So children can be stacked vertically
  margin: 0,
  padding: 0,

}));
export default GradientBackground;
