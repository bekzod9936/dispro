import { Checkbox, Grid } from "@material-ui/core";
import moment from "moment";
import { Avatar } from "./style/style";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import {
  // CancelIcon,
  // CoinsIcon,
  // CoinsIconWhite,
  QRIcon,
  // TickIconButton,
} from "../../../assets/icons/ClientsPageIcons/ClientIcons";
import {
  CalendarIcon,
  FilterIcon,
} from "../../../assets/icons/ClientStatisticsIcons/ClientStatisticsIcons";
import CustomDatePickerForUndersection from "../../../components/Custom/CustomDatePickerForUndersection";
import CustomInputLarge from "../../../components/Custom/CustomInputLarge";
import CustomTableAdvanced from "../../../components/Custom/CustomTableAdvanced";
import { fetchClients } from "../../../services/queries/PartnerQueries";
import { useAppDispatch, useAppSelector } from "../../../services/redux/hooks";
import {
  choseAllClients,
  filterClientHeaders,
  filterClients,
  resetClients,
  setAllClients,
  setClient,
  setClientApplied,
  setClientDateFrom,
  setClientDateTo,
  setClientEndDate,
  setClientFilterIsOpen,
  setClientGender,
  setClientHeaders,
  setClientPurchaseCost,
  setClientPurchuaseAmountFrom,
  setClientPurchuaseAmountTo,
  setClientStartDate,
  setClientStatus,
  setClientTrafficProvider,
} from "../../../services/redux/Slices/clientSlice";
import { Flex } from "../../../styles/BuildingBlocks";
import {
  CustomButton,
  ModalComponent,
  PageWrapper,
  SectionWrapper,
  Text,
  UnderSectionButton,
} from "../../../styles/CustomStyles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { RightSideDrawer } from "../../../styles/Elements";
import RightSide from "./RightSide";
import CustomModalClients from "./CustomModalClients";
import PersonalCardClient from "./PersonalCardClient";
import { IClientStatisticFilter } from "../../../services/Types/Components";
import Filter from "../../../components/Custom/Filter";
import Invite from "./Invite";
import Spinner from "../../../components/Helpers/Spinner";
import ImageLazyLoad from "../../../components/Custom/ImageLazyLoad/ImageLazyLoad";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3492FF",
    },
  },
});

const ClientsPage = () => {
  const { t } = useTranslation();
  // const classes = useStyles();
  const headers: any = [
    "check",
    "client",
    "DiscountSum",
    "PointSum",
    "CashbackSum",
    "gender",
    "age",
  ];
  const extraHeaders: any = [
    "purchuase_amount",
    "paid",
    "recomendations",
    "traffic_providers",
    "level",
    "last_purchase",
  ];
  const totalHeaders: any = [...headers, ...extraHeaders].filter(
    (item) => item !== "check"
  );
  const tableHeaders = [...headers, ...extraHeaders];
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const clients = useAppSelector((state) => state.clients);
  const [headersState, setHeadersState] = useState(totalHeaders);
  const [rows, setRows] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [date, setDate] = useState(moment(Date.now()).format("YYYY/MM/DD"));
  const [page, setPage] = useState(1);
  const [process, setProcess] = useState<"accure" | "substract" | "VIP" | " ">(
    " "
  );
  const [proceed, setProceed] = useState<boolean>(false);
  const [invite, setInvite] = useState<boolean>(false);
  const client: any = useAppSelector((state) => state.clients.checkedClients);
  const persCard = useAppSelector((state) => state.clients.persCardClient);
  const clientState = useAppSelector((state) => state.clients);
  const [responseData, setResponseData] = useState<any>(null);

  const filters: IClientStatisticFilter[] = [
    {
      title: "gender",
      inputType: "radio",
      request: "chose_gender",
      numOfInputs: ["male", "female"],
      inputHandler: (value: any) => {
        dispatch(setClientGender(value));
      },
      checked: clientState.gender,
    },
    {
      title: "registration_date",
      inputType: "date",
      request: "chose_date",
      numOfInputs: ["from", "to"],
      inputHandler: (value: any, index: number) => {
        if (index === 1) {
          dispatch(setClientDateFrom(value));
        } else {
          dispatch(setClientDateTo(value));
        }
      },
      dateFrom: clientState.dateFrom,
      dateTo: clientState.dateTo,
    },
    {
      title: "purchuase_amount",
      inputType: "input",
      request: "enter_purchuase_diaposone",
      numOfInputs: ["from", "to"],
      inputHandler: (value: any, index: number) => {
        if (index === 1) {
          dispatch(setClientPurchuaseAmountFrom(value));
        } else if (index === 2) {
          dispatch(setClientPurchuaseAmountTo(value));
        }
      },
      checked: [clientState.purchaseAmountFrom, clientState.purchaseAmountFrom],
    },
    {
      title: "purchuase_cost",
      inputType: "input",
      request: "enter_amount",
      numOfInputs: ["cost"],
      inputHandler: (value: number) => {
        dispatch(setClientPurchaseCost(value));
      },
    },
    {
      title: "status",
      inputType: "checkbox",
      request: "chose_status",
      numOfInputs: ["base", "silver", "gold", "platinum", "blocked"],
      inputHandler: (value: string) => {
        dispatch(setClientStatus(value));
      },
    },
    {
      title: "traffic_provider",
      inputType: "radio",
      request: "chose_trafic_provider",
      numOfInputs: ["app", "mobile", "cashier"],
      inputHandler: (value: any) => {
        dispatch(setClientTrafficProvider(value));
      },
      checked: clientState.trafficProvider,
    },
  ];

  const response = useQuery(
    ["clients", page, clientState.startDate, clientState.endDate],
    () => fetchClients(page, clientState.startDate, clientState.endDate),
    {
      refetchOnWindowFocus: false,
      // refetchOnMount: false,
      //cacheTime: 30000,
      retry: 0,
      onSuccess: (data) => {
        setResponseData(data.data.data.clients);
        const finalData = data.data.data.clients.map((item: any) => {
          return {
            data: {
              check: (
                <Checkbox
                  checked={
                    client.find((value: any) => value.id === item.id)
                      ? true
                      : false
                  }
                  onChange={(event, checked) => {
                    handleCheckboxChange(event, checked, item.id);
                  }}
                />
              ),
              client: (
                <Flex justifyContent="start">
                  <Avatar>
                    <ImageLazyLoad src={item.image} alt={item?.firstName} />
                  </Avatar>

                  <Text
                    marginRight="0px"
                    marginLeft="14px"
                    fontSize="15px"
                    fontWeight={400}
                  >
                    {`${item.firstName} ${item.lastName}`}
                  </Text>
                </Flex>
              ),
              DiscountSum: item.addInfo.discountSum,
              PointSum: item.addInfo.pointSum,
              CashbackSum: item.addInfo.cashbackSum,
              gender: item.addInfo.genderStr,
              age: parseInt(moment(item.dateOfBirth).fromNow()),
              purchuase_amount: item.addInfo.countOperation,
              paid: item.addInfo.amountOperation,
              recomendations: "",
              traffic_providers: item.addInfo.sourceBy,
              level: item.addInfo.referLevel,
              last_purchase: item.addInfo.lastPurchaseDate
                ? moment(item.addInfo.lastPurchaseDate).format("DD.MM.YY")
                : " - ",
            },
            id: item.id,
          };
        });

        setRows(finalData);
        setTotalCount(data.data.data.totalCount);
      },
    }
  );

  useEffect(() => {
    if (responseData) {
      const final = responseData.map((item: any) => {
        let check = client.find((value: any) => value.id === item.id)
          ? true
          : false;

        return {
          data: {
            check: (
              <Checkbox
                value={true}
                checked={
                  client.find((value: any) => value.id === item.id)
                    ? true
                    : false
                }
                onChange={(event, checked) => {
                  handleCheckboxChange(event, checked, item.id);
                }}
              />
            ),
            client: (
              <Flex justifyContent="start">
                <Avatar>
                  <ImageLazyLoad src={item.image} alt={item?.firstName} />
                </Avatar>
                <Text
                  marginRight="0px"
                  marginLeft="14px"
                  fontSize="15px"
                  fontWeight={400}
                >
                  {`${item.firstName} ${item.lastName}`}
                </Text>
              </Flex>
            ),
            DiscountSum: item.addInfo.discountSum,
            PointSum: item.addInfo.pointSum,
            CashbackSum: item.addInfo.cashbackSum,
            gender: item.addInfo.genderStr,
            age: parseInt(moment(item.dateOfBirth).fromNow()),
            purchuase_amount: item.addInfo.countOperation,
            paid: item.addInfo.amountOperation,
            recomendations: "",
            traffic_providers: item.addInfo.sourceBy,
            level: item.addInfo.referLevel,
            last_purchase: item.addInfo.lastPurchaseDate
              ? moment(item.addInfo.lastPurchaseDate).format("DD.MM.YY")
              : " - ",
          },
          id: item.id,
        };
      });
      setRows(final);
    }
  }, [client.length]);

  const accurePoints = () => {
    setProcess("accure");
    setModalVisible(true);
  };

  const substractPoints = () => {
    setProcess("substract");
    setModalVisible(true);
  };

  const vipHandle = () => {
    setProcess("VIP");
    setModalVisible(true);
  };

  const choseAllHandler = () => {
    dispatch(choseAllClients(response.data?.data.data.clients));
  };

  const cancelChose = () => {
    dispatch(resetClients());
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
    id: number
  ) => {
    event.stopPropagation();
    const client: any = response?.data?.data?.data?.clients.find(
      (item: any) => item === id
    );

    if (checked && client) {
      dispatch(setClient(client));
    } else if (!checked && !client) {
      dispatch(filterClients(id));
    }
  };

  const handleAllChecked = (e: any, checked: any) => {
    if (checked) {
      dispatch(setAllClients(responseData));
    } else {
      dispatch(setAllClients([]));
    }
  };

  const handleDateChange = (date: any) => {
    if (
      (!clients.startDate && !clients.endDate) ||
      (clients.startDate && clients.endDate)
    ) {
      dispatch(setClientStartDate(date));
      dispatch(setClientEndDate(null));
      setOpen(false);
    } else if (clients.startDate && !clients.endDate) {
      dispatch(setClientEndDate(date));
      setOpen(false);
    }
  };
  const handleAddColumn = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: Boolean
  ) => {
    if (checked) {
      dispatch(setClientHeaders(e.target.value));
    } else {
      dispatch(filterClientHeaders(e.target.value));
    }
  };
  const handleClientClick = (id: number) => {
    let client = response?.data?.data?.data?.clients.find(
      (item: any) => item.id === id
    );
    if (client) {
      dispatch(setClient(client));
    }
  };
  const handlePageChange = (page: number) => {
    setPage(page);
  };
  const handleSearchChange = (e: any) => {};

  const addColumns = totalHeaders.map((item: string) => {
    return (
      <Flex margin="0px" justifyContent="start" alignItems="center">
        <ThemeProvider theme={theme}>
          <Checkbox
            color="primary"
            checked={clients.clientsHeaders.includes(item)}
            value={item}
            onChange={(e, checked) => handleAddColumn(e, checked)}
          />
        </ThemeProvider>

        <Text marginLeft="18px" fontSize="15px" fontWeight={400}>
          {t(item)}
        </Text>
      </Flex>
    );
  });

  return (
    <>
      {!persCard ? (
        <PageWrapper>
          <Text marginLeft="0px" marginRight="0px" fontSize="21px">
            {t("clients")}
          </Text>
          <Text
            marginLeft="10px"
            fontSize="14px"
            fontWeight={500}
            color="#8F8F8F"
          >
            {response.data?.data.data.totalCount &&
              `   ${t("totalClients")} ${response?.data?.data.data.totalCount}`}
          </Text>
          {/* Filter Section  */}

          <Grid container lg={12}>
            <Grid container lg={7}>
              <CustomInputLarge onChange={handleSearchChange} />
              <Flex
                justifyContent="space-between"
                alignItems="center"
                width="fit-content"
                margin="0px"
              >
                <UnderSectionButton
                  onClick={() => {
                    dispatch(setClientFilterIsOpen(!clientState.filterIsOpen));
                  }}
                >
                  <span style={{ minHeight: "28px", minWidth: "28px" }}>
                    <FilterIcon />
                  </span>
                  <Text>{t("filters")}</Text>
                </UnderSectionButton>
                <UnderSectionButton>
                  <span
                    style={{ zIndex: 2000 }}
                    onClick={() => {
                      setOpen(!open);
                    }}
                  >
                    <CalendarIcon />
                  </span>
                  <div>
                    <div>
                      <Text>{t("datePicker")}</Text>
                    </div>

                    <div>
                      <Text fontSize="12px" color="silver" fontWeight={400}>
                        {(clients.startDate
                          ? moment(clients.startDate)
                              .locale("ru")
                              .format("ll") + "-"
                          : "") +
                          `${
                            clients.endDate
                              ? moment(clients.endDate)
                                  .locale("ru")
                                  .format("ll")
                              : ""
                          }`}
                      </Text>
                    </div>
                  </div>

                  <CustomDatePickerForUndersection
                    style={{ visibility: "hidden", position: "absolute" }}
                    handleDateChange={handleDateChange}
                    isOpen={open}
                    top={300}
                    left={190}
                    date={date}
                  />
                </UnderSectionButton>
                <UnderSectionButton
                  onClick={() => {
                    setInvite(!invite);
                  }}
                >
                  <QRIcon />
                  <Text>{t("invite")}</Text>
                </UnderSectionButton>
              </Flex>
            </Grid>
          </Grid>

          {/* Client Table  */}
          <SectionWrapper>
            {clientState.filterIsOpen && (
              <Filter
                top="0px"
                onApply={() => dispatch(setClientApplied(true))}
                filters={filters}
              />
            )}

            {!response.isLoading && rows && headersState && totalCount ? (
              <CustomTableAdvanced
                handleAllCheck={handleAllChecked}
                handleClientClick={handleClientClick}
                handlePageChange={handlePageChange}
                totalCount={totalCount}
                rows={rows}
                headers={tableHeaders}
                listItems={addColumns}
                page={page}
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Spinner />
              </div>
            )}
          </SectionWrapper>
          {client?.length > 0 && !invite && (
            <RightSide
              handleCancelChose={cancelChose}
              handleChoseAlll={choseAllHandler}
              handleVip={vipHandle}
              handleAccurePoints={accurePoints}
              handleSubstractPoints={substractPoints}
            />
          )}
          {invite && <Invite setInvite={setInvite} />}

          {modalVisible && (
            <CustomModalClients
              open={modalVisible}
              client={client[0]}
              setModalVisible={setModalVisible}
              setProceed={setProceed}
              process={process}
              proceed={proceed}
            ></CustomModalClients>
          )}
        </PageWrapper>
      ) : (
        <PersonalCardClient />
      )}
    </>
  );
};

export default ClientsPage;
