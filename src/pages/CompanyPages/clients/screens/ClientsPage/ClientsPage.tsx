import { useState } from 'react';
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
import { useWindowSize } from '../../hooks/useWindowSize';
import { DownBar } from '../../components/DownBar';
import { Form } from '../../components/Form';



const ClientsPage = () => {
	const [query, setQuery] = useState<string>('')
	const [debouncedQuery] = useDebounce(query, 300)
	const { totalCount, selectedClients, qrCodeBar } = useAppSelector(state => state.clients)
	const { width } = useWindowSize()
	const [form, setForm] = useState({
		action: 1,
		isOpen: false
	})
	const { refetch, isFetching } = useFetchClients({ query: debouncedQuery });

	return (
		<MainWrapper isRelative={width > 600}>

			{width <= 600 &&
				<Form
					action={form.action}
					isOpen={form.isOpen}
					handleClose={setForm} />}
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
				{width > 600 ? <>
					<SideBar isOpen={qrCodeBar}>
						<QrCodeBar />
					</SideBar>
					<SideBar isOpen={!isFetching && !!selectedClients.length}>
						<ClientsBar
							refetch={refetch} />
					</SideBar>
				</> :
					<DownBar setForm={setForm} />}
			</Container>
		</MainWrapper>
	);
};

export default ClientsPage;

