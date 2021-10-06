import React from "react";
import { useHistory } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { sidebar } from "./sidebar";
import { setCurrentPage } from "../../services/redux/Slices/partnerSlice";
import { useAppDispatch, useAppSelector } from "../../services/redux/hooks";
import { useLocation } from "react-router-dom";
import { SettingIcon, WrapList, ListText, ListI } from "./style";
import { useTranslation } from "react-i18next";

const MenuList = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const pathName: string[] = location.pathname.split("/");

  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.partner.currentPage);

  return (
    <WrapList>
      <List>
        {sidebar.map(({ Icon, text, path }) => {
          return (
            <ListI
              button
              key={text}
              onClick={() => {
                history.push(`/${path}`);
                dispatch(setCurrentPage(path));
              }}
              selected={pathName[1] === path ? true : false}
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
            history.push(`/settings`);
            dispatch(setCurrentPage("settings"));
          }}
          selected={currentPage === "settings" ? true : false}
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
