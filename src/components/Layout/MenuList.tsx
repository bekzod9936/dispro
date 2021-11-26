import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useAppDispatch } from "../../services/redux/hooks";
//components
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
//constants
import { SettingIcon, WrapList, ListText, ListI } from "./style";
//selector
import { setCurrentScreen } from "services/atoms/partner/selector";
//slices
import { setCurrentPage } from "../../services/redux/Slices/partnerSlice";
//hooks
import { useSideBar } from "./sidebar";
//atoms
import { permissionList, setLocalPermission } from "services/atoms/permissions";

const MenuList = () => {
  const userType = localStorage.getItem("userType");
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const pathName: string[] = location.pathname.split("/");
  const { sideList: sidebar } = useSideBar();
  const { permissions } = useRecoilValue(permissionList);

  //recoil
  const setCurrentP = useSetRecoilState(setCurrentScreen);
  const setLPermission = useSetRecoilState(setLocalPermission);

  return (
    <WrapList>
      <List>
        {sidebar.map(({ Icon, text, path, permission }: any) => {
          let currentpath = path.split("/");
          console.log(permission, "permission");
          if (
            permission?.includes(2) ||
            permission.includes(1) ||
            userType === "2"
          ) {
            return (
              <ListI
                button
                key={text}
                onClick={() => {
                  history.push(`/${path}`);
                  dispatch(setCurrentPage(path));
                  setCurrentP({ currentPage: path });
                  setLPermission(permission);
                }}
                selected={
                  pathName[1] === currentpath[0] || pathName[1] === path
                    ? true
                    : false
                }
              >
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListText primary={t(text)} />
              </ListI>
            );
          } else {
            return null;
          }
        })}
      </List>
      {permissions && (
        <List>
          <ListI
            button
            key="settings"
            onClick={() => {
              history.push(`/settings/loyality`);
              dispatch(setCurrentPage("settings"));
              setCurrentP({ currentPage: "settings" });
            }}
            selected={pathName[1] === "settings" ? true : false}
          >
            <ListItemIcon>
              <SettingIcon />
            </ListItemIcon>
            <ListText primary={t("settings")} />
          </ListI>
        </List>
      )}
    </WrapList>
  );
};

export default MenuList;
