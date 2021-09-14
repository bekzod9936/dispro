import styled from 'styled-components';

interface InfoProp {
  margin?: string;
}

export const Container = styled.div`
  position: relative;
`;

export const Wrap = styled.div`
  margin: 35px;
`;

export const TiTle = styled.div`
  font-weight: bold;
  font-size: 22px;
  color: #223367;
  display: inline-block;
`;

export const InfoBox = styled.div``;
export const InfoHeader = styled.div`
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 1px;
  color: #c7c7c7;
`;
export const InfoBody = styled.div`
  display: flex;
  align-items: center;
  padding-left: 25px;
  font-weight: bold;
  font-size: 28px;
  color: #606eea;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px;
  height: 60px;
  margin: ${({ margin }: InfoProp) => margin || 0};
`;
export const InfoWarpper = styled.div`
  width: 247px;
  position: absolute;
  top: 0;
  right: 35px;
`;

export const FilterWrap = styled.div`
  width: fit-content;
  position: relative;
`;

export const CasherHeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CasherInfo = styled.div`
  margin: ${({ margin }: InfoProp) => margin};
  user-select: none;
  border: 1px solid #c4c4c4;
  border-radius: 46px;
  font-weight: 300;
  font-size: 14px;
  color: #223367;
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  height: fit-content;
  div {
    display: flex;
    align-items: center;
  }
`;

export const CasherInfoWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
