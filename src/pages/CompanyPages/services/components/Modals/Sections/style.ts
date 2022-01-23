import styled from "styled-components";
import { ReactComponent as ExitSvg } from "assets/icons/exit.svg"
import { ReactComponent as CreateSectionSvg } from "assets/icons/createSection.svg"
import { ReactComponent as CancelSvg } from "assets/icons/cancelButton.svg"
import { IconButton } from "@material-ui/core";


export const Wrapper = styled.form`
    max-width: 520px;
    width: 100%;
    padding: 30px 40px;
`

export const Header = styled.div`
    width: 100%;
    margin-bottom: 30px;

    .nav {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;

        h1 {
            color: #223367;
            font-size: 22px;
            line-height: 25.78px;
        }
    }

    p {
        font-size: 14px;
        line-height: 16.41px;
        color: #223367;
        font-weight: 300;
    }
`
export const Main = styled.div`
    margin-bottom: 30px;
    max-height: 248px;
    overflow-y: auto;
    padding-right: 5px;
    ::-webkit-scrollbar {
        width: 4px;
    }
    ::-webkit-scrollbar-track {
        background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background: #606eea;
        border-radius: 6px 0px 0px 6px;
    }
`

export const Footer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

export const ButtonIcon = styled(IconButton)`
    margin-right: 5px;
`


export const useStyles = () => {
    return {
        modal: {
            style: {
                maxwidth: 520,
                width: "100%",
              }
        },
        cancelButton: {
            margin: {
                desktop: "0 15px 0 0",
                laptop: "0 15px 0 0",
            },
            style: {
                color: "#223367",
                bgcolor: "#fff",
                weight: 500
            }
        },
        button: {
            width: {
                minwidth: 165
            }
        },
        input: {
            margin: {
                desktop: "0 0 25px 0", laptop: "0 0 25px 0"
            }
        }
    }
}



//icons
export const CloseIcon = styled(ExitSvg)``

export const CreateSectionIcon = styled(CreateSectionSvg)``

export const CancelIcon = styled(CancelSvg)``
