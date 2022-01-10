import styled from "styled-components";
import {ReactComponent as PointsSvg} from 'assets/icons/points_services.svg'
import {ReactComponent as DiscountSvg} from 'assets/icons/discount_services.svg'
import { ReactComponent as EyeSvg } from 'newassets/icons/eye.svg'
import { ReactComponent as ScrollTopSvg } from 'newassets/icons/scroll_top.svg'
import { ReactComponent as ShowSvg } from 'newassets/icons/show.svg'
import { IconButton } from "@material-ui/core";
import { device } from "styles/device";

interface IProps {
    isEven?: boolean
    isItCurrentItem?: boolean,
    isHiddenItem?: boolean
}

export const Wrapper = styled.div`
    background-color: ${({isEven, isItCurrentItem}: IProps) => isItCurrentItem ? "rgba(96, 110, 234, 0.88)" : isEven ? "rgba(96, 110, 234, 0.1)" : "#fff"};
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer !important;

    .item {
        padding: 12px 35px 12px 18px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        .left {
            display: flex;
            align-items: center;

            img {
                width: 52px;
                height: 52px;
                border-radius: 14px;
                object-fit: cover;
                display: block;
                margin-right: 28px;
                border: 2px solid #fff;
            }

            .title {
                margin-right: 45px;
                width: 200px;

                h5 {
                    font-size: 18px;
                    line-height: 21.09px;
                    color: ${({ isItCurrentItem, isHiddenItem }: IProps) => isItCurrentItem ? "#fff" : isHiddenItem ? "#C4C4C4" :"#223367"};
                    font-weight: 500;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow-x: hidden;
                }

                p {
                    font-size: 16px;
                    line-height: 18.75px;
                    color: ${({ isItCurrentItem, isHiddenItem }: IProps) => isItCurrentItem ? "#fff" : isHiddenItem ? "#C4C4C4" : "#8F8F8F"};
                    font-weight: 300;
                    margin-top: 6px;
                }

                p.zeroCount {
                    color: ${({ isItCurrentItem, isHiddenItem }: IProps) => isItCurrentItem ? '#fff' : isHiddenItem ? "#C4C4C4" : "#FF5E68"};
                }
            }

            .info {
                &_child {
                        display: flex;
                        align-items: center;

                        p {
                            font-size: 16px;
                            font-weight: 18.75px;
                            color: ${({ isItCurrentItem }: IProps) => isItCurrentItem ? "#fff" : "#8F8F8F"};
                            margin-left: 10px;
                        }
                }
                 
                &_hide {
                    display: flex;
                    align-items: center;

                    svg {
                        path {
                            fill: ${({isItCurrentItem}: IProps) => isItCurrentItem ? "#fff" : "#A3A3A3"}
                        }
                    }

                    p {
                        font-size: 16px;
                        font-weight: 18.75px;
                        color: ${({ isItCurrentItem }: IProps) => isItCurrentItem ? "#fff" : "#A3A3A3"};
                        margin-left: 10px;
                    }
                }
            }
    }

        .right {
            display: flex;
            flex-direction: column;
            align-items: flex-end;

            p {
                font-size: 22px;
                line-height: 25.78px;
                font-weight: 300;
                color: ${({isHiddenItem}: IProps) => isHiddenItem ? "#C4C4C4" : "#1F1A3E"};
            }

            span {
                color: ${({isHiddenItem}: IProps) => isHiddenItem ? "#C4C4C4" : "#1F1A3E"};
                font-weight: 300;
                font-size: 16px;
                line-height: 18.75px;
                text-decoration: line-through;
                margin-top: 4px;
            }
        }
    }
    

    .icon_menu {
        display: flex;
        align-items: center;
        margin-right: 35px;

        .mr {
            margin-right: 13px;
        }
   
    }

    @media (max-width: ${device.laptop}) {
        .item {
            padding: 10px 20px 10px 10px;

            .left {

                img {
                    width: 45px;
                    height: 45px;
                    margin-right: 15px;
                }

                .title {
                    margin-right: 20px;
                    width: 160px;
                }


            }
        }
    }

    @media (max-width: 1250px) {
        .item {

            .right {
                p {
                    font-size: 16px;
                    line-height: 18.75px;
                }

                span {
                    font-size: 14px;
                    line-height: 15.09px;
                }
            }
        }
    }

    @media (max-width: 1200px) {
        .item {
            .left {
                .info {
                    display: none;
                }
            }
        }
    }

    @media (max-width: 1030px) {
        .item {
            .left {
                .title {
                    width: 120px;
                }
            }
        }
    }

`

export const ButtonIcon = styled(IconButton)`
    border-radius: 2px;
    width: 40px;
    height: 40px;
    border: 1px solid #fff;
    padding: 0;
`


//icons
export const PointsIcon = styled(PointsSvg)`
    path {
        fill: ${({isItCurrentItem}: IProps) => isItCurrentItem ? "#fff" : ""};
    }
`
export const DiscountIcon = styled(DiscountSvg)`
    path {
        stroke: ${({isItCurrentItem}: IProps) => isItCurrentItem ? "#fff" : ""};
    }
`

export const EyeIcon = styled(EyeSvg)``
export const ScrollToTopIcon = styled(ScrollTopSvg)``
export const ShowIcon = styled(ShowSvg)``