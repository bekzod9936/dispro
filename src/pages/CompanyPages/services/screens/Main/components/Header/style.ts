import styled from "styled-components";

import { ReactComponent as SearchSvg } from 'assets/icons/searchblue.svg';
import { device } from "styles/device";



export const Wrapper = styled.div`
    
`

export const Nav = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 35px;

    p {
        font-size: 14px;
        line-height: 16.41px;
        color: #8F8F8F;
        margin-left: 20px;
        display: flex;
        align-items: center;
        font-weight: 500;

        b {
            margin-right: 20px;
            font-size: 22px;
        }
    }

    @media (max-width: ${device.laptop}) {
        margin-bottom: 20px;
    }

`

export const useStyles = () => {
    return {
        input: {
            style: {
                border: "none",
                shadow: "0px 4px 4px rgba(0, 0, 0, 0.04)",
                height: {
                    laptop: 45
                }
            },
            margin: {
                desktop: "0 0 0 24px", laptop: '0 0 0 20px'
            },
            width: {
                maxwidth: 500,
            }
        },
    }
}


//icons


export const SearchIcon = styled(SearchSvg)`
    margin-left: 34px;
`
