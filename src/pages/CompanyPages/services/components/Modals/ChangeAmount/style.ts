import styled from "styled-components";
import { ReactComponent as CloseSvg } from 'newassets/icons/close.svg'
import { ReactComponent as CancelSvg } from 'newassets/icons/cancel.svg'

export const Wrapper = styled.div`
    padding: 30px 40px;

    .header {
        margin-bottom: 15px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        h4 {
            font-size: 22px;
            line-height: 25.75px;
            color: #223367;
        }
    }

    .main {
        width: 100%;

        &_inputLabel {
            font-size: 16px;
            line-height: 18.75px;
            font-weight: 500;
            color: #8F8F8F;
            margin-right: 20px;
        }

        .buttons {
            display: flex;
            width: 100%;
            justify-content: flex-end;
        }
    }
`

export const buttonStyles = {
    cancel: {
        margin: {
            desktop: "0 20px 0 0",
            laptop: "0 20px 0 0",
        },
        style: {
            bgcolor: "#fff",
            color: "#223367"
        }
    },
    modal: {
        width: {
            maxwidth: 520,
            width: '100%'
        }
    },
    input: {
        margin: {
            desktop: '0 0 35px 0',
            laptop: '0 0 35px 0'
        }
    }
}


//icons

export const CloseIcon = styled(CloseSvg)``
export const CancelIcon = styled(CancelSvg)``