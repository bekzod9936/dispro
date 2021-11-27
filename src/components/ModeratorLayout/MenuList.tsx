import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router";
//constants
import { WrapList, ListText, ListI } from "./style";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import useLayout from "./useLayout";

const MenuList = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const pathName: string[] = location.pathname.split("/");
  const { sidebar } = useLayout();

  return (
    <WrapList>
      <List>
        {sidebar.map(({ Icon, text, path }: any) => {
          return (
            <ListI
              button
              key={text}
              onClick={() => {
                history.push(`/${path}`);
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
    </WrapList>
  );
};

export default memo(MenuList);
