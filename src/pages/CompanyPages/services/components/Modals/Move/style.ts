import styled from "styled-components";
import { ReactComponent as MenuSvg } from "newassets/icons/menu.svg";

export const Wrapper = styled.div`
    padding: 30px 40px;
    width: 100%;

    .nav {
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin-bottom: 30px;
        align-items: center;

        h4 {
            font-size: 22px;
            color: #223367;
            line-height: 25.78px;

        }
    }

    .footer {
        margin-top: 35px;
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
`

export const styles = {
    modal: {
        maxwidth: 520,
        width: '100%'
    },
    cancelButton: {
        margin: {
            desktop: '0 20px 0 0',
            laptop: '0 20px 0 0'
        }
    },
    select: {
        bgcolor: "rgba(96, 110, 234, 0.1)",
        placeholdercolor: "#223367",
        placewieght: "500",
        border: "none",
        inpadding: "2px 10px 2px 75px",
        fontSize: {
            desktop: 18,
            laptop: 18,
        },
    }
}

//icons 

export const MenuIcon = styled(MenuSvg)``