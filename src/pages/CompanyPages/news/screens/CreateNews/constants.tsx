export const days = [
    {
        value: "monday",
        label: "Понедельник",
        id: 1
    },
    {
        value: "tuesday",
        label: "Вторник",
        id: 2
    },
    {
        value: "wednesday",
        label: "Среда",
        id: 3
    },
    {
        value: "thursday",
        label: "Четверг",
        id: 4
    },
    {
        value: "friday",
        label: "Пятница",
        id: 5
    },
    {
        value: "saturday",
        label: "Суббота",
        id: 6
    },
    {
        value: "sunday",
        label: "Воскресенье",
        id: 0
    }
]
export const genders = [
    {
      id: 1,
      label: "Для мужчин",
      value: "мужчин",
    },
    {
      id: 2,
      label: "Для женщин",
      value: "женщин",
    },
    {
        id: 0,
        label: "Для всех",
        value: "всех",
      },
  ];

  export const language = [
    {
      id: 1,
      label: "Uzbek",
      value: "Uzbek",
    },
    {
      id: 2,
      label: "Russian",
      value: "Russian",
    },
    {
        id: 3,
        label: "English",
        value: "English",
      },
  ];

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let nextdd = String(today.getDate()+1).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  export const nextDay=yyyy + "-" + mm + "-" + nextdd;
  export const todayDate=yyyy + "-" + mm + "-" + dd ;

