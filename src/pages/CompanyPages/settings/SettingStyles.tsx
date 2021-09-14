import styled from 'styled-components';
import { ILeftLoyalitiy, IRightLoyalitiy } from './ReferalProgrammSection';

export const RightLoyalty = styled.div`
  width: ${(props: IRightLoyalitiy) => props.width || '52%'};
  display: flex;
  height: 73vh;

  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    appearance: none;
    display: none;
  }
  &::-webkit-scrollbar-track {
    appearance: none;
    display: none;
  }
`;
export const LeftLoyalty = styled.div`
  width: ${(props: ILeftLoyalitiy) => props.width || '38%'};
  height: 90%;
  display: flex;
  justify-content: start;
  box-sizing: border-box;
  margin-top: 20px;
  margin-bottom: 20px;
  border-right: 3px solid #7a85e6;
  flex-direction: ${(props: ILeftLoyalitiy) => props.flexDirection || 'row'};
`;

export const LargePanel = styled.div`
  padding: 30px 40px;
  border-radius: 14px;
  width: 90%;
  margin-bottom: 20px;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  flex-direction: column;
  //width: max-content;
`;
export const SmallPanel = styled.div`
  width: 85%;
  box-sizing: border-box;
  padding: 15px 20px;
  background-color: white;
  border-radius: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;
export const SettingsWrapper = styled.div`
  width: 98%;
  height: 97%;
  padding: 15px;
  border-radius: 14px;
  background-color: white;
`;
export const Levels = styled.div`
  padding: 25px 50px;
  border-radius: 14px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const ReferalScroll = styled.div`
  overflow-y: scroll;
  max-height: 60vh;
  &::-webkit-scrollbar {
    appearance: none;
    display: none;
  }
  &::-webkit-scrollbar-track {
    appearance: none;
    display: none;
  }
`;
