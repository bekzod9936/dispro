import styled from "styled-components";

export const LeftWrapper = styled.div`
width: 45%;
max-height: 70vh;
padding-bottom: 20px;   
overflow-y: scroll;
overflow-x: visible;
background-color: white;
border-radius: 14px;
&::-webkit-scrollbar {
    appearance: none;
    display: none;
}; 
&::-webkit-scrollbar-thumb {
    appearance: none;
    display: none;
};

&::-webkit-scrollbar-track {
    appearance: none;
    display: none;
};
//display: flex;


`

export const RightWrapper = styled.div`
width: 45%;
height: 70vh;
border-radius: 14px;
border: 1px solid #c4c4c4;
margin: 0px;
overflow : hidden;
`
export const Papper = styled.div`
overflow-x: unset;
overflow-y: unset;
position: absolute;
bottom: 55px;
margin-left: 200px;
padding: 25px;
background: white;
border-radius: 14px;
box-shadow: 0px 1px 28px rgba(0, 0, 0, 0.12);

&::before {
            content: '';
            position: absolute;
            margin-right: -0.71em;
            bottom: -16px;
            left: 15px;
            width: 20px;
            height:17px;
            background-color: white;
            box-shadow: 2px 2px 2px grey;
            transform: rotate(180deg);
            clip-path:polygon(50% 0%, 0 100%, 100% 100%);
        }


`
export const ImageLabel = styled.label`
width: 230px;
height: 160px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
border: 1px dashed #c4c4c4;
border-radius: 14px;
overflow: hidden;
//margin-left: 10px;
margin-top: 20px;
cursor: pointer;
`
export const ButtonLabel = styled.label`
padding: 14px 25px;
border-radius: 14px;
background-color:  #F0F1FD;
cursor: pointer;
overflow: hidden;
`

export const AboutSectionWrapper = styled.div`
width: 95%;
display: flex;

height: 100%;
border-radius: 14px;
background-color: white;
`

export const ScrolableWrapper = styled.div`
width: 100%;
//justify-content: space-around;
//overflow: scroll;
&::-webkit-scrollbar {
    display: none;
    appearance: none;
}

`
export const CustomLabel = styled.label`
width: 60%;
padding: 16px 25px;
margin-top: 20px;
box-sizing: border-box;
display: flex;
justify-content: space-evenly;
border-radius: 14px;
background-color: rgba(96, 110, 234, 0.1);
`
export const CustomStatic = styled.div`
width: 100%;
background-color: #f5f5f5;
border-radius: 14px;
box-sizing: border-box;
font-size: 16px;
margin-top: 10px;
padding: 25px 15px;
`