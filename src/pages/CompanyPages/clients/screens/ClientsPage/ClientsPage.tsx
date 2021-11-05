import React from 'react';
import { Header } from '../../components/Header/Header';
import { Container, MainWrapper, Wrap } from '../../style/style';
import { Table } from '../../components/Table/Table';
import Spinner from 'components/Helpers/Spinner';
import { Footer } from '../../components/Footer/Footer';
import { useFetchClients } from '../../hooks/clientsHooks';
import { useDebounce } from 'use-debounce/lib';
import { EmptyPage } from '../../components/EmptyPage';
import { QrCodeBar } from '../../components/QrCodeBar';
import { ClientsBar } from '../../components/ClientsBar';
import { SideBar } from '../../components/SideBar';
import { useAppSelector } from 'services/redux/hooks';



const ClientsPage = () => {
	const [query, setQuery] = React.useState<string>('')
	const [debouncedQuery] = useDebounce(query, 300)
	const { totalCount, selectedClients, qrCodeBar } = useAppSelector(state => state.clients)


	const { refetch, isFetching } = useFetchClients({ query: debouncedQuery });

	return (
		<MainWrapper>
			<Container>
				<Header setQuery={setQuery} query={query} />
				<Wrap>
					{isFetching ? (
						<Spinner />
					) : totalCount === 0 ? <EmptyPage /> : (
						<Table />
					)}
					{!isFetching && (totalCount !== 0
						&& <Footer />)}
				</Wrap>
				<SideBar isOpen={qrCodeBar}>
					<QrCodeBar />
				</SideBar>
				<SideBar isOpen={!isFetching && !!selectedClients.length}>
					<ClientsBar
						refetch={refetch} />
				</SideBar>
			</Container>
		</MainWrapper>
	);
};

export default ClientsPage;

