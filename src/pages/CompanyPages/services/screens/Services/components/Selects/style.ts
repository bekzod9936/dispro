import { ReactComponent as MeasurementSvg } from 'assets/icons/measurementUnit.svg'
import { ReactComponent as ServicesSvg } from 'assets/icons/services.svg'
import { ReactComponent as SectionsSvg } from 'assets/icons/sections.svg'
import styled from 'styled-components'

export const Flex = styled.div`
    display: flex;

`

export const LeftField = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

//icons

export const MeasurementIcon = styled(MeasurementSvg)``
export const ServicesIcon = styled(ServicesSvg)``
export const SectionsIcon = styled(SectionsSvg)``