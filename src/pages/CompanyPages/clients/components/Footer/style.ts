import styled from "styled-components";
import { device } from "styles/device";

export const WrapPag = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 20px 0;
	p {
		font-size: 18px;
		color:#223367;
		span {
			font-weight: 700;
		}
	}
	@media (max-width: ${device.planshet}) {
		flex-direction: column-reverse;
		align-items: flex-start;
		p {
			margin-top: 15px;
			font-size: 14px;
		}
	}
`;