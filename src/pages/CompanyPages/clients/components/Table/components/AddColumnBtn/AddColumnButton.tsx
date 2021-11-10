import { Checkbox } from '@material-ui/core';
import { PuzzleIcon } from 'assets/icons/ClientsPageIcons/ClientIcons';
import React, { SyntheticEvent } from 'react';
import { headers } from '../../headers';
import { AddButton, MCheckbox } from '../../style';
import { HeadersType } from '../../Table';
import { Header, Popup, PopupContent, Wrapper } from './style';

interface IProps {
	addedHeaders: HeadersType[],
	setAddedHeaders: any
}


export const AddColumnButton = ({ addedHeaders, setAddedHeaders }: IProps) => {
	const popupRef = React.useRef<HTMLDivElement | null>(null);
	const [isOpen, setOpen] = React.useState<boolean>(false);

	const handlePopUp = (e: PointerEvent | MouseEvent | any) => {

		e.stopPropagation();
		if (e.path.includes(popupRef.current)) {
			setOpen(true);
		} else {
			setOpen(false);
		}
	};

	const handleAddHeader = (e: React.KeyboardEvent<SyntheticEvent> | any, el: HeadersType) => {
		const value = addedHeaders.some(header => header.value === el.value)
		if (value) {
			setAddedHeaders((prev: any) => prev.filter((header: any) => header.value !== el.value))
		} else {
			setAddedHeaders((prev: any) => [...prev, el])
		}
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
								<Header onClick={(e) => handleAddHeader(e, el)}>
									<MCheckbox>
										<Checkbox
											checked={addedHeaders.some((e: any) => e.value === el.value)}
										/>
									</MCheckbox>
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

