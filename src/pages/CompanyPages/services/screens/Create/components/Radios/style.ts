import { Tooltip, withStyles } from "@material-ui/core";
import styled from "styled-components";
import { ReactComponent as QuestionMarkSvg } from 'assets/icons/questionMark.svg'

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 25px;
`

export const LightToolTip = withStyles(() => ({
    tooltip: {
        backgroundColor: "#fff",
        color: "#223367",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.12)",
        fontSize: 14,
        padding: '11px 12px',
        borderRadius: 14,
        fontWeight: 300
    },
    arrow: {
        color: "#fff"
    }
}))(Tooltip) 


//icons
export const QuestionMarkIcon = styled(QuestionMarkSvg)``
