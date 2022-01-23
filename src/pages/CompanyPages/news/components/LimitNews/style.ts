import styled from 'styled-components';
import { device } from "styles/device"

export const WrapperModal = styled.div`
    padding: 20px 30px;
    width:500px;
    position: relative;
    a {
        text-decoration: none;
    }
    h3 {
        font-size: 22px;
        line-height: 26px;
        margin-bottom: 10px;
        color: #223367;

    }
    p {
        font-size: 18px;
        font-weight: 300;
        color: #223367;
        margin-bottom: 25px;
    }
    
    @media (max-width: ${device.mobile}) {
      max-width:300px;
      padding: 20px 15px;
        h3 {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 15px;
            color: #223367;
        }
        p {
          font-size: 14px;
          color: #223367;
          font-weight: 300;
        }
    }
`
export const CloseButton = styled.div`
    position: absolute;
    right: 25px;
    top: 15px;
    cursor: pointer;
`
export const Buttons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content:center;

  align-items: center;
  .upside {
    @media (max-width: 347px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    
  }
  }
`