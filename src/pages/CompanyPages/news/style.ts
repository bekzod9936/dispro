import styled from 'styled-components';
import { device } from 'styles/device';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;
export const InnerWrap = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	justify-content: flex-start;
`;

export const PageWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  padding-left: 35px;
  padding-top: 30px;
  overflow-y: scroll;
`;

export const TopWrap = styled.div`
	display: flex;
	position: relative;
	width: 50%;
	justify-content: flex-start;
	margin: 15px 0 0 0;
	alignItems: flex-start;
	box-sizing: border-box;
`;

export const SearchWrap = styled.div`
	min-width: 500px;
	width: 100%
`;

export const LimitedParagraph = styled.p`
	overflow: hidden;
	text-overflow: ellipsis;
	display: -moz-box;
	-moz-box-orient: vertical;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	line-clamp: 2;
	box-orient: vertical;
`;

export const WrapDate = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: #223367;
  padding-left: 15px;
`;

export const WrapInputs = styled.div`
  display: flex;
  flex-direction: column;
  & > div {
    display: flex;
  }
`;

export const Label = styled.label`
  font-weight: bold;
  font-size: 14px;
  color: #c7c7c7;
  @media (min-width: ${device.laptop}) {
    font-size: 16px;
  }
  margin-bottom: 5px;
`;
