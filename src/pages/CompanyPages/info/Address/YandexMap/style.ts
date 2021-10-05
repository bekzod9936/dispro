import styled from 'styled-components';
import { Map } from 'react-yandex-maps';

export const YandexContainer = styled.div`
  border-radius: 14px;
  border: 1px solid #c4c4c4;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.04));
  overflow: hidden;
`;

export const MapYandex = styled(Map)`
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.04));
  border-radius: 14px !important;
  background-color: white;
  width: 100%;
  height: 100%;
`;
