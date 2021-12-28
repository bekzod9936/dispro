import Input from "components/Custom/Input";
import Spinner from "components/Custom/Spinner";
import { useTranslation } from "react-i18next";
import { SearchIcon } from "newassets/icons/icons";
import { Container, Header, Body } from "./style";
import FilterQr from "./components/FilterQr";
import BoxQr from "./components/BoxQr";
import useQrcode from "./useQrcode";
import { useAppSelector } from "services/redux/hooks";
import CreateQrCode from "./components/CreateQrCode";
import { useState } from "react";

const QrCodes = () => {
  const { t } = useTranslation();

  const { resRefQrCodes, resBranchesQrCodes } = useQrcode();

  const [filterType, setFilterType] = useState(null);
  const data = useAppSelector((state) => state.newsetting.refQrcodes);

  const dataBranchQrcodes = useAppSelector(
    (state) => state.newsetting.branchQrcodes
  );

  const [searchResRef, setSearchResRef] = useState<any>([]);
  const [searchResBranches, setSearchResRefBranches] = useState<any>([]);
  const [inpuSearch, setInpuSearch] = useState<string>("");
  const [searchFocus, setSearchFocus] = useState<boolean>(false);

  const handleSearch = (e: any) => {
    setInpuSearch(e.target.value);
    const searchResultRef = data?.filter((v: any) => {
      return v.source.toLowerCase().includes(e.target.value?.toLowerCase());
    });
    const searchResultBranches = dataBranchQrcodes?.filter((v: any) => {
      return v.name.toLowerCase().includes(e.target.value?.toLowerCase());
    });
    setSearchResRefBranches(searchResultBranches);
    setSearchResRef(searchResultRef);
  };

  return (
    <Container>
      <Header>
        <CreateQrCode />
        <FilterQr filterType={filterType} setFilterType={setFilterType} />
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
          onChange={handleSearch}
          type="search"
          onFocus={() => setSearchFocus(true)}
          onBlur={() => (inpuSearch === "" ? setSearchFocus(false) : null)}
          value={inpuSearch}
        />
      </Header>
      <Body>
        {resRefQrCodes.isLoading || resBranchesQrCodes.isLoading ? (
          <Spinner />
        ) : (
          <div>
            {filterType === "ref"
              ? null
              : !searchFocus || inpuSearch === ""
              ? data?.map((v: any) => (
                  <BoxQr
                    key={v.id}
                    link={v.dynLinkToken}
                    name={v.source}
                    id={v.id}
                  />
                ))
              : searchResRef?.map((v: any) => (
                  <BoxQr
                    key={v.id}
                    link={v.dynLinkToken}
                    name={v.source}
                    id={v.id}
                  />
                ))}

            {filterType === "branches"
              ? null
              : !searchFocus || inpuSearch === ""
              ? dataBranchQrcodes?.map((v: any) => {
                  if (v.active) {
                    return (
                      <BoxQr
                        key={v.id}
                        link={v.dynLink}
                        name={v.name}
                        id={v.id}
                        branch={true}
                      />
                    );
                  } else {
                    return null;
                  }
                })
              : searchResBranches?.map((v: any) => {
                  if (v.active) {
                    return (
                      <BoxQr
                        key={v.id}
                        link={v.dynLink}
                        name={v.name}
                        id={v.id}
                        branch={true}
                      />
                    );
                  } else {
                    return null;
                  }
                })}
            <div style={{ height: "5px", width: "100%" }} />
          </div>
        )}
      </Body>
    </Container>
  );
};
export default QrCodes;
