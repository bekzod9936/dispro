import styled from "styled-components";
import { ReactComponent as HideSvg } from 'newassets/icons/hide.svg'

export const Wrapper = styled.div`
    padding: 35px 0;
    width: 100%;
    display: flex;
    justify-content: center;

    .container {
        max-width: 330px;
        width: 100%;

        h4 {
            font-size: 18px;
            color: #223367;
            line-height: 21.09px;
            margin-bottom: 15px;
            width: 276px;
            font-weight: 500;
        }

        p {
            font-size: 14px;
            line-height: 16.41px;
            color: #223367;
            font-weight: 300;
            
        }

        .footer {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            margin-top: 30px;
        }
    }

`

export const styles = {
    modal: {
        maxwidth: 475,
        width: "100%",
    },
    cancelButton: {
        margin: {
            desktop: '0 20px 0 0', laptop: '0 20px 0 0'
        }
    },
    button: {
        minwidth: 150
    }
}


//icons 
export const HideIcon = styled(HideSvg)`
    path {
        fill: #fff;
    }
`