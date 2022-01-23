import { useState, useEffect } from "react";
import { Header } from "../../components/Header/Header";
import {
  Container,
  MainWrapper,
  SpinnerWrapper,
  Wrap,
} from "../../style/style";
import { Table } from "../../components/Table/Table";
import Spinner from "components/Helpers/Spinner";
import { Footer } from "../../components/Footer/Footer";
import { useFetchClients } from "../../hooks/clientsHooks";
import { useDebounce } from "use-debounce/lib";
import { EmptyPage } from "../../components/EmptyPage";
import { QrCodeBar } from "../../components/QrCodeBar";
import { ClientsBar } from "../../components/ClientsBar";
import { SideBar } from "../../components/SideBar";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { useWindowSize } from "../../hooks/useWindowSize";
import { DownBar } from "../../components/DownBar";
import { useMutation, useQuery } from "react-query";
import { fetchAllClients, fetchQrCode } from "services/queries/clientsQuery";
import FullModal from "components/Custom/FullModal";
import { MobileQrBar } from "../../components/MobileQrBar";
import { DownBarViewer } from "../../components/DownBarViewer";
import { MobileForm } from "../../components/Form";
import { setAllClientsData } from "services/redux/Slices/clients";
import Modal from "components/Custom/Modal";
import { usePermissions } from "services/hooks/usePermissions";
export interface IMobileForm {
  open: boolean;
  action: 1 | 2 | 3;
}
const ClientsPage = () => {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery] = useDebounce(query, 300);
  const { totalCount, selectedClients } = useAppSelector(
    (state) => state.clients
  );
  const client = selectedClients[0];
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  const [modals, setModals] = useState({
    qrModal: false,
    downBar: false,
  });
  const [form, setForm] = useState<IMobileForm>({
    open: false,
    action: 1,
  });
  const [qr, setQr] = useState({
    link: "",
    code: "",
  });

  const { refetch, isFetching } = useFetchClients({ query: debouncedQuery });

  const { mutate } = useMutation(() => fetchQrCode(), {
    retry: 0,
    onSuccess: (data) => {
      setQr({
        link: data.data.data.dynLinkToken,
        code: data.data.data.token,
      });
    },
  });

  useEffect(() => {
    mutate();
  }, []);

  return (
    <MainWrapper isRelative={width > 600}>
      {width <= 600 && (
        <FullModal open={modals.qrModal}>
          <MobileQrBar
            link={qr.link}
            code={qr.code}
            handleClose={() =>
              setModals((prev: any) => ({ ...prev, qrModal: false }))
            }
          />
        </FullModal>
      )}
      <Container>
        <Header setQuery={setQuery} query={query} setModals={setModals} />
        <Wrap>
          {isFetching ? (
            <SpinnerWrapper>
              <Spinner />
            </SpinnerWrapper>
          ) : totalCount === 0 ? (
            <EmptyPage textId={debouncedQuery !== "" ? 2 : 1} />
          ) : (
            <Table />
          )}
          {!isFetching && totalCount !== 0 && <Footer query={query} />}
        </Wrap>
        {width > 600 ? (
          <>
            {width > 1000 ? (
              <SideBar isOpen={modals.qrModal}>
                <QrCodeBar
                  onClose={() =>
                    setModals((prev: any) => ({ ...prev, qrModal: false }))
                  }
                  link={qr.link}
                  code={qr.code}
                />
              </SideBar>
            ) : (
              <Modal open={modals.qrModal}>
                <QrCodeBar
                  onClose={() =>
                    setModals((prev: any) => ({ ...prev, qrModal: false }))
                  }
                  link={qr.link}
                  code={qr.code}
                />
              </Modal>
            )}
            <SideBar isOpen={!isFetching && !!selectedClients.length}>
              <ClientsBar refetch={refetch} />
            </SideBar>
          </>
        ) : (
          <>
            {!isFetching && <DownBarViewer setModals={setModals} />}
            {!isFetching && (
              <DownBar
                refetch={refetch}
                setForm={setForm}
                setModals={setModals}
                open={modals.downBar}
              />
            )}
            {client && (
              <MobileForm
                refetch={refetch}
                client={{
                  isBlocked: client.isPlBlocked,
                  name: client.firstName + " " + client.lastName,
                  points: client.addInfo.pointSum,
                  percent: client.personalLoyaltyInfo.isActive
                    ? client.personalLoyaltyInfo.percent
                    : client.obtainProgramLoyalty.percent,
                  currentStatus: client.personalLoyaltyInfo.isActive
                    ? client.addInfo.status
                    : client.obtainProgramLoyalty.levelName,
                  prevPercent: client.obtainProgramLoyalty.percent,
                  prevStatus: client.obtainProgramLoyalty.levelName,
                  id: client.id,
                }}
                open={form.open}
                action={form.action}
                onClose={() =>
                  setForm((prev: any) => ({ ...prev, open: false }))
                }
              />
            )}
          </>
        )}
      </Container>
    </MainWrapper>
  );
};

export default ClientsPage;
