import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DayList from './DayList';
import { Container } from './style';

const WorkingHours = () => {
  const { t } = useTranslation();
  const [id, setId] = useState(0);
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

  const [time, setTime] = useState('');

  const handleTimeFrom = (e: any) => {
    setTime(e.target.value);
  };

  const handleTimeTo = (e: any) => {};

  const handleRadio = (e: any) => {
    console.log(e.target.value);
  };

  return (
    <Container>
      {work.map((v) => (
        <DayList list={v} />
      ))}
    </Container>
  );
};

export default WorkingHours;
