import { Tooltip, withStyles } from "@material-ui/core";
import styled from "styled-components";
import { ReactComponent as QuestionMarkSvg } from 'assets/icons/questionMark.svg'

export const Wrapper = styled.div`
    margin-bottom: 25px;
`

export const Content = styled.div`
    display: flex;
    align-items: center;
`

export const ErrorMessage = styled.div`
    font-size: 16px;
    color: #ff5e68;
    font-weight: 300;
    margin-top: 5px;
`

export const LightToolTip = withStyles(() => ({
    tooltip: {
        backgroundColor: "#fff",
        color: "#223367",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.12)",
        fontSize: 14,
        padding: '11px 12px',
        borderRadius: 14,
        fontWeight: 300,
        cursor: 'pointer',
        textAlign: 'center'
    },
    arrow: {
        color: "#fff"
    }
}))(Tooltip) 


//icons
export const QuestionMarkIcon = styled(QuestionMarkSvg)``
