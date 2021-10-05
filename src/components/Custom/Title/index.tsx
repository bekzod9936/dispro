import React from 'react';
import { Container } from './style';

interface Props {
  children?: any;
}

const Title = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

export default Title;
