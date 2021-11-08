import { Checkbox } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DayList from './DayList';
import { Container, Label } from './style';

interface Props {
  workingTime?: {
    aroundTheClock?: boolean;
    work?: {
      day: number;
      dayOff: boolean;
      wHours: { from?: string; to?: string };
      bHours: { from?: string; to?: string };
      weekday: string;
    }[];
  } | null;
  getTime: (e: any) => void;
}

interface WProps {
  day: number;
  dayOff: boolean;
  wHours: { from?: string; to?: string };
  bHours: { from?: string; to?: string };
  weekday: string;
}

const WorkingHours = ({ workingTime, getTime = () => {} }: Props) => {
  const { t } = useTranslation();
  const [check, setCheck] = useState<boolean>(false);
  
  const [work, setWork] = useState<WProps[]>();

  useEffect(() => {
    const check: boolean = workingTime?.aroundTheClock || false;
    setWork(workingTime?.work);
    setCheck(check);
  }, [workingTime]);

  const handleCheck = (e: any) => {
    setCheck(e.target.checked);
    getTime({ aroundTheClock: e.target.checked, work: work });
    console.log(e);
  };

  const handleChangeTime = (e: any) => {
    const newDate = work?.map((v: any) => {
      if (v.day === e.day) {
        return {
          day: v.day,
          dayOff: e?.dayOff === undefined ? v.dayOff : e?.dayOff,
          wHours: e?.wHours
            ? {
                from: e?.wHours?.from ? e?.wHours?.from : v?.wHours?.from,
                to: e?.wHours?.to ? e?.wHours?.to : v?.wHours?.to,
              }
            : v?.wHours,
          bHours: e?.bHours
            ? {
                from: e?.bHours?.from ? e?.bHours?.from : v?.bHours?.from,
                to: e?.bHours?.to ? e?.bHours?.to : v?.bHours?.to,
              }
            : v?.bHours,
          weekday: v?.weekday,
        };
      } else {
        return v;
      }
    });
    setWork(newDate);
    getTime({ aroundTheClock: check, work: newDate });
  };

  const handleCopy = (id: any) => {
    if (id) {
      const newDate = work?.map((v: any) => {
        const sort = work?.filter((i: any) => i.day === id);
        return {
          day: v.day,
          dayOff: sort[0].dayOff,
          wHours: sort[0].wHours,
          bHours: sort[0].bHours,
          weekday: v.weekday,
        };
      });
      setWork(newDate);
      getTime({ aroundTheClock: check, work: newDate });
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
          {work?.map((v: any) => (
            <DayList list={v} onCopy={handleCopy} all={work} onChange={handleChangeTime} />
          ))}
        </Container>
      )}
    </>
  );
};

export default WorkingHours;
