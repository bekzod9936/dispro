import Popover from "components/Custom/Popover";
import Filter from "components/Custom/Filter/index";
import { AddIcon } from "assets/icons/InfoPageIcons/InfoPageIcons";
import { ReactComponent as ArrowDown } from "assets/icons/arrow_down.svg";
import { ReactComponent as SettingsIcon } from "assets/icons/settings_icon.svg";
import { SearchIcon } from "components/Layout/Header/style";
import Button from "components/Custom/Button";
import Input from "components/Custom/Input";
import { StaffPopover, PopoverRow, Flex } from "../../style";
import { useTranslation } from "react-i18next";
import { IProps } from "./types";
import { useAppSelector, useAppDispatch } from "services/redux/hooks";
import { setQuery } from "services/redux/Slices/staffs";

const Header = ({ handleOpen, handleClose, closeFun }: IProps) => {
  const dispatch = useAppDispatch();
  const query = useAppSelector((state) => state.staffs.query);
  const { t } = useTranslation();

  return (
    <Flex
      width="90%"
      justifyContent="space-between"
      alignItems="center"
      margin="0"
    >
      <Popover
        click={
          <Button
            onClick={handleOpen}
            buttonStyle={{
              bgcolor: "#FFFFFF",
              color: "#223367",
              weight: 500,
              height: { desktop: 60 },
            }}
            margin={{
              desktop: "0 25px 0 0",
              laptop: "0 25px 0 0",
              planshet: "0 0 20px 0",
            }}
            startIcon={<AddIcon />}
            endIcon={<ArrowDown />}
          >
            {t("create")}
          </Button>
        }
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        popoverStyle={{ marginTop: "20px" }}
        onClose={handleClose}
      >
        <StaffPopover>
          <PopoverRow
            onClick={() => {
              closeFun?.close();
            }}
          >
            {t("cashier")}
          </PopoverRow>

          <PopoverRow
            onClick={() => {
              closeFun?.close();
            }}
            light={true}
          >
            {t("manager")}
          </PopoverRow>
        </StaffPopover>
      </Popover>

      {/* Settings side  */}
      <Button
        onClick={handleOpen}
        buttonStyle={{
          bgcolor: "#FFFFFF",
          color: "#223367",
          weight: 500,
          height: { desktop: 60 },
        }}
        margin={{
          desktop: "0 25px 0 0",
          laptop: "0 25px 0 0",
          planshet: "0 0 20px 0",
        }}
        startIcon={<SettingsIcon />}
      >
        {t("settings")}
      </Button>
      {/* Filter side  */}
      <Filter onSubmit={() => {}} onReset={() => {}} />
      <div style={{ width: "70px" }} />
      <Input
        inputStyle={{ border: "none" }}
        IconStart={<SearchIcon style={{ marginLeft: 20 }} />}
        value={query}
        placeholder="Поиск по сотрудникам"
        onChange={(e) => dispatch(setQuery(e.target.value))}
        width={{ maxwidth: 700 }}
      />
    </Flex>
  );
};

export default Header;
