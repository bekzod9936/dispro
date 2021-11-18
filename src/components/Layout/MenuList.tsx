import { useHistory } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { sidebar } from "./sidebar";
import { setCurrentPage } from "../../services/redux/Slices/partnerSlice";
import { useAppDispatch } from "../../services/redux/hooks";
import { useLocation } from "react-router-dom";
import { SettingIcon, WrapList, ListText, ListI } from "./style";
import { useTranslation } from "react-i18next";

const MenuList = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const pathName: string[] = location.pathname.split("/");

  return (
    <WrapList>
      <List>
        {sidebar.map(({ Icon, text, path }) => {
          let currentpath = path.split("/");
          return (
            <ListI
              button
              key={text}
              onClick={() => {
                history.push(`/${path}`);
                dispatch(setCurrentPage(path));
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
        })}
      </List>
      <List>
        <ListI
          button
          key="settings"
          onClick={() => {
            history.push(`/settings/loyality`);
            dispatch(setCurrentPage("settings"));
          }}
          selected={pathName[1] === "settings" ? true : false}
        >
          <ListItemIcon>
            <SettingIcon />
          </ListItemIcon>
          <ListText primary={t("settings")} />
        </ListI>
      </List>
    </WrapList>
  );
};

export default MenuList;
