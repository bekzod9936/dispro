import styled from "styled-components";
import {ReactComponent as PointsSvg} from 'assets/icons/points_services.svg'
import {ReactComponent as DiscountSvg} from 'assets/icons/discount_services.svg'


interface IProps {
    isEven: boolean
}

export const Wrapper = styled.div`
    padding: 12px 35px 12px 20px;
    background-color: ${({isEven}: IProps) => isEven ? "rgba(96, 110, 234, 0.1)" : ""};
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

`

export const Left = styled.div`
    display: flex;
    align-items: center;

    img {
        width: 52px;
        height: 52px;
        border-radius: 14px;
        object-fit: cover;
        display: block;
        margin-right: 28px;
    }

    .title {
        margin-right: 45px;
        width: 200px;

        h5 {
            font-size: 18px;
            line-height: 21.09px;
            color: #223367;
            font-weight: 500;
        }

        p {
            font-size: 16px;
            line-height: 18.75px;
            color: #8F8F8F;
            font-weight: 300;
            margin-top: 6px;
        }

        p.zeroCount {
            color: #FF5E68 !important;
        }
    }

    .info {
       &_child {
            display: flex;
            align-items: center;

            p {
                font-size: 16px;
                font-weight: 18.75px;
                color: #8F8F8F;
                margin-left: 10px;
            }
       }
    }

    
`

export const Right = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    p {
        font-size: 22px;
        line-height: 25.78px;
        font-weight: 300;
        color: #1F1A3E;
    }

    span {
        color: #1F1A3E;
        font-weight: 300;
        font-size: 16px;
        line-height: 18.75px;
        text-decoration: line-through;
        margin-top: 4px;
    }
`

//icons
export const PointsIcon = styled(PointsSvg)``
export const DiscountIcon = styled(DiscountSvg)``