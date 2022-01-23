import { SideBar } from 'pages/CompanyPages/clients/components/SideBar';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import {
  resetCurrentCoupon,
  setCurrentCoupon,
} from 'services/redux/Slices/proposals/proposals';
import { RootState } from 'services/redux/store';
import { CouponBar } from '../../components/CouponSideBar';
import { Wrapper } from './style';
import { useCanceled } from './useCanceled';
import Input from 'components/Custom/Input';
import { useDebounce } from 'use-debounce/lib';
import { SearchIcon } from 'assets/icons/ClientsPageIcons/ClientIcons';
import Spinner from 'components/Helpers/Spinner';
import { IDeferred } from 'services/redux/Slices/proposals/types';
import { CouponCard } from '../../components/CouponCard';
import { EmptyPage } from '../Drafts/components/EmptyPage';
import { Container, SearchIconWrapper } from '../Drafts/style';
import useWindowWidth from 'services/hooks/useWindowWidth';
import { CouponList } from '../../components/CouponList';
import FullModal from 'components/Custom/FullModal';
import { FullSideBar } from '../../components/FullSideBar';
import { TabletCard } from '../../components/TabletCard';
const Canceled = () => {
  const dispatch = useAppDispatch();
  const { currentCoupon, canceled } = useAppSelector(
    (state: RootState) => state.proposals
  );
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>('');
  const [debounced] = useDebounce(value, 300);
  const { refetch, isFetching } = useCanceled({ query: debounced, dispatch });
  const { width } = useWindowWidth();
  const handleReset = () => {
    dispatch(resetCurrentCoupon());
  };
  const handleOpen = (id: number) => {
    dispatch(setCurrentCoupon({ id, location: 'canceled' }));
    setOpen(true);
  };

  React.useEffect(() => {
    dispatch(resetCurrentCoupon());
  }, []);

  const coupons = () => {
    if (width <= 1000 && width > 600) {
      return canceled.map((el: IDeferred) => (
        <TabletCard
          stats={el.stat}
          isSelected={currentCoupon.id === el.id}
          onClick={() => handleOpen(el.id)}
          key={el.id}
          image={el.image}
          title={el.title}
          ageFrom={el.ageFrom}
          type={el.type}
          categoryIds={el.categoryIds}
          description={el.description}
          price={el.price}
          value={el.value}
          count={el.count} />
      ))
    }
    else if (width > 600) {
      return canceled.map((el: IDeferred) => (
        <CouponCard
          stats={el.stat}
          isSelected={currentCoupon.id === el.id}
          onClick={() => handleOpen(el.id)}
          key={el.id}
          img={el.image}
          title={el.title}
          ageFrom={el.ageFrom}
          type={el.type}
          categoryIds={el.categoryIds}
          description={el.description}
          price={el.price}
          value={el.value}
          count={el.count}
        />
      ));
    } else {
      return (
        <CouponList location='canceled' onClick={setOpen} coupons={canceled} />
      );
    }
  };
  return (
    <Wrapper>
      {width > 600 ? (
        <SideBar maxWidth='370px' isOpen={open}>
          <CouponBar
            canceled
            refetch={refetch}
            resetCoupon={handleReset}
            currentCoupon={currentCoupon}
            onClose={setOpen}
          />
        </SideBar>
      ) : (
        <FullModal open={open}>
          <FullSideBar rePublish refetch={refetch} onClose={setOpen} />
        </FullModal>
      )}
      <Input
        error={canceled.length === 0 && !isFetching && !!value}
        message={'По запросу ничего не найдено'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        IconStart={
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
        }
        placeholder='Поиск...'
        margin={{ laptop: '0 0 20px 0' }}
        inputStyle={{ border: 'none' }}
        width={{ maxwidth: 500, width: '100%' }}
      />
      <Container isFullScreen={canceled.length === 0 || isFetching}>
        {isFetching ? <Spinner /> : canceled.length === 0 ? <EmptyPage /> : coupons()}
      </Container>
    </Wrapper>
  );
};

export default Canceled;
