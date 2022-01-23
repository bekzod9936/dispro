import styled from "styled-components";
import { ReactComponent as CancelSvg } from 'newassets/icons/cancel.svg'
import { ReactComponent as DeleteSvg } from 'newassets/icons/delete.svg'
export const Wrapper = styled.form`
    padding: 34px 73px 35px 74px;

    .header {
        h4 {
            font-size: 18px;
            line-height: 21.09px;
            font-weight: 500;
            margin-bottom: 15px;
            color: #223367;
            max-width: 310px;
            width: 100%;

        }

        p {
            color: #223367;
            font-size: 14px;
            line-height: 16.41px;
            font-weight: 300;
            max-width: 335px;
            width: 100%;
        }
      
    }

    .buttons {
            margin-top: 30px;
            display: flex;
            width: 100%;
            justify-content: flex-end;

        }
`

export const styles = {
    button: {
        cancel: {
            style: {
                color: '#223367',
                bgcolor: '#fff',

            },
            margin: {
                desktop: '0 20px 0 0', laptop: '0 20px 0 0'
            }
        },
        delete: {
            style: {
                color: '#fff',
                bgcolor: '#FF5E68'
            },
            width: {
                minwidth: 163
            }
        }
    },
    modal: {
        width: {
            maxwidth: 473,
            width: "100%"
        }
    }
}


//icons 


export const CancelIcon = styled(CancelSvg)``
export const DeleteIcon = styled(DeleteSvg)``