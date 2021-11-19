import styled from 'styled-components';
import { ReactComponent as Pink } from 'assets/icons/StatistisPage/app.svg';

export const Container = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  padding: 5px 0;
  margin-top: 15px;
  & > div:nth-child(2n-1) {
    background-color: #eff0fd;
  }
  & > div:nth-child(2n) {
    background-color: white;
  }
`;

export const PinkIcon = styled(Pink)``;

export const Data = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const FullName = styled.div`
  font-weight: normal;
  font-size: 16px;
  color: #223367;
`;

export const Title = styled.div`
  font-weight: 300;
  font-size: 14px;
  color: #223367;
`;

export const Amount = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: #223367;
  margin-left: 5px;
`;

export const Wrapper = styled.div`
  display: flex;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  margin-left: -10px;
  grid-gap: 15px;
  & > span {
    font-weight: 500;
    font-size: 16px;
    color: #223367;
  }
`;

export const ModalContent = styled.div`
  padding: 15px;
`;

export const WrapBox = styled.div`
padding:25px 10px;
`;
export const WrapBoxDetail=styled.div`
padding:0px 10px;
`
export const Box = styled.div`
  /* border-bottom: 1px solid rgba(96, 110, 234, 0.3); */
  padding: 10px 0 10px 5px;
`;

export const BoxTitle = styled.div`
  font-weight: normal;
  font-size: 14px;
  color: #a5a5a5;
  margin-bottom: 5px;
`;

export const BoxInfo = styled.div`
  font-weight: 500;
  font-size: 14px;
  padding-right:20px;
  color: #223367;
`;

export const BoxinfoDetail=styled.div`
font-weight:300;
font-size:14px;
color:'#223367';
padding:5px 0px;
`;
interface MProps {
  isAvatar?: boolean;
}

export const WrapMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: ${({ isAvatar }: MProps) => (isAvatar ? '15px' : '0')};
`;

export const WrapIcon = styled.div`
  display: flex;
  align-items: center;
`;

export const WrapAvatar = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 15px;
  & > span {
    font-weight: 500;
    font-size: 16px;
    color: #223367;
  }
`;
