import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

//helpers
import {
  setOpenCash,
  setOpenFilter,
  setOpenManager,
  setQuery,
  setSelectedCashiers,
} from 'services/redux/Slices/staffs';
import { useAppSelector, useAppDispatch } from 'services/redux/hooks';

//components
import Button from 'components/Custom/Buttons/Button';
import Input from 'components/Custom/Input';
import Popover from 'components/Custom/Popover';

//styles
import { SearchIcon } from 'components/Layout/Header/style';
import { StaffPopover, PopoverRow, Flex } from '../../style';

//types
import { IProps } from './types';

//icons
import { ReactComponent as ArrowDown } from 'assets/icons/arrow_down.svg';
import { ReactComponent as SettingsIcon } from 'assets/icons/settings_icon.svg';
import { ReactComponent as FilterIcon } from 'assets/icons/StatistisPage/filter.svg';
import { AddIcon } from 'assets/icons/InfoPageIcons/InfoPageIcons';

const Header = ({
  handleOpen,
  handleClose,
  closeFun,
  handleOpenSetting,
}: IProps) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const query = useAppSelector((state) => state.staffs.query);
  const open = useAppSelector((state) => state.staffs.openFilter);
  const { t } = useTranslation();

  return (
    <Flex
      width='95%'
      justifyContent='flex-start'
      alignItems='center'
      margin='0'
    >
      <Popover
        click={
          <Button
            onClick={handleOpen}
            buttonStyle={{
              bgcolor: '#FFFFFF',
              color: '#223367',
              weight: 500,
              height: { desktop: 60 },
            }}
            margin={{
              desktop: '0 25px 0 0',
              laptop: '0 25px 0 0',
              planshet: '0 0 20px 0',
            }}
            startIcon={<AddIcon />}
            endIcon={<ArrowDown />}
          >
            {t('create')}
          </Button>
        }
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        popoverStyle={{ marginTop: '20px' }}
        onClose={handleClose}
      >
        <StaffPopover>
          <PopoverRow
            onClick={() => {
              closeFun?.close();
              dispatch(setOpenCash(true));
            }}
          >
            {t('cashier')}
          </PopoverRow>

          <PopoverRow
            onClick={() => {
              closeFun?.close();
              dispatch(setOpenManager(true));
            }}
            light={true}
          >
            {t('manager')}
          </PopoverRow>
        </StaffPopover>
      </Popover>

      {/* Settings side  */}
      {location.pathname !== '/staff/manager' && (
        <Button
          onClick={
            location.pathname !== '/staff/manager/setting'
              ? handleOpenSetting
              : () => {
                  console.log('Manager');
                }
          }
          buttonStyle={{
            bgcolor: '#FFFFFF',
            color: '#223367',
            weight: 500,
            height: { desktop: 60 },
          }}
          margin={{
            desktop: '0 25px 0 0',
            laptop: '0 25px 0 0',
            planshet: '0 0 20px 0',
          }}
          startIcon={<SettingsIcon />}
        >
          {t('settings')}
        </Button>
      )}

      {/* Filter side  */}
      {location.pathname !== '/staff/manager' && (
        <Button
          buttonStyle={{
            shadow: '0px 4px 4px rgba(0, 0, 0, 0.04)',
            bgcolor: '#FFFFFF',
            color: '#223367',
            weight: 500,
            height: { desktop: 60 },
          }}
          margin={{
            desktop: '0 25px 0 0',
            laptop: '0 25px 0 0',
            planshet: '0 0 20px 0',
          }}
          startIcon={<FilterIcon />}
          onClick={() => {
            dispatch(setOpenFilter(!open));
            dispatch(setSelectedCashiers([]));
          }}
        >
          {t('filters')}
        </Button>
      )}

      {/* <div style={{ width: '70px' }} /> */}
      <Input
        inputStyle={{ border: 'none' }}
        IconStart={<SearchIcon style={{ marginLeft: 20 }} />}
        value={query}
        placeholder='Поиск по сотрудникам'
        onChange={(e) => dispatch(setQuery(e.target.value))}
        width={{ maxwidth: 700 }}
      />
    </Flex>
  );
};

export default Header;
