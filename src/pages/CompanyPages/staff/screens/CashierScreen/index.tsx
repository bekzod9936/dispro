import Spinner from "components/Helpers/Spinner";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { numberWith } from "services/utils";
import { useDebounce } from "use-debounce/lib";
import Button from "components/Custom/Button";
import CashierTable from "../../components/CashierTable";
import { SideBar } from "../../components/SideBar";
import useCashiers from "../../hooks/useCashiers";
import { SpinnerDiv, EmptyContainer, EmptyLeft, EmptyRight } from "../../style";
import CashierBar from "./components/CashierBar";
import { ReactComponent as EmptyCashier } from "assets/images/staffs_empty.svg";
import { ReactComponent as AddCashier } from "assets/icons/add_cashier.svg";
import { CashierDiv, Text, Break } from "./style";
import { setOpenCash, setOpenFilter } from "services/redux/Slices/staffs";

const CashierScreen = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.staffs.openFilter);
  const query = useAppSelector((state) => state.staffs.query);
  const cashiers = useAppSelector((state) => state.staffs.cashiers);
  const selectedCashiers = useAppSelector(
    (state) => state.staffs.selectedCashiers
  );

  const [period, setPeriod] = useState({
    startDate: "",
    endDate: "",
  });

  const [page, setPage] = useState("1");
  const [debouncedQuery] = useDebounce(query, 300);

  const { response } = useCashiers({
    page: page,
    query: debouncedQuery,
    period,
  });

  useEffect(() => {
    return () => {
      dispatch(setOpenFilter(false));
    };
  }, []);

  return (
    <CashierDiv>
      {response.isLoading ? (
        <SpinnerDiv>
          <Spinner />
        </SpinnerDiv>
      ) : cashiers?.length > 0 ? (
        <CashierTable
          cashiers={cashiers.map((cashier: any) => {
            return {
              ...cashier,
              firstName: cashier?.firstName + " " + cashier?.lastName,
              score: numberWith(cashier?.addInfo?.avgRating, " "),
              avgCheque: numberWith(cashier?.addInfo?.avgCheque, " "),
              clients: numberWith(cashier?.addInfo?.countClient, " "),
              operations: numberWith(cashier?.addInfo?.countOperation, " "),
              amountOperation: numberWith(
                cashier?.addInfo?.amountOperation,
                " "
              ),
              countRefer: numberWith(cashier?.addInfo?.countRefer, " "),
            };
          })}
        />
      ) : (
        <EmptyContainer>
          <EmptyLeft>
            <EmptyCashier />
          </EmptyLeft>
          <EmptyRight>
            <Text>
              На данный момент кассиры в компании отсутствуют. Добавьте кассира,
              для внесения оплат клиентами.
            </Text>
            <Break />
            <Button
              onClick={() => {
                dispatch(setOpenCash(true));
              }}
              startIcon={<AddCashier />}
            >
              Добавить кассира
            </Button>
          </EmptyRight>
        </EmptyContainer>
      )}
      <SideBar isOpen={open}>Salom</SideBar>
      <SideBar isOpen={selectedCashiers.length}>
        <CashierBar />
      </SideBar>
    </CashierDiv>
  );
};

export default CashierScreen;
