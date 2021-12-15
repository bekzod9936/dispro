import styled from "styled-components";
import { ReactComponent as ExitSvg } from "assets/icons/exit.svg"
import { ReactComponent as LanguageSvg } from "assets/icons/language.svg";
import { ReactComponent as CancelSvg } from 'assets/icons/cancelButton.svg'
import { ReactComponent as SaveSvg } from 'assets/icons/save.svg'

export const Wrapper = styled.div`
    padding: 30px 40px;
    width: 100%;

    .header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: 25px;
        width: 100%;

        h3 {
            font-size: 22px;
            font-weight: 25.78px;
            color: #223367;
            width: 265px;
        }
    }

    .main {
        margin-bottom: 35px;
    }

    .footer {
        display: flex;
        width: 100%;
        justify-content: flex-end;
        align-items: center;
    }
`

export const useStyles = () => {
    return {
        modal: {
            style: {
              maxwidth: 480,
              width: "100%",
            }
        },
        input: {
            style: {
              fontSize: {
                desktop: 18,
                laptop: 18,
              },
              bgcolor: "#eff0fd",
              border: "none",
              placeholdercolor: "#223367",
              inpadding: "2px 10px 2px 75px",
              placewieght: "500",
            }
        },
        button: {
            style: {
                bgcolor: "#fff", 
                color: "#223367", 
                weight: 500
            },
            margin: {
                desktop: "0 20px 0 0", 
                laptop: "0 20px 0 0"
            }
        }
    }
}

//icons 
export const CloseIcon = styled(ExitSvg)``
export const LanguageIcon = styled(LanguageSvg)``
export const CancelIcon = styled(CancelSvg)``
export const SaveIcon = styled(SaveSvg)``
