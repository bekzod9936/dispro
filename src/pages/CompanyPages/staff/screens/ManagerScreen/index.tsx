import { useState } from "react";
import { ManagerDiv } from "./style";
import ManagerTable from "../../components/ManagerTable";
import useManagers from "../../hooks/useManagers";
import { useAppSelector } from "services/redux/hooks";
import { useDebounce } from "use-debounce/lib";
import { SpinnerDiv } from "../../style";
import Spinner from "components/Helpers/Spinner";

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
      ) : (
        <ManagerTable
          managers={managers.map((manager: any) => {
            return {
              ...manager,
              firstName: manager?.firstName + " " + manager?.lastName,
            };
          })}
        />
      )}
    </ManagerDiv>
  );
};

export default ManagerScreen;
