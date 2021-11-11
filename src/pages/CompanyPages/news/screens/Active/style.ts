import styled from 'styled-components';

export const Container = styled.div`
  overflow: hidden;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Wrap = styled.div`
  overflow-y: auto;
  padding-right: 25px;
  padding-top:40px;
  ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #606eea;
    border-radius: 14px 0px 0px 14px;
  }
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

export const AgeData=styled.div`
display:flex;
position: relative;
align-items:center;
 h4 {
  position: absolute;
  margin-left:80%;
  padding:10px 20px;
  font-size: 14px;
  background: linear-gradient(215.2deg, #8BDD59 -12.1%, #DCF089 101.51%);
  border-radius: 14px;
 }
`

export const TitleData = styled.div`
  display: flex; 
  align-items: center; 
  justify-content: left;
  /* margin-left: 15px; */
  img {
    border-radius: 14px;
    width: 40px;
    height: 40px;
    margin-right: 15px;
  }
`

export const DefaultImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 14px;
  background: linear-gradient(215.2deg, #C7EEFF -12.1%, #FCA9EA 101.51%);
  margin-right: 15px;
`

