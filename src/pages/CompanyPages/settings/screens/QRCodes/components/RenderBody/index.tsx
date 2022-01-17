import notfoundsearch from "assets/images/notfoundsearch.png";
import RenderData from "../RenderData";
import Spinner from "components/Custom/Spinner";
import useQrcode from "../../useQrcode";
import { useAppSelector } from "services/redux/hooks";
import { ImgDiv, WrapDef, DefDiv, Container, PaddingDiv } from "./style";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";

const RenderBody = ({ state }: any): any => {
  const { t } = useTranslation();
  const { resRefQrCodes, resBranchesQrCodes } = useQrcode();

  const dataPayments = useAppSelector((state) => state.newsetting.refQrcodes);

  const dataBranchQrcodes = useAppSelector(
    (state) => state.newsetting.branchQrcodes
  )?.filter((v: any) => v.active);

  const defImg = (
    <WrapDef>
      <ImgDiv>
        <LazyLoadImage effect="blur" src={notfoundsearch} alt="defimage" />
      </ImgDiv>
      <DefDiv>{t("notfoundsearchsetting")}</DefDiv>
    </WrapDef>
  );

  if (resRefQrCodes.isLoading || resBranchesQrCodes.isLoading) {
    return <Spinner />;
  } else {
    if (
      state.inpuSearch !== "" &&
      state.searchResBranches.length === 0 &&
      state.searchResRef.length === 0 &&
      state.filterType === ""
    ) {
      return defImg;
    } else {
      return (
        <Container>
          {state.filterType === "ref" ? null : state.inpuSearch === "" ? (
            <RenderData arr={dataPayments} />
          ) : state.searchResRef.length === 0 &&
            state.filterType === "branches" ? (
            defImg
          ) : (
            <RenderData arr={state.searchResRef} />
          )}
          {state.filterType === "branches" ? null : state.inpuSearch === "" ? (
            <RenderData arr={dataBranchQrcodes} branch={true} />
          ) : state.searchResBranches.length === 0 &&
            state.filterType === "ref" ? (
            defImg
          ) : (
            <RenderData arr={state.searchResBranches} branch={true} />
          )}
          <PaddingDiv />
        </Container>
      );
    }
  }
};

export default RenderBody;
