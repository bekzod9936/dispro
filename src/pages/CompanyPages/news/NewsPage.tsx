import React, { Suspense, useState } from 'react';
import { Switch, Route, Link, Router } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

//style
import {
	Container,
	InnerWrap,
	PageWrapper,
	TopWrap,
	SearchWrap,
} from './style';
import Spinner from 'components/Custom/Spinner';

import { FilledAddIcon } from 'assets/icons/SettingsIcons/SettingsPageIcon';
import CustomSearchFlexible from 'components/Custom/CustomLargeFlexible';

import Button from 'components/Custom/Button';
import NavBar from 'components/Custom/NavBar';

import useNewsNavbarRoute from './routes';
import RippleEffect from 'components/Custom/RippleEffect';

import Title from 'components/Custom/Title';
import CreateNews from './CreateNews';

const NewsPage = () => {
	const { t } = useTranslation();
	const [status, setStatus] = useState<string>('');
	const { menuItems } = useNewsNavbarRoute();
	const history = useHistory();

	return (
		<PageWrapper>
			<>
				{history.location.pathname != '/news/createNews' && (
					<>
						<Title>{t('News')}</Title>

						<TopWrap>
							<RippleEffect padding={0}>
								<Button
									onClick={() => history.push('/news/createNews')}
									width={{ minwidth: 251 }}
									margin={{ laptop: '0 25px 0 0', desktop: '0 25px 0 0' }}
									buttonStyle={{
										bgcolor: '#fff',
										color: '#000',
										height: {
											desktop: 60,
										},
									}}
									startIcon={<FilledAddIcon />}
								>
									{t('createNews')}
								</Button>
							</RippleEffect>
							<SearchWrap>
								<CustomSearchFlexible
									placeholder={t('searchFromNews')}
									padding='15.5px 20px'
									margin='0px'
									width='100%'
								/>
							</SearchWrap>
						</TopWrap>
						<NavBar
							list={menuItems.filter(
								(item) =>
									item.path === '/news/newsArchive' ||
									item.path === '/news/pending' ||
									item.path === '/news'
							)}
							margin='20px 0'
						/>
					</>
				)}

				<Container>
					<Switch>
						<Suspense fallback={<Spinner />}>
							{menuItems.map((item, index) => {
								return (
									<Route
										key={index}
										exact
										path={item.path}
										component={item.component}
									/>
								);
							})}
						</Suspense>
					</Switch>
				</Container>
			</>
		</PageWrapper>
	);
};

export default NewsPage;
