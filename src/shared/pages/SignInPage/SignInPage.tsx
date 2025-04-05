import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Container, Typography, Box, InputAdornment, IconButton } from '@mui/material';
import { UserContext } from '../../../App';
import GameButton from '../../components/Button/Button';
import GameContainer from '../../components/GameContainer/GameContainer';
import theme from '../../../themes';
import { useGameContext } from '../../../providers/GameContext';
import { BASE_URL } from '../../../utils/vars';
import { defaultContainerStyles } from '../../../themes/utils/GlobalContainerStyles';
import ClearIcon from '@mui/icons-material/Clear';


export default function SignInPage() {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const { setUserId } = useContext(UserContext);
  const navigate = useNavigate();
  const { showToast, setUser } = useGameContext();
  const handleUserType = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!e || !e?.target?.value) return ;
    setUsernameError(false);
    setUsername(e.target.value);
    setUser(e.target.value);
  };
  const handleClear = () => {
    setUsername('');
  };
  const handleUserRegistrationError = () => {
    showToast('Must have atleast 1 character', 'error');
    setUsernameError(true);
  }
  const handleStart = async () => {
    if (!username) return handleUserRegistrationError();
    try {
      const res = await fetch(`${BASE_URL}/api/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      if (data.userId) {
        setUserId(data.userId);
        navigate('/game');
      }
    } catch (error) {
      showToast('Failed to retrieve user information. Try again', 'error');
      console.error('Failed to get userId:', error);
    } 
  };
  
  return (
    <Container  sx={{
      ...defaultContainerStyles
    }}
  >
      <Typography variant="mavensBigTitleSemiBold" gutterBottom sx={{ color: theme?.palette?.primary?.main }} mb={6} >
        Welcome to mavens Game
      </Typography>
      <GameContainer width={430} height={120}  sx={{boxShadow: theme?.customShadows?.loginComponent}}>
        <Typography variant="mavenRegularText" gutterBottom  sx={{ textAlign: 'left'}} >
          Enter player name
        </Typography>
        {/* Flex container for the input and button */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} mt={2}>
          <TextField
            variant="outlined"
            placeholder="Input"
            value={username}
            error={usernameError}
            onChange={handleUserType}
            slotProps={{
              input: {
                endAdornment: username && (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClear} edge="end">
                      <ClearIcon  sx={{ fontSize: '15px'}}/>
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <GameButton
            text="Start game"
            iconPosition="start"
            fullWidth={true}
            onClick={handleStart}
          />
        </Box>
      </GameContainer>
    </Container>
  );
}
