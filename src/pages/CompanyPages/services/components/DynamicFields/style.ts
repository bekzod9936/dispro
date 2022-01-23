import styled from "styled-components";
import { ReactComponent as RemoveInputSvg } from "assets/icons/removeInput.svg"
import { IconButton } from "@material-ui/core";
interface Props {
    isMultiple: boolean,
    marginBottom?: string
}

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(${({isMultiple}: Props) => isMultiple ? 3 : 1}, 1fr);
    width: 100%;
    margin-bottom: ${({marginBottom}: Props) => marginBottom || '25px'};
    gap: 15px;
`

export const useStyles = () => {
    return {
        input: {
            style(isDescription: boolean) {
                return isDescription ? {
                    height: { desktop: 124, laptop: 124 },
                    inpadding: "10px 15px"
                } : undefined
            }
        }
    }
}


//icons
export const RemoveInputIcon = styled(RemoveInputSvg)``

export const ButtonIcon = styled(IconButton)`
    padding: 8px;
    transform: translateY(-1px);
    margin-left: 5px;
`
export const MockIcon = styled.div`
    height: 23px;
    width: 23px;
    pointer-events: none;`