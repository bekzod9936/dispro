import React from 'react';
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
import { ClientsBar } from './components/ClientsBar';
import { SideBar } from './components/SideBar';
import { ActionType, IState } from './utils/reducerTypes';


const ClientsPage = () => {
	const [query, setQuery] = React.useState<string>('')
	const [debouncedQuery] = useDebounce(query, 300)
	const [isOpenBar, setOpenBar] = React.useState({
		qrBar: false,
		sideBar: false
	})
	const [ { 
		isFiltersVisible, 
		period, 
		loading, 
		filters, 
		page, 
		visibleClients, 
		totalCount, 
		selectedClients, 
		totalPages }, 
		dispatch ] = React.useReducer<React.Reducer<IState, ActionType>>(
		clientsReducer,
		initialState,
	);
	
	
	const { refetch } = useFetchClients({page, dispatch, query: debouncedQuery, period});
	
	return (
		<MainWrapper>
			<Container>
				<Header 
					isFiltersVisible={isFiltersVisible}
					refetch={refetch} 
					setOpenBar={setOpenBar} 
					setQuery = {setQuery} 
					query={query} 
					totalCount={totalCount} 
					dispatch={dispatch} 
					filters={filters}/>
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
					{visibleClients.length !== 0 
						&& <Footer 
								length={visibleClients.length} 
								totalPages={totalPages} 
								totalCount={totalCount} 
								page={page} 
								setPage={dispatch} />}
				</Wrap>
				<SideBar isOpen={isOpenBar.qrBar}>
					<QrCodeBar setOpenBar={setOpenBar}/>
				</SideBar>
				<SideBar isOpen={!!selectedClients.length}>
					<ClientsBar 
						dispatch={dispatch} 
						selectedClients={selectedClients}/>
				</SideBar>
			</Container>
		</MainWrapper>
	);
};

export default ClientsPage;

