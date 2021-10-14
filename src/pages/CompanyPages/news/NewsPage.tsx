import React, { useState, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Container, InnerWrap } from './style'
import Spinner from 'components/Custom/Spinner';
import {
	PageWrapper,
	SectionHead,
} from '../../../styles/CustomStyles';
import { Flex } from '../../../styles/BuildingBlocks';
import { FilledAddIcon } from '../../../assets/icons/SettingsIcons/SettingsPageIcon';
import CustomSearchFlexible from '../../../components/Custom/CustomLargeFlexible';
import Title from 'components/Custom/Title';

import CreateNews from './CreateNews';
import { BackIcon } from '../../../assets/icons/NewsIcons/NewsIcons';
import ViewFull from './ViewFull';
import Button from 'components/Custom/Button';
import NavBar from 'components/Custom/NavBar';

import useNewsRoute from './routes';
import RippleEffect from 'components/Custom/RippleEffect';

const NewsPage = () => {
	const { t } = useTranslation();
	
	const [status, setStatus] = useState<string>('');
	const [selectedSingleNews, setSelectedSingleNews] = useState<any>();
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

	const { menuItems } = useNewsRoute();

	return (
		<PageWrapper
			style={{
				display: status === 'view_full' ? 'flex' : undefined,
				flexDirection: status === 'view_full' ? 'column' : undefined,
			}}
		>
			<InnerWrap>
				<SectionHead>
					{status !== 'create_news' &&
						status !== 'view_full' &&
						status !== 'edit_news' &&
						status !== 'reset_news' ? (
						<Title>{t('News')}</Title>
					) : selectedSingleNews && status === 'view_full' ? (
						<span>
							<span
								onClick={() => {
									setStatus('');
								}}
							>
								<BackIcon />
							</span>
							<span style={{ marginLeft: '12px' }}>

								{selectedSingleNews.title}
							</span>
						</span>
					) : status === 'edit_news' ? (
						<span>
							<span
								onClick={() => {
									setStatus('view_full');
								}}
							>
								<BackIcon />
							</span>
							<span style={{ marginLeft: '12px' }}> {t('editingNews')}</span>
						</span>
					) : status === 'reset_news' ? (
						<span>
							<span
								onClick={() => {
									setStatus('');
								}}
							>

								<BackIcon />
							</span>
							<span style={{ marginLeft: '12px' }}> {t('resetingNews')}</span>
						</span>
					) : (
						<span>
							<span
								onClick={() => {
									setStatus('');
								}}
							>
								<BackIcon />
							</span>
							<span style={{ marginLeft: '12px' }}> {t('addingNews')}</span>
						</span>
					)}
				</SectionHead>

				{status === 'create_news' ? (
					<>
						<CreateNews setStatus={setStatus} />
					</>
				) : (selectedSingleNews && status === 'view_full') ||
					status === 'edit_news' ||
					status === 'reset_news' ? (
					<ViewFull
						selectedSingleNews={selectedSingleNews}
						setModalIsVisible={setIsModalVisible}
						setStatus={setStatus}
						status={status}
						setSelect={setSelectedSingleNews}
					/>
				) : (
					<>
						<Flex
							width='50%'
							justifyContent='flex-start'
							margin='15px 0 0 0 '
							alignItems='flex-start'
						>


							<RippleEffect padding={0}>
								<Button onClick={() => setStatus('create_news')} width={{ minwidth: 251 }} margin={{ laptop: '0 25px 0 0' }} buttonStyle={{
									bgcolor: '#fff', color: '#000', height: {
										desktop: 60
									}
								}} startIcon={<FilledAddIcon />}>{t('createNews')}</Button>
							</RippleEffect>



							<CustomSearchFlexible
								placeholder={t('searchFromNews')}
								padding='15.5px 20px'
								margin='0px'
								width='62.58%'
							/>


						</Flex>


						<Flex
							width='40%'
							alignItems='flex-start'
							justifyContent='space-between'
							margin='0px'
						>
							<NavBar list={menuItems} margin='20px 0' />


						</Flex>
						<Container>
							<Switch>
								<Suspense fallback={<Spinner />}>
									{menuItems.map((item, index) => {
										return <Route key={index} exact path={item.path} component={item.component} />;
									})}
								</Suspense>
							</Switch>
						</Container>

					</>
				)}
			</InnerWrap>
		</PageWrapper>
	);
};

export default NewsPage;
