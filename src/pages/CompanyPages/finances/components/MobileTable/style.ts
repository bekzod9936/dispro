import styled from 'styled-components';

export const Container = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  padding: 5px 0;
  & > div:nth-child(2n-1) {
    background-color: #eff0fd;
  }
  & > div:nth-child(2n) {
    background-color: white;
  }
`;

export const Data = styled.div`
  padding: 10px 20px;
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
`;

export const Wrapper = styled.div`
  display: flex;
`;
