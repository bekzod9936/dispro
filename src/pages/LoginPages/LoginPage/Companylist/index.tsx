import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useHistory } from "react-router";
import { Tooltip } from "@material-ui/core";
import { useSetRecoilState } from "recoil";
//styles
import {
  Container,
  PlusIcon,
  Wrap,
  Box,
  Text,
  Img,
  Main,
  ChooseText,
  ImgDiv,
} from "./style";
//assets
import LogoDef from "assets/icons/SideBar/logodefault.png";
//queries
import { getPermission } from "services/queries/staffQuery";
import { enterCompany } from "services/queries/partnerQuery";
//hooks
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import useList from "./useList";
import useFirebase from "services/hooks/useFirebase";
// actions
import {
  refetchCompanyList,
  setBackAddCompany,
  setRegFilled,
} from "services/redux/Slices/authSlice";
//components
import Spinner from "components/Helpers/Spinner";
import AddCompany from "../AddCompany";
import { setPermissions } from "services/atoms/permissions";
import {
  permissionsSelector,
  setPermissions as setPermissionsRedux,
} from "services/redux/Slices/permissions";
// import { handleClick } from "services/redux/Slices/settingsSlice";

const Companylist = () => {
  useFirebase();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [id, setId] = useState(null);
  const history = useHistory();
  const userType = localStorage.getItem("userType");
  const permissionsList = useAppSelector(permissionsSelector);
  const { data, isLoading, refetch, isFetching } = useList();
  const companyList = data?.data.data;
  const setPermission = useSetRecoilState(setPermissions);

  //reducers
  const backAddCompany = useAppSelector((state) => {
    return state.auth.backAddCompany;
  });
  const regFilled = useAppSelector((state) => {
    return state.auth.regFilled;
  });

  const permissions = useMutation((data: any) => getPermission(data), {
    onSuccess: (data) => {
      const permitData = data.data.data.permissions;

      //!delete recoil setters
      setPermission({ permissions: permitData });

      dispatch(setPermissionsRedux(permitData));
      console.log(permitData, "permit data");
    },
    onError: (e) => {
      console.log(e, "error");
    },
  });

  const company = useMutation((values: any) => enterCompany(values), {
    onSuccess: async (data) => {
      const refData = data.data.data;
      if (userType === "4") {
        await permissions.mutate(refData.staffId);
        await localStorage.setItem("staffId", refData.staffId);
      }
      await localStorage.setItem("companyId", refData.companyId);
      await localStorage.setItem("companyToken", refData.accessToken);
      if (regFilled?.filled && regFilled.filledAddress) {
        await history.push("/statistics/clients");
      } else {
        await history.push("/info/about");
      }
    },
  });

  dispatch(refetchCompanyList(refetch));

  const handleAddCompany = () => {
    dispatch(setBackAddCompany(true));
  };

  const handleEnterCompany = async (values: any) => {
    await company.mutate(values);
  };

  const handleTap = async (v: any) => {
    await setId(v.company.id);
    await dispatch(
      setRegFilled({
        filled: v.company.filled,
        filledAddress: v.company.filledAddress,
      })
    );
    await handleEnterCompany({
      companyId: v.company.id,
      companyType: v.company.type,
    });
  };

  const addCompany = () => {
    if (isLoading || isFetching) {
      return <Spinner />;
    } else if (companyList?.length === 0) {
      return (
        <Box onClick={handleAddCompany}>
          <Wrap border="1.5px dashed #606eea">
            <PlusIcon />
          </Wrap>
          <Text color="#606EEA">{t("addCompany")}</Text>
        </Box>
      );
    } else {
      return (
        <Container>
          {userType !== "4" && (
            <Box onClick={handleAddCompany}>
              <Wrap border="1.5px dashed #606eea">
                <PlusIcon />
              </Wrap>
              <Text color="#606EEA">{t("addCompany")}</Text>
            </Box>
          )}
          {companyList?.map((v: any) => (
            <Tooltip title={v.company.name} arrow>
              <Box
                key={v.company.id}
                onClick={() => handleTap(v)}
                style={{
                  pointerEvents: company.isLoading ? "none" : "all",
                }}
                loading={v.company.id === id ? company.isLoading : false}
              >
                <Wrap>
                  <ImgDiv>
                    <Img
                      src={v.company.logo === "" ? LogoDef : v.company.logo}
                      alt="Company-Logo"
                      objectFit="contain"
                    />
                  </ImgDiv>
                </Wrap>
                <Text color="#223367">
                  <div>{v.company.name}</div>
                </Text>
              </Box>
            </Tooltip>
          ))}
        </Container>
      );
    }
  };

  if (backAddCompany) {
    return <AddCompany />;
  }
  return (
    <Main>
      <ChooseText>{t("choose-company")}</ChooseText>
      {addCompany()}
    </Main>
  );
};

export default Companylist;
