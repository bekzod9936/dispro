import styled from 'styled-components'

export const Header = styled.div`
    h5 {
        font-size: 16px;
        line-height: 18.75px;
        font-weight: 500;
        color: #223367;
        margin-bottom: 5px;
    }

    p {
        color: #C4C4C4;
        font-size: 14px;
        line-height: 16.41px;
        margin-bottom: 25px;
    }

    margin-bottom: 20px;
`

export const ErrorMessage = styled.div`
    font-size: 16px;
    color: #ff5e68;
    font-weight: 300;
    margin-top: 5px;
    margin-left: 5px;
`

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 200px);
    grid-template-rows: auto;
    gap: 20px;
    margin-bottom: 35px;
`