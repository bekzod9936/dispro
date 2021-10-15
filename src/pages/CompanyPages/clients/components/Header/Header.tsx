import { ButtonsWrapper, Flex, SubTitle } from '../../style/style';
import Title from 'components/Custom/Title';
import Input from 'components/Custom/Input';
import { QRButton } from './QRButton';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { MFilter } from './Filter';
import NewDatePicker from 'components/Custom/DatePicker';
import { SearchIcon } from 'components/Layout/Header/style';

interface IProps {
	totalCount: number;
	query: string,
	setQuery: any,
	dispatch: any
	setOpenBar: any,
}

export const Header = ({ totalCount, setQuery, query, dispatch, setOpenBar }: IProps) => {
	const { t } = useTranslation();
	
	const handlePickDate = (date: string) => {
		const [startDate, endDate] = date.split(' ~ ')
		dispatch({type: "setPeriod", payload: {startDate, endDate}})
		
	}


	return (
		<div>
			<Flex>
				<Title>{t('clients')}</Title>
				<SubTitle>{`${t('totalClients')}: ${totalCount}`}</SubTitle>
			</Flex>
			<Input IconStart={<SearchIcon style={{marginLeft: 20}}/>} value={query} onChange={(e) => setQuery(e.target.value)} width={{ maxwidth: 700 }} />
			<ButtonsWrapper marginBottom={20} marginTop={20}>
				<MFilter dispatch={dispatch} />
				<NewDatePicker onChange={(e) => handlePickDate(e)
				}/>
				<QRButton setOpenBar={setOpenBar} />
			</ButtonsWrapper>
		</div>
	);
};
