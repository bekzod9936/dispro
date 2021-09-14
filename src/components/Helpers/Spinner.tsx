import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { COLORS } from '../../services/Types/enums';
import { Container } from './style';

const Spinner = () => {
  return (
    <Container>
      <CircularProgress
        style={{ width: '40px', height: '40px', color: COLORS.purple }}
      />
    </Container>
  );
};

export default Spinner;
