import { PuzzleIcon } from 'assets/icons/ClientsPageIcons/ClientIcons';
import CheckBox from 'components/Custom/CheckBox';
import React, { SyntheticEvent } from 'react';
import { addHeader, headers } from '../../headers';
import { AddButton } from '../../style';
import { HeadersType } from '../../Table';
import { Header, Popup, PopupContent, Wrapper } from './style';

interface IProps {
	addedHeaders: HeadersType[],
	setAddedHeaders: any
}


export const AddColumnButton = ({ addedHeaders, setAddedHeaders }: IProps) => {
	const popupRef = React.useRef<HTMLDivElement | null>(null);
	const [ isOpen, setOpen ] = React.useState<boolean>(false);

	const handlePopUp = (e: PointerEvent | MouseEvent | any) => {
		
		e.stopPropagation();
		if (e.path.includes(popupRef.current)) {
			setOpen(true);
		} else {
			setOpen(false);
		}
	};

	const handleAddHeader = (e: React.KeyboardEvent<SyntheticEvent> | any, el: HeadersType) => {
		
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

