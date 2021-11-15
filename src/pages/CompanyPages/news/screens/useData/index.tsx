import { useAppSelector } from "services/redux/hooks";
import moment from "moment";
export const months = [
  "Января ",
  "Февраля ",
  "Марта ",
  "Апреля ",
  "Мая ",
  "Июня ",
  "Июля ",
  "Августа ",
  "Сентября ",
  "Октября ",
  "Ноября ",
  "Декабря ",
];

const useData = () => {
  const data = useAppSelector((state) => state.news.NewsInfo.data);
  const list = data?.map((v: any) => {
    const startDate = moment(v?.startLifeTime).format("YYYY-MM-DD");
    const endDate = moment(v?.endLifeTime).format("YYYY-MM-DD");
    const startdates = new Date(startDate);
    const enddates = new Date(endDate);
    const startmonthName = months[startdates.getMonth()];
    const endmonthName = months[enddates.getMonth()];
    const startDays = startdates.getDate();
    const endDays = enddates.getDate();
    const years = enddates.getFullYear();

    const date =
      startDays +
      " " +
      startmonthName +
      " - " +
      endDays +
      " " +
      endmonthName +
      "" +
      years;

    const genderType =
      v?.genderType === 1
        ? "Мужчина"
        : v?.genderType === 2
        ? "Женщины"
        : "Для всех";
    return {
      fullData: {
        data: v,
        genderType: genderType,
        date: date,
      },
    };
  });

  return { list };
};
export default useData;
