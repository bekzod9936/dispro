const headers: any = [
    "check",
    "client",
    "DiscountSum",
    "PointSum",
    "CashbackSum",
    "gender",
    "age",
  ];
  
const extraHeaders: any = [
  "purchuase_amount",
  "paid",
  "recomendations",
  "traffic_providers",
  "level",
  "last_purchase",
];

export const totalHeaders: any = [...headers, ...extraHeaders].filter(
  (item) => item !== "check"
);

export const tableHeaders = [...headers, ...extraHeaders];