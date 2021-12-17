import useWindowWidth from "services/hooks/useWindowWidth";
import styled from "styled-components";

import {ReactComponent as CancelSvg} from 'assets/icons/cancelButton.svg'
import {ReactComponent as MobileCancelSvg} from 'assets/icons/exit_mini.svg'
import {ReactComponent as ExitSvg} from 'assets/icons/logout.svg'


export const Wrapper = styled.div`
    padding: 25px 25px 20px 25px;
    max-width: 450px;
    width: 100%;
    
    h4 {
        font-size: 20px;
        line-height: 23.09px;
        margin-bottom: 15px;
        font-weight: 600;
        color: #223367;

    }

    p {
        font-size: 18px;
        font-weight: 400;
        margin-bottom: 25px;
        line-height: 25.75px;
    }

    div.buttons {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
    }
`

//icons 
export const CancelIcon = styled(CancelSvg)``
export const MobileCancelIcon = styled(MobileCancelSvg)``
export const ExitIcon = styled(ExitSvg)``

export const useButtonStyle = () => {
    const {width} = useWindowWidth()

    return {
        margin: {
            desktop: "0 20px 0 0",
            laptop: "0 20px 0 0"
        },
        style: width > 1000 ? {
            bgcolor: "#fff", color: "#223367"
        } : {
            bgcolor: "rgba(96, 110, 234, 0.1)", color: "#606EEA"
        }
    }
}