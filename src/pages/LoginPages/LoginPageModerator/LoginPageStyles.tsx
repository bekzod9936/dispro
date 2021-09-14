import styled from 'styled-components';
import { ILoginPanelWrapper } from '../../../services/Types/Style';
import { motion } from 'framer-motion';
export const ImageWrapper = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  //align-self: center;
  border-radius: 50%;
`;
export const LeftWrapper = styled(motion.div)`
  width: 'max-content';
  height: 100%;
  //background-color: green;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15%;
`;

export const LoginPanelWrapper = styled.div`
  background-color: white;
  width: ${(props: ILoginPanelWrapper) => props.width || 'auto'};
  border-radius: 14px;
  padding: 15px 20px;
`;
export const LoginContent = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const CompanyItem = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  justify-content: space-evenly;
  align-items: center;
  background-color: white;
  width: 95%;
  margin: 0px 25px 35px 0px;
`;
export const DashedCircle = styled.div`
  width: 115px;
  height: 115px;
  border-radius: 50%;
  border: 2px dashed #606eea;
  display: flex;
  justify-content: center;
  align-items: center;
`;
