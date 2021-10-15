import { ButtonsWrapper, Flex, SubTitle } from '../../style/style';
import Title from 'components/Custom/Title';
import Input from 'components/Custom/Input';
import { QRButton } from './QRButton';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { MFilter } from './Filter';
import NewDatePicker from 'components/Custom/DatePicker';

interface IProps {
	totalCount: number;
	query: string,
	setQuery: any,
	dispatch: any
}

export const Header = ({ totalCount, setQuery, query, dispatch }: IProps) => {
	const { t } = useTranslation();
	
	return (
		<div>
			<Flex>
				<Title>{t('clients')}</Title>
				<SubTitle>{`${t('totalClients')}: ${totalCount}`}</SubTitle>
			</Flex>
			<Input value={query} onChange={(e) => setQuery(e.target.value)} width={{ maxwidth: 700 }} />
			<ButtonsWrapper marginBottom={20} marginTop={20}>
				<MFilter dispatch={dispatch} />
				<NewDatePicker />
				<QRButton />
			</ButtonsWrapper>
		</div>
	);
};
