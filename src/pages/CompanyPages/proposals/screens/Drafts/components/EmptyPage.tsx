import {ReactComponent as EmptyPageImg} from 'assets/images/ProposalsEmptyPage.svg'
import styled from 'styled-components'
export const EmptyPage = () => {
    return (
        <Wrapper>
            <EmptyPageImg />
            <p>Тут будут находиться ваши спецпредложения</p>
        </Wrapper>
    )
}



const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 80px;
    p {
        font-size: 18px;
        line-height: 150%;
        color: #223367;
        margin-top: 30px;
    }
`