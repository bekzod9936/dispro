import styled from "styled-components";

export const Header = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	padding: 0 20px;
	transition: 200ms all;
	&:hover {
		background-color: rgba(96, 110, 234, 0.1);
	}
	p {
		font-size: 18px;
		color: #223367;
		margin-left: 20px;
	}
`;

export const Popup = styled.div`
	position: absolute;
	top: 50px;
	right: 0;
	width: 345px;
`;
export const PopupContent = styled.div`
	height: 100%;
	padding: 15px 0;
	width: 100%;
	background: #ffffff;
	position: relative;
	box-shadow: 0px 1px 28px rgba(0, 0, 0, 0.12);
	border-radius: 14px;
	&::before {
		content: '';
		width: 17px;
		height: 17px;
		background: #ffffff;
		position: absolute;
		transform: rotate(45deg);
		right: 30px;
		top: -8px;
	}
`;

export const Wrapper = styled.div`
	display: flex;
	position: relative;
	align-items: center;
	z-index: 15;
	cursor: pointer;
	padding: 10px;
	border-radius: 8px;
	transition: 200ms all;
	&:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
`;
