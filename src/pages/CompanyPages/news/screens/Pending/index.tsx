import React from 'react';
import InPendingSection from '../../InPendingSection';
import { Flex } from '../../../../../styles/BuildingBlocks';

const Pending = () => {
	const [status, setStatus] = React.useState<string>('');
	const [section, setSection] = React.useState<
		'pending' | 'actives' | 'archives'
	>('pending');
	const [selectedSingleNews, setSelectedSingleNews] = React.useState<any>();
	const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);

	return (
		<Flex flexGrow='1' margin='0px' width='100%'>
			<InPendingSection
				setStatus={'pending'}
				section={'pending'}
				setSelectedSingleNews={setSelectedSingleNews}
				selectedSingleNews={selectedSingleNews}
				setIsModalVisible={setIsModalVisible}
				isModalVisible={isModalVisible}
			/>
		</Flex>
	);
};

export default Pending;
