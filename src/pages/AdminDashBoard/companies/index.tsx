import { Suspense, lazy } from "react";
//hooks
import useData from "./hooks/useData";
import { useTranslation } from "react-i18next";
//style
import { SpinnerDiv } from "pages/CompanyPages/news/style";
import Spinner from "components/Helpers/Spinner";
import { Container, Title } from "./style";
import CompanyModal from "./components/CompanyModal";
import { useRecoilValue } from "recoil";
import { selectedCompany } from "services/atoms/admin_companies";
const CompaniesTable = lazy(() => import("./components/CompaniesTable"));

export const AdminCompanies = () => {
  const { isLoading } = useData();
  const { t } = useTranslation();
  const sCompany = useRecoilValue(selectedCompany);
  const open = sCompany?.id ? true : false;

  if (isLoading) {
    return (
      <SpinnerDiv>
        <Spinner />
      </SpinnerDiv>
    );
  }

  return (
    <Container>
      <Title>{t("companies")}</Title>
      <Suspense
        fallback={
          <SpinnerDiv>
            <Spinner />
          </SpinnerDiv>
        }
      >
        <CompaniesTable />
        {open ? <CompanyModal /> : null}
      </Suspense>
    </Container>
  );
};

export default AdminCompanies;
