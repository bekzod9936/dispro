import styled from "styled-components"

import { ReactComponent as CreateSvg } from 'assets/icons/services/create.svg';
import { ReactComponent as ArrowDownSvg } from 'assets/icons/services/createArrowDown.svg';


export const PopoverList = styled.div`
    border-radius: 14px;
    background-color: #fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    width: 233px;
    padding: 15px 0;
`
export const PopoverItem = styled.div`
    cursor: pointer;
    transition: 200ms all;
    padding: 15px 25px;
    font-size: 16px;
    line-height: 18.75px;
    color: #223367;
    text-decoration: none !important;

&:hover {
    background-color: rgba(96, 110, 234, 0.1);
}
`
export const useStyles = () => {
    return {
        popover: {
            button: {
                style: {
                    height: {
                        desktop: 60
                    },
                    fontSize: {
                        desktop: 18
                    },
                    weight: 500,
                    color: "#223367",
                    bgcolor: "#fff",
                    shadow: "0px 4px 4px rgba(0, 0, 0, 0.04)"
                }
            }
        }
    }
}

//icons
export const CreateIcon = styled(CreateSvg)``

export const ArrowDownIcon = styled(ArrowDownSvg)`
    margin-left: 50px;
`