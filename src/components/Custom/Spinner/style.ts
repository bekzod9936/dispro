import styled from 'styled-components';
import { Props } from './index';

export const Container = styled.div`
  width: ${({ width }: Props) => (width ? width : '100%')};
  height: ${({ height }: Props) => (height ? height : '100%')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
