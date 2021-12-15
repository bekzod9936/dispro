import styled from "styled-components"
import {ReactComponent as CancelSvg} from 'assets/icons/cancelButton.svg'
import {ReactComponent as SaveSvg} from 'assets/icons/save.svg'

export const cancelButtonStyle = {
    margin: {
        desktop: '0 20px 0 0',
        laptop: '0 20px 0 0'
    },
    button: {
        bgcolor: '#fff',
        color: '#223367'
    }
}

//icons 

export const CancelIcon = styled(CancelSvg)``
export const SaveIcon = styled(SaveSvg)``