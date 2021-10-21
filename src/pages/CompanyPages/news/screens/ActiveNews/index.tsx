import React, { useEffect } from 'react';
import InPendingSection from '../../InPendingSection';
import { Flex } from '../../../../../styles/BuildingBlocks';
import partnerApi from 'services/interceptors/companyInterceptor';

export const fetchNews = async () => {
	const response = await partnerApi.get('/core/news');
	console.log(`this news response`, response);
	return response;
};

const ActiveNews = () => {
	const [status, setStatus] = React.useState<string>('');
	const [section, setSection] = React.useState<
		'pending' | 'actives' | 'archives'
	>('pending');
	const [selectedSingleNews, setSelectedSingleNews] = React.useState<any>();
	const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);

	useEffect(() => {
		fetchNews();
	}, []);

	return (
		<Flex flexGrow='1' margin='0px' width='100%'>
			<InPendingSection
				setStatus={'actives'}
				section={'actives'}
				setSelectedSingleNews={setSelectedSingleNews}
				selectedSingleNews={selectedSingleNews}
				setIsModalVisible={setIsModalVisible}
				isModalVisible={isModalVisible}
			/>
		</Flex>
	);
};

export default ActiveNews;
