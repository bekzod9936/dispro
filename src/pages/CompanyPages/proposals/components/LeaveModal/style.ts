import styled from "styled-components"
import { device } from "styles/device"
import {ReactComponent as ExitSvg} from 'assets/icons/logout.svg'
export const Wrapper = styled.div`
  padding: 25px 25px 20px 25px;
  max-width: 363px;
  width: 100%;
  h4 {
      font-size: 18px;
      line-height: 21.09px;
      margin-bottom: 15px;
      font-weight: 500;
      color: #223367;

  }

  p {
    font-size: 16px;
    font-weight: 300;
    margin-bottom: 25px;
    line-height: 18.75px;
    // text-align: justify;
    
  }

  div.buttons {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`


export const ExitIcon = styled(ExitSvg)``