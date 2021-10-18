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
import { TextArea } from 'components/Custom/TextArea';
import Modal from 'components/Custom/Modal';
import styled from 'styled-components';
import Button from 'components/Custom/Button';
import { CancelIcon } from 'assets/icons/ClientsPageIcons/ClientIcons';

const ClientsPage = () => {
	const [query, setQuery] = React.useState('')
	const [debouncedQuery] = useDebounce(query, 300)
	const [isOpenBar, setOpenBar] = React.useState({
		qrBar: false,
		sideBar: false
	})
	const [ { isFiltersVisible, period, loading, filters, page, visibleClients, totalCount, selectedClients, totalPages }, dispatch ] = React.useReducer(
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
				<SideBar isOpen={selectedClients.length}>
					<ClientsBar 
						dispatch={dispatch} 
						selectedClients={selectedClients}/>
				</SideBar>
				<Modal open width={{maxwidth: 520, width: "100%"}}>
					<ModalWindow>
						<h3>Начисление баллов</h3>
						<p>Коплаков Александр</p>
						<TextArea title="Количество баллов" textarea={{height: "60px"}} container={{margin: "30px auto 25px auto"}}/>
						<TextArea title="Комментарий" textarea={{height: "125px"}}/>
						<div>
							<Button buttonStyle={{bgcolor: "#ffffff", color: "#223367", weight: "700"}} startIcon={<CancelIcon />}>Отменить</Button>
						</div>
					</ModalWindow>
				</Modal>
			</Container>
		</MainWrapper>
	);
};

export default ClientsPage;


const ModalWindow = styled.div`
	padding: 30px 40px 25px 40px;
	/* max-width: 520px;
	width: 100%; */
`