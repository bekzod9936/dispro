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

const QrCodes = () => {
  const { t } = useTranslation();

  const { resRefQrCodes, resBranchesQrCodes } = useQrcode();

  const data = useAppSelector((state) => state.newsetting.refQrcodes);

  const dataBranchQrcodes = useAppSelector(
    (state) => state.newsetting.branchQrcodes
  );

  return (
    <Container>
      <Header>
        <CreateQrCode />
        <FilterQr />
        <Input
          IconStart={<SearchIcon />}
          inputStyle={{
            shadow: "0px 4px 4px rgba(0, 0, 0, 0.04)",
            border: "none",
            outpadding: "0 0 0 20px",
            height: { desktop: 50, laptop: 45 },
          }}
          type="search"
          placeholder={t("searchbyqrcode")}
          margin={{ laptop: "0 0 0 20px", mobile: "0 20px" }}
          width={{ maxwidth: 500 }}
        />
      </Header>
      <Body>
        {resRefQrCodes.isLoading && resBranchesQrCodes.isLoading ? (
          <Spinner />
        ) : (
          <div>
            {data?.map((v: any) => (
              <BoxQr
                key={v.id}
                link={v.dynLinkToken}
                name={v.source}
                id={v.id}
              />
            ))}
            {dataBranchQrcodes?.map((v: any) => {
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
