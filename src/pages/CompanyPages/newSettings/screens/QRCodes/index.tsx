import { useEffect, useReducer } from "react";
import { useTranslation } from "react-i18next";
import Input from "components/Custom/Input";
import { SearchIcon } from "newassets/icons/icons";
import { Container, Header, Body } from "./style";
import FilterQr from "./components/FilterQr";
import { useAppSelector } from "services/redux/hooks";
import CreateQrCode from "./components/CreateQrCode";
import { reducerQr, initialState } from "./reducer";
import RenderBody from "./components/RenderBody";

const QrCodes = () => {
  const { t } = useTranslation();

  const [state, dispatchReducer] = useReducer(reducerQr, initialState);

  const dataPayments = useAppSelector((state) => state.newsetting.refQrcodes);

  const dataBranchQrcodes = useAppSelector(
    (state) => state.newsetting.branchQrcodes
  )?.filter((v: any) => v.active);

  const handleSearch = (value: any) => {
    const searchResultRef = dataPayments?.filter((v: any) => {
      return v.source.toLowerCase().includes(value?.toLowerCase());
    });
    const searchResultBranches = dataBranchQrcodes?.filter((v: any) => {
      return v.name.toLowerCase().includes(value?.toLowerCase());
    });
    dispatchReducer({ type: "setRef", payload: searchResultRef });
    dispatchReducer({ type: "setBranches", payload: searchResultBranches });
  };

  useEffect(() => {
    if (state.inpuSearch !== "") {
      handleSearch(state.inpuSearch);
    }
  }, [dataPayments, dataBranchQrcodes]);

  return (
    <Container>
      <Header>
        <CreateQrCode />
        <FilterQr
          filterType={state.filterType}
          setFilterType={dispatchReducer}
        />
        <Input
          IconStart={<SearchIcon />}
          inputStyle={{
            shadow: "0px 4px 4px rgba(0, 0, 0, 0.04)",
            border: "none",
            outpadding: "0 0 0 20px",
            height: { desktop: 50, laptop: 45 },
          }}
          placeholder={t("searchbyqrcode")}
          margin={{ laptop: "0 0 0 20px", mobile: "0 20px" }}
          width={{ maxwidth: 500 }}
          onChange={(e) => {
            dispatchReducer({ type: "change", payload: e.target.value });
            handleSearch(e.target.value);
          }}
          type="search"
          value={state.inpuSearch}
        />
      </Header>
      <Body>
        <RenderBody state={state} />
      </Body>
    </Container>
  );
};
export default QrCodes;
