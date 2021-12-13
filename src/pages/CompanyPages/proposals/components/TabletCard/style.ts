import styled from "styled-components";
interface IProps {
    isActive: boolean
}
export const Wrapper = styled.div`
    padding: 20px;
    background-color: ${({ isActive }: IProps) => isActive ? "rgba(96, 110, 234, 0.1)" : "#fff"};
    border-radius: 14px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    cursor: pointer;
    height: max-content;
    overflow-x: hidden;
    /* max-width: 354px;
    width: 100%; */
    h1.statsTitle {
        font-size: 16px;
        line-height: 18.75px;
        color: #C7C7C7;
        margin: 20px 0 10px 0;
    }
    .image {
        position: relative;
        margin-bottom: 15px;    
        max-width: 314px;
        width: 100%;
        
        img {
            width: 100%;
            border-radius: 14px;
            object-fit: cover;
        }
        span.imageText {
            position: absolute;
            top: 8px;
            left: 10px;
            color: #fff;
            border-radius: 14px;
            backdrop-filter: blur(1px);
            background-color: rgba(78, 78, 78, 0.5);
            padding: 5px 10px;
            font-size: 14px;
            line-height: 16.41px;
        }
    }
    .content {
        h5 {
            font-size: 18px;
            line-height: 21.09px;
            color: #223367;
            margin-bottom: 5px;
            font-weight: 400;
        }
        h6 {
            font-size: 14px;
            line-height: 16.41px;
            color: #8F8F8F;
            font-weight: 400;
            margin-bottom: 12px;
        }
        p.description {
            font-size: 14px;
            line-height: 16.41px;
            color: #223367;
            margin-bottom: 20px;
            margin-top: 8px;
            font-weight: 300;
        }
        span {
            color: #223367;
            margin-bottom: 9px;
            font-weight: 300;
            font-size: 14px;
            line-height: 16.41px;
            display: block;
        }
        div.categories {
            color: #223367;
            font-weight: 300;
            font-size: 14px;
            line-height: 16.41px;
            b {
                color: #223367;
                font-weight: 300;
                font-size: 14px;
                line-height: 16.41px;
            }
        }
    }
`