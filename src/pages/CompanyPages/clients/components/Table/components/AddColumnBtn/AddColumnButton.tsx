import { PuzzleIcon } from 'assets/icons/ClientsPageIcons/ClientIcons';
import CheckBox from 'components/Custom/CheckBox';
import React from 'react';
import styled from 'styled-components';
import { addHeader, headers } from '../../headers';
import { AddButton } from '../../style';

export const AddColumnButton = ({ setHeaders, addedHeaders, setAddedHeaders }: any) => {
	const popupRef = React.useRef(null);
	const [ isOpen, setOpen ] = React.useState(false);

	const handlePopUp = (e: any) => {
		e.stopPropagation();
		if (e.path.includes(popupRef.current)) {
			setOpen(true);
		} else {
			setOpen(false);
		}
	};

	const handleAddHeader = (e: any, el: any) => {
		setAddedHeaders(addHeader({ value: e.target.checked, addedHeaders, header: el }));
	};

	React.useEffect(() => {
		window.addEventListener('click', handlePopUp);

		return () => window.removeEventListener('click', handlePopUp);
	}, []);

	return (
		<Wrapper ref={popupRef}>
			<AddButton>Добавить пункт</AddButton>
			<PuzzleIcon />
			<Popup>
				{isOpen && (
					<PopupContent>
						{headers.map((el) => {
							return (
								<Header>
									<CheckBox
										checked={addedHeaders.some((e: any) => e.value === el.value)}
										onChange={(e) => handleAddHeader(e, el)}
									/>
									<p>{el.value}</p>
								</Header>
							);
						})}
					</PopupContent>
				)}
			</Popup>
		</Wrapper>
	);
};

const Header = styled.div`
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

const Popup = styled.div`
	position: absolute;
	top: 50px;
	right: 0;
	width: 345px;
`;
const PopupContent = styled.div`
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

const Wrapper = styled.div`
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
