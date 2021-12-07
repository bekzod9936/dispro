import { useAppSelector } from "services/redux/hooks";
import dayjs from "dayjs";
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
    const startDate = dayjs(v?.startLifeTime).format("YYYY-MM-DD");
    const endDate = dayjs(v?.endLifeTime).format("YYYY-MM-DD");
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
        ? "Для мужчин"
        : v?.genderType === 2
        ? "Для женщин"
        : "Для всех";
        return {
            col1:v?.title,
            col2:v?.description,
            col3:genderType,
            col4:startDate,
            fullData: {
                data: v,
                date:date,
                genderType:genderType
              },
          }
  });

  return { list };
};
export default useData;
