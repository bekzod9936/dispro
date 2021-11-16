import { useState, useEffect } from 'react';
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
import { useMutation } from 'react-query';
import { fetchQrCode } from 'services/queries/clientsQuery';
import FullModal from 'components/Custom/FullModal';
import { MobileQrBar } from '../../components/MobileQrBar';




const ClientsPage = () => {
	const [query, setQuery] = useState<string>('')
	const [debouncedQuery] = useDebounce(query, 300)
	const { totalCount, selectedClients } = useAppSelector(state => state.clients)
	const { width } = useWindowSize()
	const [modals, setModals] = useState({
		qrModal: false
	})
	const [qr, setQr] = useState({
		link: "",
		code: ""
	})
	const [form, setForm] = useState({
		action: 1,
		isOpen: false
	})

	const { refetch, isFetching } = useFetchClients({ query: debouncedQuery });
	const { mutate } = useMutation(() => fetchQrCode(), {
		retry: 0,
		onSuccess: (data) => {
			setQr({
				link: data.data.data.dynLinkToken,
				code: data.data.data.token
			})
		}
	})

	useEffect(() => {
		mutate()
	}, [])

	return (
		<MainWrapper isRelative={width > 600}>
			{width <= 600 &&
				<FullModal open={modals.qrModal}>
					<MobileQrBar link={qr.link} code={qr.code} handleClose={() => setModals((prev: any) => ({ ...prev, qrModal: false }))} />
				</FullModal>}
			<Container>
				<Header setQuery={setQuery} query={query} setModals={setModals} />
				<Wrap>
					{isFetching ? (
						<Spinner />
					) : totalCount === 0 ? <EmptyPage /> : (
						<Table />
					)}
					{!isFetching && (totalCount !== 0
						&& <Footer query={query} />)}
				</Wrap>
				{width > 600 ? <>
					<SideBar isOpen={modals.qrModal}>
						<QrCodeBar
							onClose={() => setModals((prev: any) => ({ ...prev, qrModal: false }))}
							link={qr.link}
							code={qr.code} />
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

