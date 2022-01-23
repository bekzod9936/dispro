import styled from 'styled-components';
import { Page } from 'react-pdf';

export const Container = styled.div`
  display: flex;
  align-items: center;
  overflow-y: auto;
  flex-direction: column;
  height: 100vh;
  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #606eea;
    border-radius: 14px 0px 0px 14px;
  }
`;

export const CPage = styled(Page)``;

interface Props {
  margin?: string;
}

export const Wrapper = styled.div`
  display: flex;
  grid-gap: 20px;
  align-items: center;
  justify-content: center;
  margin: ${({ margin }: Props) => margin};
`;

export const Text = styled.div`
  text-align: center;
  font-weight: 500;
  font-size: 13px;

  color: #223367;
`;
