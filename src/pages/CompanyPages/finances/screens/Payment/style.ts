import styled from 'styled-components';

export const Container = styled.div`
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-right: 25px;
`;

export const WrapPag = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

export const Info = styled.div`
  color: #223367;
  font-size: 18px;
  span {
    font-weight: 900;
    margin: 0px 5px;
    font-size: 18px;
  }
`;
