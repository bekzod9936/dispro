// import DatePicker from "react-multi-date-picker"
// import styled from "styled-components"
// import { device } from "styles/device"
// import { ReactComponent as TextArea } from 'assets/icons/IconsInfo/textarea.svg';
// export const PushWrapper = styled.div`
//     width: 100%;
//     margin-bottom: 25px;
// `
// export const Header = styled.div`
//     margin-top: 15px;
//     p {
//         font-size: 14px;
//         color: #C4C4C4;
//         margin-bottom: 20px;
//     }
// `
// export const TextAreaIcon = styled(TextArea)``;
// export const FormRow = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   width: 100%;
// `;

// export const WrapperModal = styled.div`
//    padding-right:45px;
//    padding-top:10px;
//     position: relative;
//     h3 {
//       font-size: 22px;
//         line-height: 26px;
//         margin-bottom: 10px;
//         color: #223367;
//     }
 
// `

// export const CloseButton = styled.div`
//     position: absolute;
//     right: 15px;
//     top: 15px;
//     cursor: pointer;
// `

// export const WrapArea = styled.div`
//   display: flex;
//   flex: 1;
//   align-items: flex-end;
//   margin: 65px 10px 0 0;
//   @media (max-width: ${device.mobile}) {
//     margin: 55px 5px 0 0;
//   }
//   @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
//     margin: 30px 10px 0 0;
//   }
//   @media (min-width: ${device.laptop}) {
//     margin: 90px 10px 0 0;
//   }
// `;

// export const PushBlock = styled.div`
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     width: 100%;
//     margin-bottom: 20px;
//     h6 {
//         font-size: 16px;
//         color: #223367;
//         font-weight: 500;
//     }
// `
// export const LeftSide = styled.div`
//     width: 45%;
//     @media (max-width: 1250px) {
//       width: 48%;
//     }
   
// `
// export const RightSide = styled.div`
//     width: 40%;
//     @media (max-width: 1250px) {
//       width: 48%;
//     }
// `
// export const Container = styled.div`
//     width: 100%;
//     display: flex;
//     justify-content: space-between;
//     padding: 20px 60px 20px 0;
//     @media (max-width: ${device.laptop}) {
//       padding-right: 20px;
//     }
    
// `

// export const Wrapper = styled.div`
//     width: 100%;
//     height: 100%;
// `

// export const UpSide = styled.div`
//     height: 80%;
//     scroll-behavior: auto;
//     display: flex;
//     flex-direction: column;
//     overflow-y: scroll;
//     overflow-x: hidden;
//     ::-webkit-scrollbar {
//     width: 7px;
//     }
//     ::-webkit-scrollbar-track {
//         background-color: transparent;
//     }
//     ::-webkit-scrollbar-thumb {
//         background: #606eea;
//         border-radius: 14px 0px 0px 14px;
//     }
// `


// export const ImageBlock = styled.div`
// position: relative;
// display: flex;
// justify-content: center;
// align-items: center;
// width: max-content;
// img {
//     margin-bottom: 25px;
//     border-radius: 14px;
//     width: 250px;
//     margin-top: 15px;
// }
// svg {
//     position: absolute;
//     cursor: pointer;
//     z-index: 20;
//     opacity: 0;
   
// }
// &:hover{
//     svg {
//         opacity: 1;
//     }
//     &::before{
//         opacity: 0.25;
//     }
// }
// &::before{
//     content: "";
//     position: absolute;
//     left: 0;
//     top: 0;
//     width: 100%;
//     height: 100%;
//     background-color: #ffffff;
//     opacity: 0;
//     transition: 200ms all;
// }
// `
// export const DownSide = styled.div`
//     border-top: 1px solid #606EEA;
//     padding: 25px 0;
//     background-color: white;
//     width: 100%;
//     box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
//     display: flex;
//     justify-content: flex-start;
//     height: 25%;
//     @media (max-width: 1150px) {
//       padding-right: 20px;
//     }
// `
// export const Form = styled.form`
//     background-color: #FFFFFF;
//     width: 95%;
//     height: 100%;
//     box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
//     border-radius: 14px;
//     padding: 35px 110px 0 110px;
//     @media (max-width: ${device.laptop}) {
//       padding: 20px 25px;
//     }
//     @media (max-width: 1150px) {
//       padding-right: 0;
//     }
//     overflow: hidden;
//     min-height: 500px;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
// `

// export const UploadButton = styled.div`
//     background: rgba(96, 110, 234, 0.1);
//     input {
//         display: none;
//     }
//     padding: 14px 25px;
//     cursor: pointer;
//     width: max-content;
//     display: flex;
//     align-items: center;
//     box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
//     border-radius: 14px;
//     margin-bottom: 10px;
//     label {
//         font-size: 18px;
//         font-weight: 500;
//         cursor: pointer;
//         margin-right: 10px;
//         color: #606EEA;

//     }

// `

// export const ErrorMessage = styled.span`
//   font-weight: 300;
//   color: #ff5e68;
//   overflow-wrap: normal;
//   display: flex;
//   margin-top: 5px;

//   font-size: ${({ labelStyle }: any) =>
//     labelStyle?.fontSize?.laptop
//       ? `${labelStyle?.fontSize?.laptop}px`
//       : '14px'} !important;

//   @media (max-width: ${device.mobile}) {
//     font-size: ${({ labelStyle }: any) =>
//     labelStyle?.fontSize?.mobile
//       ? `${labelStyle?.fontSize?.mobile}px`
//       : '14px'} !important;
//     margin-top: 3px;
//   }
//   @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
//     font-size: ${({ labelStyle }: any) =>
//     labelStyle?.fontSize?.planshet
//       ? `${labelStyle?.fontSize?.planshet}px`
//       : '14px'} !important;
//     margin-top: 3px;
//   }
//   @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
//     font-size: ${({ labelStyle }: any) =>
//     labelStyle?.fontSize?.laptop
//       ? `${labelStyle?.fontSize?.laptop}px`
//       : '14px'} !important;
//     flex-direction: column;
//     margin-top: 3px;
//   }
//   @media (min-width: ${device.laptop}) {
//     font-size: ${({ labelStyle }: any) =>
//     labelStyle?.fontSize?.desktop
//       ? `${labelStyle?.fontSize?.desktop}px`
//       : '16px'} !important;
//     margin-top: 5px;
//   }
// `;


// export const PeriodWrapper = styled.div`
//   padding: 30px 40px 25px 30px;
  
//   background: #FFFFFF;
//   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
//   border-radius: 14px;
//   width: max-content;
//   height: 400px;
//   overflow: auto;
//   h5 {
//     font-size: 22px;
//     color: #223367;
//     line-height: 26px;
//     margin-bottom: 30px;
//   }p {
//     color: #C7C7C7;
//     font-size: 16px;
//     font-weight: 700;
//     margin-bottom: 10px;
//   }
// `
// export const WrapChecks = styled.div`
//   display: flex;
//   justify-content: center;
//   width: 100%;
//   flex: 1;
//   margin-left: 15px;
//   margin-top: 15px;
// `;

// export const WrapCheck = styled.div`
//   display: flex;
//   justify-content: center;
//   width: 100%;
//   flex: 1;
//   flex-direction: column;
// `;

// export const PreviewMessage = styled.div`
//   display: flex;
//   align-items: center;
//   margin-top: 40px;
//   svg {
//     margin-right: 20px;
//   }
//   p {
//     font-size: 16px;
//     line-height: 18.75px;
//     color: #223367;
//     width: 258px;
//     font-weight: 300;
//   }
// `

// export const LeaveModal = styled.div`
//   padding: 20px;
//   max-width: 450px;
//   width: 100%;
//   p {
//     font-size: 18px;
//     font-weight: 500;
//     margin-bottom: 20px;
//   }
//   div.buttons {
//     display: flex;
//     width: 100%;
//     justify-content: flex-end;
//     align-items: center;
//   }
// `
// import DatePicker from "react-multi-date-picker"
// import styled from "styled-components"
// import { device } from "styles/device"
// import { ReactComponent as TextArea } from 'assets/icons/IconsInfo/textarea.svg';
// export const PushWrapper = styled.div`
//     width: 100%;
//     margin-bottom: 25px;
// `
// export const Header = styled.div`
//     margin-top: 15px;
//     p {
//         font-size: 14px;
//         color: #C4C4C4;
//         margin-bottom: 20px;
//     }
// `
// export const TextAreaIcon = styled(TextArea)``;
// export const FormRow = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   width: 100%;
// `;

// export const WrapperModal = styled.div`
//    padding-right:45px;
//    padding-top:10px;
//     position: relative;
//     h3 {
//       font-size: 22px;
//         line-height: 26px;
//         margin-bottom: 10px;
//         color: #223367;
//     }
 
// `

// export const CloseButton = styled.div`
//     position: absolute;
//     right: 15px;
//     top: 15px;
//     cursor: pointer;
// `

// export const WrapArea = styled.div`
//   display: flex;
//   flex: 1;
//   align-items: flex-end;
//   margin: 65px 10px 0 0;
//   @media (max-width: ${device.mobile}) {
//     margin: 55px 5px 0 0;
//   }
//   @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
//     margin: 30px 10px 0 0;
//   }
//   @media (min-width: ${device.laptop}) {
//     margin: 90px 10px 0 0;
//   }
// `;

// export const PushBlock = styled.div`
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     width: 100%;
//     margin-bottom: 20px;
//     h6 {
//         font-size: 16px;
//         color: #223367;
//         font-weight: 500;
//     }
// `
// export const LeftSide = styled.div`
//     width: 45%;
//     @media (max-width: 1250px) {
//       width: 48%;
//     }
   
// `
// export const RightSide = styled.div`
//     width: 40%;
//     @media (max-width: 1250px) {
//       width: 48%;
//     }
// `
// export const Container = styled.div`
//     width: 100%;
//     display: flex;
//     justify-content: space-between;
//     padding: 20px 60px 20px 0;
//     @media (max-width: ${device.laptop}) {
//       padding-right: 20px;
//     }
    
// `

// export const Wrapper = styled.div`
//     width: 100%;
//     height: 100%;
// `

// export const UpSide = styled.div`
//     height: 80%;
//     scroll-behavior: auto;
//     display: flex;
//     flex-direction: column;
//     overflow-y: scroll;
//     overflow-x: hidden;
//     ::-webkit-scrollbar {
//     width: 7px;
//     }
//     ::-webkit-scrollbar-track {
//         background-color: transparent;
//     }
//     ::-webkit-scrollbar-thumb {
//         background: #606eea;
//         border-radius: 14px 0px 0px 14px;
//     }
// `


// export const ImageBlock = styled.div`
// position: relative;
// display: flex;
// justify-content: center;
// align-items: center;
// width: max-content;
// img {
//     margin-bottom: 25px;
//     border-radius: 14px;
//     width: 250px;
//     margin-top: 15px;
// }
// svg {
//     position: absolute;
//     cursor: pointer;
//     z-index: 20;
//     opacity: 0;
   
// }
// &:hover{
//     svg {
//         opacity: 1;
//     }
//     &::before{
//         opacity: 0.25;
//     }
// }
// &::before{
//     content: "";
//     position: absolute;
//     left: 0;
//     top: 0;
//     width: 100%;
//     height: 100%;
//     background-color: #ffffff;
//     opacity: 0;
//     transition: 200ms all;
// }
// `
// export const DownSide = styled.div`
//     border-top: 1px solid #606EEA;
//     padding: 25px 0;
//     background-color: white;
//     width: 100%;
//     box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
//     display: flex;
//     justify-content: flex-start;
//     height: 25%;
//     @media (max-width: 1150px) {
//       padding-right: 20px;
//     }
// `
// export const Form = styled.form`
//     background-color: #FFFFFF;
//     width: 95%;
//     height: 100%;
//     box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
//     border-radius: 14px;
//     padding: 35px 110px 0 110px;
//     @media (max-width: ${device.laptop}) {
//       padding: 20px 25px;
//     }
//     @media (max-width: 1150px) {
//       padding-right: 0;
//     }
//     overflow: hidden;
//     min-height: 500px;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
// `

// export const UploadButton = styled.div`
//     background: rgba(96, 110, 234, 0.1);
//     input {
//         display: none;
//     }
//     padding: 14px 25px;
//     cursor: pointer;
//     width: max-content;
//     display: flex;
//     align-items: center;
//     box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
//     border-radius: 14px;
//     margin-bottom: 10px;
//     label {
//         font-size: 18px;
//         font-weight: 500;
//         cursor: pointer;
//         margin-right: 10px;
//         color: #606EEA;

//     }

// `

// export const ErrorMessage = styled.span`
//   font-weight: 300;
//   color: #ff5e68;
//   overflow-wrap: normal;
//   display: flex;
//   margin-top: 5px;

//   font-size: ${({ labelStyle }: any) =>
//     labelStyle?.fontSize?.laptop
//       ? `${labelStyle?.fontSize?.laptop}px`
//       : '14px'} !important;

//   @media (max-width: ${device.mobile}) {
//     font-size: ${({ labelStyle }: any) =>
//     labelStyle?.fontSize?.mobile
//       ? `${labelStyle?.fontSize?.mobile}px`
//       : '14px'} !important;
//     margin-top: 3px;
//   }
//   @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
//     font-size: ${({ labelStyle }: any) =>
//     labelStyle?.fontSize?.planshet
//       ? `${labelStyle?.fontSize?.planshet}px`
//       : '14px'} !important;
//     margin-top: 3px;
//   }
//   @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
//     font-size: ${({ labelStyle }: any) =>
//     labelStyle?.fontSize?.laptop
//       ? `${labelStyle?.fontSize?.laptop}px`
//       : '14px'} !important;
//     flex-direction: column;
//     margin-top: 3px;
//   }
//   @media (min-width: ${device.laptop}) {
//     font-size: ${({ labelStyle }: any) =>
//     labelStyle?.fontSize?.desktop
//       ? `${labelStyle?.fontSize?.desktop}px`
//       : '16px'} !important;
//     margin-top: 5px;
//   }
// `;


// export const PeriodWrapper = styled.div`
//   padding: 30px 40px 25px 30px;
  
//   background: #FFFFFF;
//   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
//   border-radius: 14px;
//   width: max-content;
//   height: 400px;
//   overflow: auto;
//   h5 {
//     font-size: 22px;
//     color: #223367;
//     line-height: 26px;
//     margin-bottom: 30px;
//   }p {
//     color: #C7C7C7;
//     font-size: 16px;
//     font-weight: 700;
//     margin-bottom: 10px;
//   }
// `
// export const WrapChecks = styled.div`
//   display: flex;
//   justify-content: center;
//   width: 100%;
//   flex: 1;
//   margin-left: 15px;
//   margin-top: 15px;
// `;

// export const WrapCheck = styled.div`
//   display: flex;
//   justify-content: center;
//   width: 100%;
//   flex: 1;
//   flex-direction: column;
// `;

// export const PreviewMessage = styled.div`
//   display: flex;
//   align-items: center;
//   margin-top: 40px;
//   svg {
//     margin-right: 20px;
//   }
//   p {
//     font-size: 16px;
//     line-height: 18.75px;
//     color: #223367;
//     width: 258px;
//     font-weight: 300;
//   }
// `

// export const LeaveModal = styled.div`
//   padding: 20px;
//   max-width: 450px;
//   width: 100%;
//   p {
//     font-size: 18px;
//     font-weight: 500;
//     margin-bottom: 20px;
//   }
//   div.buttons {
//     display: flex;
//     width: 100%;
//     justify-content: flex-end;
//     align-items: center;
//   }
// `
import DatePicker from "react-multi-date-picker"
import styled from "styled-components"
import { device } from "styles/device"
import { ReactComponent as TextArea } from 'assets/icons/IconsInfo/textarea.svg';
export const PushWrapper = styled.div`
    width: 100%;
    margin-bottom: 25px;
`
export const Header = styled.div`
    margin-top: 15px;
    p {
        font-size: 14px;
        color: #C4C4C4;
        margin-bottom: 20px;
    }
`
export const TextAreaIcon = styled(TextArea)``;
export const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;


export const CloseButton = styled.div`
    position: absolute;
    right: 25px;
    top: 15px;
    cursor: pointer;
`

export const WrapArea = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-end;
  margin: 65px 10px 0 0;
  @media (max-width: ${device.mobile}) {
    margin: 130px 5px 0 0;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    margin: 30px 10px 0 0;
  }
  @media (min-width: ${device.laptop}) {
    margin: 90px 10px 0 0;
  }
`;
export const MobileHeader = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 15px 0 0 15px;
`

export const PushBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
    h6 {
        font-size: 16px;
        color: #223367;
        font-weight: 500;
    }
    @media (max-width: ${device.mobile}) {
      width: 100%;
      margin-top: 25px;
      h6{
        font-size:14px;
        font-weight:500;
        color:#C4C4C4;

        
      }
    }
`
export const LeftSide = styled.div`
    width: 45%;
    @media (max-width: 1250px) {
      width: 48%;
    }
    @media (max-width: ${device.mobile}) {
      width: 100%;
    }
   
`
export const RightSide = styled.div`
    width: 40%;
    @media (max-width: 1250px) {
      width: 48%;
    }
    @media (max-width: ${device.mobile}) {
      width: 100%;
    }
`
export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 20px 60px 20px 0;
    @media (max-width: ${device.laptop}) {
      padding-right: 20px;
    }
    @media (max-width: ${device.mobile}) {
      flex-direction: column;
      justify-content: initial;
      padding: 15px;
    }
    
`

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`

export const UpSide = styled.div`
    height: 80%;
    scroll-behavior: auto;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    overflow-x: hidden;
    ::-webkit-scrollbar {
    width: 7px;
    }
    ::-webkit-scrollbar-track {
        background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background: #606eea;
        border-radius: 14px 0px 0px 14px;
    }
    @media (max-width: ${device.mobile}) {
      height: 100%;
      width: 100%;
    }
    
`
export const Buttons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content:center;

  align-items: center;
  .upside {
    @media (max-width: 347px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    
  }
  }
`


export const ImageBlock = styled.div`
position: relative;
display: flex;
justify-content: center;
align-items: center;
width: max-content;
img {
    margin-bottom: 25px;
    border-radius: 14px;
    width: 250px;
    margin-top: 15px;
}
svg {
    position: absolute;
    cursor: pointer;
    z-index: 20;
    opacity: 0;
   
}
&:hover{
    svg {
        opacity: 1;
    }
    &::before{
        opacity: 0.25;
    }
}
&::before{
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    opacity: 0;
    transition: 200ms all;
}
`
export const DownSide = styled.div`
    border-top: 1px solid #606EEA;
    padding: 25px 0;
    background-color: white;
    width: 100%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    display: flex;
    justify-content: flex-start;
    height: 25%;
    @media (max-width: 1150px) {
      padding-right: 20px;
    }
    @media (max-width: ${device.mobile}) {
      padding: 25px 20px;
      height: 15%;
    }
    @media (max-width: 320px) {
      padding: 15px 0px;
      height: 15%;
    }
`
export const Form = styled.form`
    background-color: #FFFFFF;
    width: 95%;
    height: 100%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    border-radius: 14px;
    padding: 35px 110px 0 110px;
    @media (max-width: ${device.laptop}) {
      padding: 20px 25px;
    }
    @media (max-width: 1150px) {
      padding-right: 0;
    }
    @media (max-width: ${device.mobile}) {
      width: 100%;
      padding: 0;
      justify-content: initial;
      align-items: center;
      min-height: none;
      height: 100%;
      border-radius: 0;
    }
    overflow: hidden;
    min-height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const UploadButton = styled.div`
    background: rgba(96, 110, 234, 0.1);
    input {
        display: none;
    }
    padding: 14px 25px;
    cursor: pointer;
    width: max-content;
    display: flex;
    align-items: center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 14px;
    margin-bottom: 10px;
    label {
        font-size: 18px;
        font-weight: 500;
        cursor: pointer;
        margin-right: 10px;
        color: #606EEA;

    }
    @media (max-width: ${device.mobile}) {
      padding: 10px 15px;
 
      label {
        font-size: 14px;
        line-height: 16px;
        
      }
  }

`

export const ErrorMessage = styled.span`
  font-weight: 300;
  color: #ff5e68;
  overflow-wrap: normal;
  display: flex;
  margin-top: 5px;

  font-size: ${({ labelStyle }: any) =>
    labelStyle?.fontSize?.laptop
      ? `${labelStyle?.fontSize?.laptop}px`
      : '14px'} !important;

  @media (max-width: ${device.mobile}) {
    font-size: ${({ labelStyle }: any) =>
    labelStyle?.fontSize?.mobile
      ? `${labelStyle?.fontSize?.mobile}px`
      : '14px'} !important;
    margin-top: 3px;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    font-size: ${({ labelStyle }: any) =>
    labelStyle?.fontSize?.planshet
      ? `${labelStyle?.fontSize?.planshet}px`
      : '14px'} !important;
    margin-top: 3px;
  }
  @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
    font-size: ${({ labelStyle }: any) =>
    labelStyle?.fontSize?.laptop
      ? `${labelStyle?.fontSize?.laptop}px`
      : '14px'} !important;
    flex-direction: column;
    margin-top: 3px;
  }
  @media (min-width: ${device.laptop}) {
    font-size: ${({ labelStyle }: any) =>
    labelStyle?.fontSize?.desktop
      ? `${labelStyle?.fontSize?.desktop}px`
      : '16px'} !important;
    margin-top: 5px;
  }
`;


export const PeriodWrapper = styled.div`
  padding: 30px 40px 25px 30px;
  
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px;
  width: max-content;
  height: 400px;
  overflow: auto;
  h5 {
    font-size: 22px;
    color: #223367;
    line-height: 26px;
    margin-bottom: 30px;
  }p {
    color: #C7C7C7;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 10px;
  }
`
export const WrapChecks = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex: 1;
  margin-left: 15px;
  margin-top: 15px;
`;

export const WrapCheck = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex: 1;
  flex-direction: column;
`;

export const PreviewMessage = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;
  svg {
    margin-right: 20px;
  }
  p {
    font-size: 16px;
    line-height: 18.75px;
    color: #223367;
    width: 258px;
    font-weight: 300;
  }
`

export const LeaveModal = styled.div`
  padding: 20px;
  max-width: 450px;
  width: 100%;
  p {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 20px;
  }
  div.buttons {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
  }
`
export const SubmitModal = styled.div`
    padding: 40px 55px 35px 55px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    border-radius: 14px;
    h5 {
        font-size: 18px;
        line-height: 21px;
        font-weight: 500;
        color: #223367;
        margin-bottom: 20px;
    }
    p {
        font-size: 14px;
        line-height: 16.5px;
        color: #223367;
        font-weight: 300;
        margin-bottom: 30px;
    }
    
`
export const WrapperModal = styled.div`
    padding: 20px 45px;
    width:500px;
    position: relative;
    a {
        text-decoration: none;
    }
    h3 {
        font-size: 22px;
        line-height: 26px;
        margin-bottom: 10px;
        color: #223367;

    }
    p {
        font-size: 18px;
        font-weight: 300;
        color: #223367;
        margin-bottom: 25px;
    }
    @media (max-width: ${device.mobile}) {
      max-width:320px;
      padding: 20px 15px;
        h3 {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 15px;
            color: #223367;
        }
        p {
          font-size: 14px;
          color: #223367;
          font-weight: 300;
        }
    }
`
