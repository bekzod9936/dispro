import styled from "styled-components";
interface IProps {
    maxWidth?: string
}
export const Wrapper = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    border-radius: 14px;
    padding: 25px 40px;
    max-width: ${({ maxWidth }: IProps) => maxWidth || "370px"};
    width: 100%;
    min-height: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
`

export const UpSide = styled.div`
    display: flex;
    align-items: center;
    h5 {
        font-size: 18px;
        font-weight: 500;
        color: #223367;
        margin-left: 15px;
        line-height: 21.09px;
    }
`

export const Level = styled.div`
    color: #223367;
    font-size: 14px;
    line-height: 16.41px;
    display: flex;
    align-items: flex-end;
    margin-bottom: 10px;
    &:not(:last-child) {
        margin-right: 15px;
    }
    span {
        font-weight: 700;
        padding: 6px 11px;
        background: rgba(96, 110, 234, 0.3);
        border-radius: 12px;
    }
`

export const DownSide = styled.div`
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
`