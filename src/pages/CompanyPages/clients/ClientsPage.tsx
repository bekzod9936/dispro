import React from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from './components/Header/Header';
import { Container, MainWrapper, Wrap } from './style/style';
import { Table } from './components/Table/Table';
import Spinner from 'components/Helpers/Spinner';
import { Footer } from './components/Footer/Footer';
import { clientsReducer, initialState } from './utils/clientsReducer';
import { useFetchClients } from './hooks/clientsHooks';
import { useDebounce } from 'use-debounce/lib';
import { EmptyPage } from './components/EmptyPage';
import { QrCodeBar } from './components/QrCodeBar';

const ClientsPage = () => {
	const { t } = useTranslation();
	const [query, setQuery] = React.useState('')
	const qrRef = React.useRef()
	const [isOpenBar, setOpenBar] = React.useState({
		qrBar: false,
		sideBar: false
	})
	const [debouncedQuery] = useDebounce(query, 300)
	const [ { period, loading, filters, page, visibleClients, totalCount, selectedClients, totalPages }, dispatch ] = React.useReducer(
		clientsReducer,
		initialState,
	);
	const { isLoading } = useFetchClients({page, dispatch, query: debouncedQuery, filters, period});
	
	
	return (
		<MainWrapper>
			<Container>
				<Header setOpenBar={setOpenBar} setQuery = {setQuery} 
				query={query} totalCount={totalCount} dispatch={dispatch}/>
				<Wrap>
					{loading ? (
						<Spinner />
					) : totalCount === 0 ? <EmptyPage /> : (
						<Table
							visibleClients={visibleClients}
							dispatch={dispatch}
							selectedClients={selectedClients}
						/>
					)}
					{visibleClients.length !== 0 && <Footer totalPages={totalPages} totalCount={totalCount} page={page} setPage={dispatch} />}
				</Wrap>
				<QrCodeBar setOpenBar={setOpenBar} isOpen={isOpenBar.qrBar}/>

			</Container>
		</MainWrapper>
	);
};

export default ClientsPage;
