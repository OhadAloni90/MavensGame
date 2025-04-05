import React from 'react';
import { Button, SvgIcon, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { GameButtonProps } from '../../../utils/types/componentsTypes';

const CustomSendIcon = () => {
  return (
    <SvgIcon>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3.95311 2.06264L17.1484 9.45327C17.2461 9.50732 17.3275 9.58655 17.3842 9.68272C17.4409 9.77889 17.4708 9.8885 17.4708 10.0001C17.4708 10.1118 17.4409 10.2214 17.3842 10.3176C17.3275 10.4137 17.2461 10.493 17.1484 10.547L3.95311 17.9376C3.84196 17.999 3.71474 18.0251 3.5884 18.0124C3.46205 17.9997 3.34257 17.9489 3.24586 17.8666C3.14915 17.7843 3.07979 17.6745 3.04704 17.5518C3.01428 17.4291 3.01966 17.2994 3.06248 17.1798L5.39929 10.625L10.0001 10.625C10.3452 10.625 10.6251 10.3452 10.6251 10C10.6251 9.65482 10.3452 9.375 10.0001 9.375L5.39919 9.375L3.06248 2.82046C3.01966 2.70091 3.01428 2.57116 3.04704 2.44847C3.07979 2.32579 3.14915 2.21599 3.24586 2.13371C3.34257 2.05142 3.46205 2.00054 3.5884 1.98784C3.71474 1.97515 3.84196 2.00124 3.95311 2.06264Z"
          fill="white"
        />
      </svg>
    </SvgIcon>
  );
};
export default function GameButton({
  text,
  icon = <CustomSendIcon/> ,
  iconPosition = 'start',
  fullWidth,
  width,
  ...rest
}: GameButtonProps) {
  const startIcon = iconPosition === 'start' ? icon : undefined;
  const endIcon   = iconPosition === 'end'   ? icon : undefined;
  const StyledButton = styled(Button)(({ theme }) => ({
    width: width,    
  }));
  return (
    <StyledButton
      variant="contained"
      startIcon={startIcon}
      endIcon={endIcon}
      {...rest}
      onClick={rest.onClick}
    >
      <Typography variant='mavenMediumText'>
      {text}
      </Typography>
    </StyledButton>
  );
}
