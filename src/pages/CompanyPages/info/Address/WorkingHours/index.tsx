import { Checkbox } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../services/redux/hooks';
import {
  setAddressInfo,
  setCopyDate,
} from '../../../../../services/redux/Slices/infoSlice';
import DayList from './DayList';
import { Container, Label } from './style';

const WorkingHours = () => {
  const { t } = useTranslation();
  const [check, setCheck] = useState<boolean>(false);
  const dataAddress: any = useAppSelector(
    (state) => state.infoSlice.addressInfo
  );
  const dispatch = useAppDispatch();
  const copyDate: any = useAppSelector((state) => state.infoSlice.copyDate);

  useEffect(() => {
    console.log(dataAddress);
    if (dataAddress !== null) {
      const newData = work.map((v: any) => {
        const sort = dataAddress?.workingTime?.work.filter(
          (i: any) => i.day === v.day
        );
        if (sort[0]) {
          return { ...sort[0], weekday: v.weekday };
        } else {
          return v;
        }
      });
      setWork(newData);
      setCheck(dataAddress?.workingTime?.aroundTheClock);
    }
  }, [dataAddress]);

  const [work, setWork] = useState([
    {
      day: 1,
      dayOff: false,
      wHours: { from: '', to: '' },
      bHours: { from: '', to: '' },
      weekday: t('md'),
    },
    {
      day: 2,
      dayOff: false,
      wHours: { from: '', to: '' },
      bHours: { from: '', to: '' },
      weekday: t('td'),
    },
    {
      day: 3,
      dayOff: false,
      wHours: { from: '', to: '' },
      bHours: { from: '', to: '' },
      weekday: t('wd'),
    },
    {
      day: 4,
      dayOff: false,
      wHours: { from: '', to: '' },
      bHours: { from: '', to: '' },
      weekday: t('thd'),
    },
    {
      day: 5,
      dayOff: false,
      wHours: { from: '', to: '' },
      bHours: { from: '', to: '' },
      weekday: t('fd'),
    },
    {
      day: 6,
      dayOff: false,
      wHours: { from: '', to: '' },
      bHours: { from: '', to: '' },
      weekday: t('std'),
    },
    {
      day: 7,
      dayOff: false,
      wHours: { from: '', to: '' },
      bHours: { from: '', to: '' },
      weekday: t('sd'),
    },
  ]);

  const handleCheck = (e: any) => {
    setCheck(e.target.checked);
  };

  const handleChangeTime = (e: any) => {
    const newDate = work.map((v: any) => {
      if (v.day === e.day) {
        return {
          day: v.day,
          dayOff: e.dayOff ? (e.dayOff === 'dayOff' ? true : false) : v.dayOff,
          wHours: e.wHours
            ? {
                from: e.wHours.from ? e.wHours.from : v.wHours.from,
                to: e.wHours.to ? e.wHours.to : v.wHours.to,
              }
            : v.wHours,
          bHours: e.bHours
            ? {
                from: e.bHours.from ? e.bHours.from : v.bHours.from,
                to: e.bHours.to ? e.bHours.to : v.bHours.to,
              }
            : v.wHours,
          weekday: v.weekday,
        };
      } else {
        return v;
      }
    });
    setWork(newDate);
    dispatch(
      setAddressInfo({
        workingTime: { work: newDate, aroundTheClock: check },
      })
    );
  };

  const handleCopy = (id: any) => {
    if (id) {
      const newDate = work.map((v: any) => {
        const sort = work.filter((i: any) => i.day === id);
        return {
          day: v.day,
          dayOff: sort[0].dayOff,
          wHours: sort[0].wHours,
          bHours: sort[0].bHours,
          weekday: v.weekday,
        };
      });
      dispatch(setCopyDate(newDate));
    } else {
      dispatch(setCopyDate([]));
    }
  };

  return (
    <>
      <Checkbox
        id='aroundTheClock'
        color='primary'
        checked={check}
        onChange={handleCheck}
      />
      <Label htmlFor='aroundTheClock'>{t('24/7')}</Label>
      {check ? null : (
        <Container>
          {copyDate.length === 0
            ? work.map((v: any) => (
                <DayList
                  list={v}
                  onCopy={handleCopy}
                  onChange={handleChangeTime}
                />
              ))
            : copyDate.map((v: any) => (
                <DayList list={v} onCopy={handleCopy} />
              ))}
        </Container>
      )}
    </>
  );
};

export default WorkingHours;
