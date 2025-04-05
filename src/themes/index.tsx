import { createTheme } from '@mui/material/styles';
import palette from './palette';
import typography from './typography';
import componentsOverride from './components';
import { customAlertShadows, dialogsShadow, gameBoxShadow, gameHeaderAndCubeShadow, headerShadow, loaderShadow, loginComponenShadow, outlinebuttonShadow } from './utils/shadows';

const theme = createTheme({
  palette,
  typography,
  shape: {
    borderRadius: 12, 
  },
  gameDialog: {
    borderRadius: 20,
  },
  customShadows: {
    alert: customAlertShadows,
    header: headerShadow,
    dialogs: dialogsShadow,
    gameHeader: gameHeaderAndCubeShadow,
    gameCube: gameHeaderAndCubeShadow,
    loginComponent: loginComponenShadow,
    gameBoxShadow: gameBoxShadow,
    outlinebuttonShadow: outlinebuttonShadow,
    loaderShadow: loaderShadow
  },
});

theme.components = {
  ...theme.components,
  ...componentsOverride(theme),
};

export default theme;
