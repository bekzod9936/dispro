import { useState } from 'react';
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
import { TextArea } from 'components/Custom/TextArea';
import { intialFilterProps } from './type';
import SideDrawer from '../../components/SideDrawer';
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
  CloseIcon,
  SaveIcon,
  CancelIcon,
  WrapButtonsModal,
  WrapModalComment,
  WarpBodyComModel,
  WrapComTitle,
  LabelCom,
  CloseWrapBut,
} from './style';

const Payment = () => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();
  const dispatch = useAppDispatch();
  const [rowData, setRowData] = useState<any>({});
  const [comment, setComment] = useState<string>('');
  const [open, setOpen] = useState(false);
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
    amountCash: '',
    amountCard: '',
  };

  const [filterValues, setFilterValues] =
    useState<intialFilterProps>(intialFilter);

  const handleClickCommet = (e: any) => {
    setOpen(true);
    setRowData(e);
    setComment('');
  };

  const { response, resComment, listmobile, listdesktop, header2, columns } =
    useHistory({
      filterValues: filterValues,
      handleClickCommet,
    });

  const handleAllClose = () => {
    setOpen(false);
    setRowData({});
    setComment('');

    dispatch(
      setSideDrawer({
        openRow: false,
        chosenRow: {},
        content: null,
      })
    );
  };

  const handleRow = (e: any) => {
    if (e.col13 !== '') {
      dispatch(
        setSideDrawer({
          openRow: true,
          chosenRow: e,
          content: (
            <SideDrawer
              onAllClose={handleAllClose}
              handleEdit={() => handleEdit(e.col13)}
              handleDelete={() => handleDelete(e.id)}
              disable={disable}
              comment={e.col13}
            />
          ),
        })
      );
      setRowData(e);
      setComment(e.col13);
    } else {
      dispatch(
        setSideDrawer({
          openRow: false,
          chosenRow: e,
          content: null,
        })
      );
      setRowData(e);
      setComment('');
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

  const handlechangePage = (e: any) => {
    setFilterValues({ ...filterValues, page: e });
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
              onAllClose={handleAllClose}
              handleEdit={(comment: any) => handleEdit(comment)}
              handleDelete={(id: any) => handleDelete(id)}
              disable={resComment.isLoading}
              comment={true}
              onClickRow={handleRow}
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
                    <CloseWrapBut>
                      <IconButton
                        onClick={() => {
                          setOpen(false);
                          handleAllClose();
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </CloseWrapBut>
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
                    padding={{ mobile: '0 10px' }}
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
                    padding={{ mobile: '0 10px' }}
                    startIcon={width > 600 ? <SaveIcon /> : null}
                    endIcon={width < 600 ? <SaveIcon /> : null}
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
