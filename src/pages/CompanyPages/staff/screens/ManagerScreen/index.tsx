import { useState } from "react";
import { ManagerDiv, Text, Break } from "./style";
import { ReactComponent as EmptyManager } from "assets/icons/manager_empty.svg";
import { ReactComponent as AddManager } from "assets/icons/add_manager.svg";
import ManagerTable from "../../components/ManagerTable";
import useManagers from "../../hooks/useManagers";
import { useAppSelector } from "services/redux/hooks";
import { useDebounce } from "use-debounce/lib";
import { SpinnerDiv, EmptyContainer, EmptyLeft, EmptyRight } from "../../style";
import Spinner from "components/Helpers/Spinner";
import Button from "components/Custom/Button";

const ManagerScreen = () => {
  const query = useAppSelector((state) => state.staffs.query);
  const managers = useAppSelector((state) => state.staffs.managers);
  const [period, setPeriod] = useState({
    startDate: "",
    endDate: "",
  });
  const [page, setPage] = useState("1");
  const [debouncedQuery] = useDebounce(query, 300);

  const { response } = useManagers({
    page: page,
    query: debouncedQuery,
    period,
  });

  return (
    <ManagerDiv>
      {response.isLoading ? (
        <SpinnerDiv>
          <Spinner />
        </SpinnerDiv>
      ) : managers?.length > 0 ? (
        <ManagerTable
          managers={managers.map((manager: any) => {
            return {
              ...manager,
              firstName: manager?.firstName + " " + manager?.lastName,
            };
          })}
        />
      ) : (
        <EmptyContainer>
          <EmptyLeft>
            <EmptyManager />
          </EmptyLeft>
          <EmptyRight>
            <Text>
              На данный момент менеджеры в компании отсутствуют. Добавьте
              менеджера, для большего контроля организации.
            </Text>
            <Break />
            <Button
              onClick={() => {
                // dispatch(setOpenCash(true));
              }}
              startIcon={<AddManager />}
            >
              Добавить менеджера
            </Button>
          </EmptyRight>
        </EmptyContainer>
      )}
    </ManagerDiv>
  );
};

export default ManagerScreen;
