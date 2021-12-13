import styled from "styled-components";
import { ReactComponent as MeasurementSvg } from 'assets/icons/measurementUnit.svg'
import { ReactComponent as ServicesSvg } from 'assets/icons/services.svg'
import { ReactComponent as SectionsSvg } from 'assets/icons/sections.svg'
import { ReactComponent as QuestionMarkSvg } from 'assets/icons/questionMark.svg'
import { withStyles } from "@material-ui/styles";
import { Tooltip } from "@material-ui/core";


export const Wrapper = styled.div`
    padding: 30px 60px 25px 45px;


`

export const Form = styled.form`
    width: 100%;
    background-color: #fff;
    border-radius: 14px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    display: flex;
    justify-content: center;
    padding: 30px 0 60px 0;
`

export const Container = styled.div`
    max-width: 800px;
    width: 100%;

`

export const ToggleBlock = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 25px;

    p {
        font-size: 16px;
        color: #223367;
        margin: 0 10px 0 15px;
        line-height: 18.75px;
    }
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

export const MeasurementIcon = styled(MeasurementSvg)``
export const ServicesIcon = styled(ServicesSvg)``
export const SectionsIcon = styled(SectionsSvg)``
export const QuestionMarkIcon = styled(QuestionMarkSvg)``