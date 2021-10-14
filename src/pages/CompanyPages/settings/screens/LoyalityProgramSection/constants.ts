export const initialFields: any = [
  {
    id: 0,
    name: "",
    percent: 0,
    requirements: [{ type: 1, amount: "", unit: "UZS", condition: "", id: 0 }],
  },
];

export const switchItems = [
  {
    title: "Предоставление скидки",
    text: "Клиент получает скидку при каждой покупке в размере определенного %",
    key: "discount",
  },
  {
    title: "Предоставление кешбэка",
    text: "Клиент получает кешбэк в виде реальных денег после каждой покупки",
    key: "cashback",
  },
  {
    title: "Предоставление баллов",
    text: "Клиент получает баллы после каждой покупки которые может потратить только у вас в компании",
    key: "bonuspoint",
  },
];
