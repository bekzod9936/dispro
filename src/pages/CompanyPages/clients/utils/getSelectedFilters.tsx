import {
  CartIcon,
  CashBackIcon,
  DiscountIcon,
  DownIcon,
  GoBackIcon,
  HandIcon,
  MoneyBagIcon,
  MoneyStatsIcon,
  PointActionsIcon,
  RatingIcon,
} from "assets/icons/ClientsPageIcons/ClientIcons";
import { useTranslation } from "react-i18next";
import { IFilters } from "services/redux/Slices/clients/types";
import { RemoveFilterBtn } from "../components/Header/components/RemoveFilterBtn";
import { SelectedFilter } from "../components/Header/style";
import dayjs from "dayjs";
import { numberWith } from "services/utils";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { removeFilial } from "services/redux/Slices/clients";

export interface ITableHelperItem {
  date: string;
  amount: number;
  cashback: number;
  discount: number;
  name: string;
  point: number;
  status: number;
}

export interface ITableRecs {
  date: string;
  levelNumber: number;
  name: string;
  image: string;
}

export const getSelected = (obj: any): any => {
  return Object.keys(obj).reduce((object: any, el: any) => {
    if (typeof obj[el] === "string" || typeof obj[el] === "number") {
      if (obj[el]) {
        if (el === "gender") {
          object = {
            ...object,
            [el]: obj[el] === "1" ? "male" : "female",
          };
        } else if (el === "trafficProvider") {
          object = {
            ...object,
            [el]:
              obj[el] === "1" ? "App" : obj[el] === "2" ? "Mobile" : "Cashier",
          };
        } else {
          object = {
            ...object,
            [el]: obj[el],
          };
        }
      }
    } else {
      let res = {};
      for (let key in obj[el]) {
        if (obj[el][key]) {
          if (key.includes("From")) {
            res = {
              ...res,
              from: obj[el][key],
            };
          } else if (key.includes("To")) {
            res = {
              ...res,
              to: obj[el][key],
            };
          } else {
            res = {
              ...res,
              [key]: obj[el][key],
            };
          }
        }
      }
      object = {
        ...object,
        [el]: res,
      };
    }
    return object;
  }, {});
};

interface IProps {
  filters: IFilters;
  handleRemove: (arg: string) => void;
  referals: any[];
}
export const useHandleGetFilters = ({
  filters,
  handleRemove,
  referals,
}: IProps) => {
  const { t } = useTranslation();
  const { clientLevels } = useAppSelector((state) => state.clients);
  let result = [];
  const dispatch = useAppDispatch();
  const {
    gender,
    notless,
    regDate,
    purchaseAmount,
    trafficProvider,
    status,
    filials,
  } = filters;
  if (gender) {
    result.push(
      <SelectedFilter>
        <p>
          {t("gender")}: {Number(gender) === 1 ? t("male") : t("female")}
        </p>
        <RemoveFilterBtn onClick={() => handleRemove("gender")} />
      </SelectedFilter>
    );
  }
  if (notless && notless !== "") {
    result.push(
      <SelectedFilter>
        <p>
          {t("notless")}: {numberWith(notless + "", " ")} ??????
        </p>
        <RemoveFilterBtn onClick={() => handleRemove("notless")} />
      </SelectedFilter>
    );
  }
  if (regDate) {
    result.push(
      <SelectedFilter>
        {regDate?.regDateFrom && (
          <p>
            {t("from")}: {regDate?.regDateFrom}
          </p>
        )}
        {regDate?.regDateTo && (
          <p>
            {t("to")}: {regDate?.regDateTo}
          </p>
        )}
        <RemoveFilterBtn onClick={() => handleRemove("regDate")} />
      </SelectedFilter>
    );
  }
  if (purchaseAmount) {
    if (
      !!purchaseAmount.purchaseCountFrom ||
      !!purchaseAmount.purchaseCountTo
    ) {
      result.push(
        <SelectedFilter>
          {!!purchaseAmount.purchaseCountFrom &&
            purchaseAmount.purchaseCountFrom !== "" && (
              <p>
                ??????-???? ??????????????: {t("from")}:{" "}
                {numberWith(purchaseAmount.purchaseCountFrom + "", " ")}
              </p>
            )}
          {!!purchaseAmount.purchaseCountTo &&
            purchaseAmount.purchaseCountTo !== "" && (
              <p>
                {!purchaseAmount.purchaseCountFrom && "??????-???? ??????????????: "}
                {t("to")}:{" "}
                {numberWith(purchaseAmount.purchaseCountTo + "", " ")}
              </p>
            )}
          {(!!purchaseAmount.purchaseCountFrom ||
            !!purchaseAmount.purchaseCountTo) && (
            <RemoveFilterBtn onClick={() => handleRemove("purchaseAmount")} />
          )}
        </SelectedFilter>
      );
    }
  }
  if (trafficProvider) {
    result.push(
      <SelectedFilter>
        <p>
          {t("trafficProvider")}:{" "}
          {referals[trafficProvider].name.slice(0, 1).toUpperCase() +
            referals[trafficProvider].name.slice(1)}
        </p>
        <RemoveFilterBtn onClick={() => handleRemove("trafficProvider")} />
      </SelectedFilter>
    );
  }
  if (status) {
    result.push(
      <SelectedFilter>
        <p>
          {t("status")}:{" "}
          {t(clientLevels.find((el) => el.number == status).name)}
        </p>
        <RemoveFilterBtn onClick={() => handleRemove("status")} />
      </SelectedFilter>
    );
  }
  if (filials && filials.length > 0) {
    result.push(
      filials.map((e: any) => (
        <SelectedFilter>
          <p>
            {t("filial")}: {e.name}
          </p>
          <RemoveFilterBtn onClick={() => dispatch(removeFilial(e.value))} />
        </SelectedFilter>
      ))
    );
  }
  return result;
};
export const getOneDayPlus = (date: any, action: string) => {
  if (date) {
    let [year, month, day] = date.split("-");
    let res: any = "";
    if (action === "minus") {
      res = new Date(year, month - 1, day - 1);
    } else {
      console.log(year, month, day);

      month = month - 1;
      day = +day + 1;
      res = new Date(year, month, day);
    }

    return dayjs(res).format("YYYY-MM-DD");
  }
};
export const getClientStatistics = (data: any) => {
  if (data) {
    const temp = Object.keys(data).map((el) => {
      if (el === "paidWithMoney") {
        return {
          icon: <MoneyStatsIcon />,
          heading: "???????????????? ?? UZS",
          value: data[el],
        };
      } else if (el === "amountOperation") {
        return {
          icon: <MoneyBagIcon />,
          heading: "?????????? ???????? ??????????????",
          value: data[el],
        };
      } else if (el === "countOperation") {
        return {
          icon: <CartIcon />,
          heading: "???????????????????? ??????????????",
          value: data[el],
        };
      } else if (el === "pointSum") {
        return {
          icon: <HandIcon />,
          heading: "?????????????? ????????????",
          value: data[el],
        };
      } else if (el === "cashbackSum") {
        return {
          icon: <CashBackIcon />,
          heading: "???????????????? ????????????",
          value: data[el],
        };
      } else if (el === "discountSum") {
        return {
          icon: <DiscountIcon />,
          heading: "???????????????? ????????????",
          value: data[el],
        };
      } else if (el === "paidWithPoint") {
        return {
          icon: <RatingIcon />,
          heading: "???????????????? ??????????????",
          value: data[el],
        };
      }
    });
    return temp.filter((e) => !!e);
  }
  return [];
};

export const getFiltersForQuery = (filters: any, referals: any) => {
  let res: any = Object.keys(filters).reduce((obj, el) => {
    if (typeof filters[el] === "string" || typeof filters[el] === "number") {
      if (el === "gender") {
        obj = {
          ...obj,
          genderTypeId: filters[el],
        };
      } else if (el === "notless") {
        obj = {
          ...obj,
          allPurchaseSum: filters[el],
        };
      } else if (el === "status") {
        obj = {
          ...obj,
          usedLevelNumber: Number(filters[el]),
        };
      } else if (el === "trafficProvider") {
        if (filters[el]) {
          obj = {
            ...obj,
            refIds: referals[filters[el]].refIds,
          };
        }
      }
    } else {
      if (el === "regDate") {
        if (filters[el].regDateFrom) {
          obj = {
            ...obj,
            regDateFrom: filters[el].regDateFrom,
          };
        }
        if (filters[el].regDateTo) {
          obj = {
            ...obj,
            regDateTo: filters[el].regDateTo,
          };
        }
      } else if (el === "purchaseAmount") {
        if (filters[el].purchaseCountFrom) {
          obj = {
            ...obj,
            purchaseCountFrom: filters[el].purchaseCountFrom,
          };
        }
        if (filters[el].purchaseCountTo) {
          obj = {
            ...obj,
            purchaseCountTo: filters[el].purchaseCountTo,
          };
        }
      } else if (el === "trafficProvider") {
        if (filters[el]) {
          obj = {
            ...obj,
            refIds: referals[filters[el]].refIds,
          };
        }
      } else if (el === "filials") {
        obj = {
          ...obj,
          storeIds: `[${filters[el].map((e: any) => e.value)}]`,
        };
      }
    }
    return obj;
  }, {});

  return Object.keys(res)
    .map((el, index) => {
      if (index > 0) {
        if (el === "refIds") {
          return `&${el}=[${res[el]}]`;
        }
        return `&${el}=${res[el]}`;
      } else {
        if (el === "refIds") {
          return `${el}=[${res[el]}]`;
        }
        return `${el}=${res[el]}`;
      }
    })
    .join("");
};

export const tableDataHelper = (arr: ITableHelperItem[]) => {
  return arr.map((el) => ({
    cashier: Boolean(el.name.trim()) ? el.name : "???????????? ???? ????????????",
    date: dayjs(el.date).format("DD.MM.YYYY HH:mm"),
    points: numberWith(el.point + "", " "),
    type: "????????????",
    UZS: numberWith(el.amount + "", " "),
    cashbackSum: numberWith(el.cashback + "", " "),
    sale: numberWith(el.discount + "", " "),
  }));
};

interface IPointHelperItem {
  date: string;
  amount: number;
  type: number;
  name?: string;
}

const pointTypes: any = {
  1: "?????????? ???? ???????? ????????????????",
  2: "???????????????????????????? ??????????",
  3: "?????????? ???? ?????????????? ?????????????????????????? ??????????????",
  4: "VIP ??????????",
  7: "?????????? ???? ??????????????",
  8: "?????????? ???????????? ??????????????",
  9: "?????????? ???? ?????????????????????????? ??????????????",
  10: "???????????????????????? ?????? ??????????????",
  11: "?????????? ?????????????????? ???? ??????????????",
};

export const tablePointsHelper = (arr: IPointHelperItem[]) => {
  return arr.map((el) => ({
    date: dayjs(el.date).format("DD.MM.YYYY HH:mm"),
    type: pointTypes[el.type] || "",
    referal: el.name || "",
    points: numberWith(el.amount + "", " "),
    mobDate: dayjs(el.date).format("DD.MM.YYYY"),
    time: dayjs(el.date).format("hh:mm"),
  }));
};

export const tableRecommendsHelper = (arr: ITableRecs[]) => {
  return arr.map((el) => ({
    registration_date: dayjs(el.date).format("DD.MM.YYYY HH:mm"),
    client: el.name,
    level: el.levelNumber,
    image: el.image,
  }));
};

export const getOperationsForMobileTable = (arr: ITableHelperItem[]) => {
  return arr.reduce((acc: any, curr: any) => {
    let day = dayjs(curr.date).format("DD.MM.YYYY");
    acc[day] = acc[day]
      ? [
          ...acc[day],
          {
            time: dayjs(curr.date).format("HH:mm"),
            action: "????????????",
            value: `${
              curr.amount ? numberWith(curr.amount + "", " ") + " UZS " : ""
            }${
              curr.cashback
                ? numberWith(curr.cashback + "", " ") + " ???????????? "
                : ""
            }${
              curr.discount
                ? numberWith(curr.discount + "", " ") + " ???????????? "
                : ""
            }${curr.point ? numberWith(curr.point + "", " ") + " ??." : ""}`,
          },
        ]
      : [
          {
            time: dayjs(curr.date).format("HH:mm"),
            action: "????????????",
            value: `${
              curr.amount ? numberWith(curr.amount + "", " ") + " UZS " : ""
            }${
              curr.cashback
                ? numberWith(curr.cashback + "", " ") + " ???????????? "
                : ""
            }${
              curr.discount
                ? numberWith(curr.discount + "", " ") + " ???????????? "
                : ""
            }${curr.point ? numberWith(curr.point + "", " ") + " ??." : ""}`,
          },
        ];

    return acc;
  }, {});
};

export const getPointsForMobile = (arr: IPointHelperItem[]) => {
  return arr.reduce((acc: any, curr: any) => {
    let day = dayjs(curr.date).format("DD.MM.YYYY");
    acc[day] = acc[day]
      ? [
          ...acc[day],
          {
            time: dayjs(curr.date).format("HH:mm"),
            action: pointTypes[curr.type],
            amount: numberWith(curr.amount + "", " "),
          },
        ]
      : [
          {
            time: dayjs(curr.date).format("HH:mm"),
            action: pointTypes[curr.type],
            amount: numberWith(curr.amount + "", " "),
          },
        ];
    return acc;
  }, {});
};
