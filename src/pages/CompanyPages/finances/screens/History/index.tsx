import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useHistory from './hook/useHistory';
import Spinner from 'components/Custom/Spinner';
import Table from '../../components/Table';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { countPagination, numberWithNew } from 'services/utils';
import MobileTable from '../../components/MobileTable';
import useWindowWidth from 'services/hooks/useWindowWidth';
import financeCashierDef from '../../../../../assets/images/financeCashierDef.png';
import { NewPagination } from 'components/Custom/NewPagination';
import FilterHistory from './components/FilterHistory';
import Button from 'components/Custom/Button';
import { setSideDrawer } from 'services/redux/Slices/finance';
import Modal from 'components/Custom/Modal';
import { IconButton } from '@material-ui/core';
import { ReactComponent as EditPen } from 'assets/icons/editpen.svg';
import { TextArea } from 'components/Custom/TextArea';
import { intialFilterProps, SProps } from './type';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import App from 'assets/icons/StatistisPage/app.svg';
import {
  WrapPag,
  Info,
  TotalSum,
  WrapTotal,
  WrapTotalSum,
  WrapSum,
  Label,
  Img,
  WrapDef,
  TitleDef,
} from '../../style';
import {
  Container,
  MoneyIcon,
  DiscountIcon,
  CartIcon,
  WrapSideFooter,
  Comment,
  BodyTitle,
  WrapSideBody,
  WrapSideHeader,
  DeleteIcon1,
  CloseIcon,
  SaveIcon,
  CancelIcon,
  WrapButtonsModal,
  WrapModalComment,
  WarpBodyComModel,
  WrapComTitle,
  LabelCom,
  WrapComment,
  WrapImage,
} from './style';

const Payment = () => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();
  const dispatch = useAppDispatch();
  const [rowData, setRowData] = useState<any>({});
  const [comment, setComment] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [mobileRow, setMobileRow] = useState<any>({});
  const [disable, setDisable] = useState<boolean>(false);
  const data = useAppSelector((state) => state.finance.historyFinance.data);
  const total = useAppSelector((state) => state.finance.historyFinance.total);
  const between = useAppSelector(
    (state) => state.finance.historyFinance.between
  );
  const sidedrawer = useAppSelector(
    (state) => state.finance.historyFinance.sidedrawer
  );
  const sum = useAppSelector((state) => state.finance.historyFinance.sum);

  const intialFilter = {
    startDate: dayjs().startOf('month').format('YYYY-MM-DD'),
    endDate: dayjs().endOf('month').format('YYYY-MM-DD'),
    cashierStaffId: '',
    page: 1,
    perPage: 5,
  };

  const [filterValues, setFilterValues] =
    useState<intialFilterProps>(intialFilter);

  const { response, resComment, listmobile, listdesktop, header2 } = useHistory(
    {
      filterValues: filterValues,
    }
  );

  const handleAllClose = () => {
    setOpen(false);
    setRowData({});
    setComment('');
    setMobileRow({});

    dispatch(
      setSideDrawer({
        openRow: false,
        chosenRow: {},
        content: null,
      })
    );
  };

  const handleClickCommet = (e: any) => {
    setOpen(true);
    setRowData(e);
    setComment('');
    setMobileRow({});
  };

  const handleRow = (e: any) => {
    if (e.col13 !== '') {
      dispatch(
        setSideDrawer({
          openRow: true,
          chosenRow: e,
          content: content(e),
        })
      );
      setRowData(e);
      setComment(e.col13);
    }
  };

  const handleEdit = (com: any) => {
    setOpen(true);
    setComment(com);
    dispatch(
      setSideDrawer({
        ...sidedrawer,
        openRow: false,
      })
    );
  };

  const handleDelete = (id: any) => {
    resComment.mutate(
      {
        chequeId: id,
        chequeComment: '',
      },
      {
        onSuccess: () => {
          handleAllClose();
          setDisable(false);
        },
      }
    );
  };

  const handleSave = () => {
    resComment.mutate(
      {
        chequeId: rowData?.id,
        chequeComment: comment,
      },
      {
        onSuccess: () => {
          handleAllClose();
        },
      }
    );
  };

  const handlechangePage = async (e: any) => {
    await setFilterValues({ ...filterValues, page: e });
    await response.refetch();
  };

  const columns: any = useMemo(
    () => [
      {
        Header: t('cashier'),
        accessor: 'col1',
        Cell: (props: any) => {
          if (props.value === 'No cashier name') {
            return (
              <WrapImage>
                <LazyLoadImage
                  alt='avatar'
                  height='40px'
                  src={
                    props.cell.row.original.col0
                      ? props.cell.row.original.col0
                      : App
                  }
                  width='40px'
                  effect='blur'
                  style={{ objectFit: 'cover', borderRadius: '14px' }}
                  onError={(e: any) => {
                    e.target.onerror = null;
                    e.target.src = App;
                  }}
                />
                {t('p2p')}
              </WrapImage>
            );
          } else {
            return (
              <WrapImage>
                <LazyLoadImage
                  alt='avatar'
                  height='40px'
                  src={
                    props.cell.row.original.col0
                      ? props.cell.row.original.col0
                      : App
                  }
                  width='40px'
                  effect='blur'
                  style={{ objectFit: 'cover', borderRadius: '14px' }}
                  onError={(e: any) => {
                    e.target.onerror = null;
                    e.target.src = App;
                  }}
                />
                {props.value}
              </WrapImage>
            );
          }
        },
      },
      {
        Header: t('transactiondate'),
        accessor: 'col2',
        Cell: (props: any) => {
          return dayjs(props.value).format('DD.MM.YYYY');
        },
      },
      {
        Header: t('transactiontime'),
        accessor: 'col3',
        Cell: (props: any) => {
          return dayjs(props.value).format('HH:mm:ss');
        },
      },
      {
        Header: t('totalsum'),
        accessor: 'col4',
        Cell: (props: any) => {
          return numberWithNew({ number: props.value });
        },
      },
      {
        Header: t('discountSum'),
        accessor: 'col5',
        Cell: (props: any) => {
          return numberWithNew({ number: props.value });
        },
      },
      {
        Header: t('paid'),
        accessor: 'col6',
        Cell: (props: any) => {
          return numberWithNew({ number: props.value });
        },
      },
      {
        Header: t('paycash/payterminal'),
        accessor: 'col7',
        Cell: (props: any) => {
          return numberWithNew({ number: props.value });
        },
      },
      {
        Header: t('paycardapp'),
        accessor: 'col8',
        Cell: (props: any) => {
          return numberWithNew({ number: props.value });
        },
      },
      {
        Header: t('customer'),
        accessor: 'col9',
      },
      {
        Header: t('loyaltypercentage'),
        accessor: 'col10',
        Cell: (props: any) => {
          if (
            props.cell.row.original.isDiscount ||
            props.cell.row.original.isCashback ||
            props.cell.row.original.isPoints
          ) {
            return numberWithNew({ number: props.value });
          } else {
            return '-';
          }
        },
      },
      {
        Header: t('coupon'),
        accessor: 'col11',
        Cell: (props: any) => {
          if (
            props.cell.row.original.isCoupon &&
            props.cell.row.original.valueType === 'percent'
          ) {
            return `${numberWithNew({ number: props.value })}%`;
          } else {
            return '-';
          }
        },
      },
      {
        Header: t('certificate'),
        accessor: 'col12',
        Cell: (props: any) => {
          if (
            props.cell.row.original.isCoupon &&
            props.cell.row.original.valueType === 'amount'
          ) {
            return numberWithNew({ number: props.value });
          } else {
            return '-';
          }
        },
      },
      {
        Header: t('comment'),
        accessor: 'col13',
        Cell: (props: any) => {
          if (props.value !== '') {
            return <WrapComment>{props.value}</WrapComment>;
          } else {
            return (
              <Button
                buttonStyle={{
                  bgcolor: '#e1e3fb',
                  color: '#3492FF',
                  radius: 12,
                  weight: 300,
                  height: {
                    laptop: 36,
                    desktop: 36,
                    planshet: 36,
                  },
                  fontSize: {
                    desktop: 14,
                    laptop: 14,
                    planshet: 14,
                  },
                }}
                onClick={() => handleClickCommet(props.cell.row.original)}
              >
                {t('addcomment')}
              </Button>
            );
          }
        },
      },
    ],
    []
  );

  const content = (e: any) => {
    console.log(e, 'slslslsl');
    return (
      <>
        <WrapSideBody>
          <WrapSideHeader>
            {t('operation')}
            <IconButton onClick={() => handleAllClose()}>
              <CloseIcon />
            </IconButton>
          </WrapSideHeader>
          <BodyTitle>{t('commentoperation')}</BodyTitle>
          <Comment>
            <div>{e.col13}</div>
          </Comment>
        </WrapSideBody>
        <WrapSideFooter>
          <Button startIcon={<EditPen />} onClick={() => handleEdit(e.col13)}>
            {t('edit')}
          </Button>
          <Button
            buttonStyle={{
              color: 'white',
              bgcolor: '#FF5E68',
              weight: 500,
              shadow: '0px 4px 9px rgba(255, 94, 104, 0.46)',
            }}
            startIcon={<DeleteIcon1 />}
            disabled={disable}
            onClick={() => {
              setDisable(true);
              handleDelete(e?.id);
            }}
          >
            {t('deletecomment')}
          </Button>
        </WrapSideFooter>
      </>
    );
  };

  const contentTable = () => {
    if (response.isLoading || response.isFetching) {
      return <Spinner />;
    } else {
      if (data.length === 0) {
        return (
          <WrapDef>
            <Img src={financeCashierDef} alt='finance' />
            <TitleDef>{t('therewillbeahistoryofcashiers')}</TitleDef>
          </WrapDef>
        );
      } else {
        if (width > 600) {
          return (
            <Table
              onClickRow={handleRow}
              header2={header2}
              columns={columns}
              data={listdesktop}
              idRow={sidedrawer?.chosenRow?.id}
              cursorRow='pointer'
            />
          );
        } else {
          return (
            <MobileTable
              data={{
                title: t('totalsum'),
                info: listmobile,
              }}
              headertitle={t('byCashiers')}
              isAvatar={true}
              footer={mobileRow.id && content(mobileRow)}
              onClickRow={(e: any) => {
                setMobileRow(e);
              }}
            />
          );
        }
      }
    }
  };

  const headerContentMobile = () => {
    if (width <= 600) {
      return (
        <WrapTotal>
          <WrapTotalSum>
            <MoneyIcon />
            <WrapSum>
              <Label>{t('totalsum')}</Label>
              <TotalSum>
                {numberWithNew({ number: sum.total, defaultValue: 0 })}
              </TotalSum>
            </WrapSum>
          </WrapTotalSum>
          <WrapTotalSum>
            <DiscountIcon />
            <WrapSum>
              <Label>{t('sale')}</Label>
              <TotalSum>
                {numberWithNew({ number: sum.minus, defaultValue: 0 })}
              </TotalSum>
            </WrapSum>
          </WrapTotalSum>
          <WrapTotalSum>
            <CartIcon />
            <WrapSum>
              <Label>{t('paid')}</Label>
              <TotalSum>
                {numberWithNew({ number: sum.paid, defaultValue: 0 })}
              </TotalSum>
            </WrapSum>
          </WrapTotalSum>
        </WrapTotal>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <Container>
        {response.isLoading ? (
          <Spinner />
        ) : (
          <>
            <FilterHistory
              setFilterValues={setFilterValues}
              filterValues={filterValues}
              refetch={() => response.refetch()}
              intialFilter={intialFilter}
            />
            {headerContentMobile()}
            {contentTable()}
            <Modal open={open}>
              <WrapModalComment>
                <WarpBodyComModel>
                  <WrapComTitle>
                    <div>
                      {rowData.col13 !== ''
                        ? t('changingcomment')
                        : t('addingcomment')}
                    </div>
                    <IconButton
                      onClick={() => {
                        setOpen(false);
                        handleAllClose();
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </WrapComTitle>
                  <div>
                    <TextArea
                      minHeight={'120px'}
                      maxHeight={'300px'}
                      resize={'vertical'}
                      value={comment}
                      onChange={(e: any) => setComment(e.target.value)}
                      maxLength={100}
                      title={
                        <LabelCom>
                          <span>{t('commentoperation')}</span>
                          <span>{comment.length}/100</span>
                        </LabelCom>
                      }
                    />
                  </div>
                </WarpBodyComModel>
                <WrapButtonsModal>
                  <Button
                    buttonStyle={{
                      bgcolor: width > 600 ? 'white' : '#eff0fd',
                      color: width > 600 ? '#223367' : '#606EEA',
                      weight: 500,
                    }}
                    margin={{
                      laptop: '0 30px 0 0',
                      mobile: '0 10px 0 0',
                    }}
                    startIcon={width > 600 ? <CancelIcon /> : null}
                    endIcon={width < 600 ? <CancelIcon /> : null}
                    onClick={() => {
                      handleAllClose();
                    }}
                  >
                    {t('cancel')}
                  </Button>
                  <Button
                    buttonStyle={{
                      color: 'white',
                      bgcolor: '#606EEA',
                    }}
                    startIcon={<SaveIcon />}
                    disabled={resComment.isLoading}
                    onClick={handleSave}
                  >
                    {t('save')}
                  </Button>
                </WrapButtonsModal>
              </WrapModalComment>
            </Modal>
            {data.length === 0 ? null : (
              <WrapPag>
                <Info>
                  {t('shown')}
                  <span>{between}</span>
                  {t('from1')} <span>{total.pages}</span>
                  {countPagination({
                    count: Number(total.pages),
                    firstWord: t('operations1'),
                    secondWord: t('operations23'),
                  })}
                </Info>
                {!response.isFetching && (
                  <NewPagination
                    onChange={handlechangePage}
                    currentPage={Number(filterValues.page)}
                    totalCount={Number(total?.count)}
                  />
                )}
              </WrapPag>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default Payment;
