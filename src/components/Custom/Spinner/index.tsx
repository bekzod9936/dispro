import React from 'react';
import { Container } from './style';
import CircularProgress from '@material-ui/core/CircularProgress';

export interface Props {
  height?: string;
  width?: string;
}

const Spinner = ({ width, height }: Props) => {
  return (
    <Container width={width} height={height}>
      <CircularProgress />
    </Container>
  );
};

export default Spinner;
