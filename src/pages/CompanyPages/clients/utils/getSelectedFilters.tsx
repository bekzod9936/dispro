import { CartIcon, CashBackIcon, DiscountIcon, DownIcon, GoBackIcon, HandIcon, MoneyBagIcon, MoneyStatsIcon, PointActionsIcon, RatingIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import { useTranslation } from "react-i18next"
import { IFilters } from "services/redux/Slices/clients/types"
import { RemoveFilterBtn } from "../components/Header/components/RemoveFilterBtn"
import { SelectedFilter } from "../components/Header/style"
import dayjs from "dayjs";
import { numberWith } from 'services/utils'

export interface ITableHelperItem {
  date: string,
  amount: number,
  cashback: number,
  discount: number,
  name: string,
  point: number,
  status: number,
}

export interface ITableRecs {
  date: string,
  levelNumber: number,
  name: string,
  image: string
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
}
export const useHandleGetFilters = ({ filters, handleRemove }: IProps) => {
  const { t } = useTranslation();
  let result = [];
  const { gender, notless, regDate, purchaseAmount, trafficProvider } = filters;
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
          {t("notless")}: {numberWith(notless + "", " ")} сум
        </p>
        <RemoveFilterBtn onClick={() => handleRemove("notless")} />
      </SelectedFilter>
    );
  }
  if (regDate) {
    result.push(
      <SelectedFilter>
        <p>
          {t("from")}: {regDate?.regDateFrom}
        </p>
        <p>
          {t("to")}: {regDate?.regDateTo}
        </p>
        <RemoveFilterBtn onClick={() => handleRemove("regDate")} />
      </SelectedFilter>
    );
  }
  if (purchaseAmount) {
    if (purchaseAmount.purchaseCountTo !== "" || purchaseAmount.purchaseCountTo !== "") {
      result.push(
        <SelectedFilter>
          {purchaseAmount?.purchaseCountFrom && (purchaseAmount?.purchaseCountFrom !== "") && (
            <p>
              Кол-во покупок: {t("from")}: {numberWith(purchaseAmount?.purchaseCountFrom + "", " ")}
            </p>
          )}
          {purchaseAmount?.purchaseCountTo && (purchaseAmount?.purchaseCountTo !== "") && (
            <p>
              {!purchaseAmount?.purchaseCountFrom && "Кол-во покупок: "}{t("to")}: {numberWith(purchaseAmount?.purchaseCountTo + "", " ")}
            </p>
          )}
          {(purchaseAmount.purchaseCountFrom !== "" || purchaseAmount.purchaseCountTo !== "") && <RemoveFilterBtn onClick={() => handleRemove("purchaseAmount")} />}
        </SelectedFilter>
      );
    }
  }
  if (trafficProvider) {
    result.push(
      <SelectedFilter>
        <p>
          {t("trafficProvider")}: {trafficProvider?.label}
        </p>
        <RemoveFilterBtn onClick={() => handleRemove("trafficProvider")} />
      </SelectedFilter>
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
    const temp = Object.keys(data).map(el => {
      if (el === "paidWithMoney") {
        return {
          icon: <MoneyStatsIcon />,
          heading: "Оплачено в UZS",
          value: data[el]
        }
      } else if (el === "amountOperation") {
        return {
          icon: <MoneyBagIcon />,
          heading: "Сумма всех покупок",
          value: data[el]
        }
      } else if (el === "countOperation") {
        return {
          icon: <CartIcon />,
          heading: "Количество покупок",
          value: data[el]
        }
      } else if (el === "pointSum") {
        return {
          icon: <HandIcon />,
          heading: "Остаток баллов",
          value: data[el]
        }
      } else if (el === "cashbackSum") {
        return {
          icon: <CashBackIcon />,
          heading: "Получено кешбэк",
          value: data[el]
        }
      } else if (el === "discountSum") {
        return {
          icon: <DiscountIcon />,
          heading: "Получено скидки",
          value: data[el]
        }
      } else if (el === "paidWithPoint") {
        return {
          icon: <RatingIcon />,
          heading: "Оплаченно баллами",
          value: data[el]
        }
      }
    })
    return temp.filter(e => !!e)
  }
  return []
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
      } else if (el === "trafficProvider") {
        if (filters[el]) {
          obj = {
            ...obj,
            reflds: referals[filters[el]].refIds,
          };
        }
      }
    } else {
      if (el === "regDate") {
        obj = {
          ...obj,
          regDateFrom: filters[el].regDateFrom,
          regDateTo: filters[el].regDateTo,
        };
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
      }
    }
    return obj;
  }, {});

  return Object.keys(res)
    .map((el, index) => {
      if (index > 0) {
        if (el === "reflds") {
          return `&${el}=[${res[el]}]`
        }
        return `&${el}=${res[el]}`;
      } else {
        if (el === "reflds") {
          return `${el}=[${res[el]}]`;
        }
        return `${el}=${res[el]}`;
      }
    })
    .join("");
};


export const tableDataHelper = (arr: ITableHelperItem[]) => {
  return arr.map(el => ({
    cashier: el.name,
    date: dayjs(el.date).format("DD.MM.YYYY hh:mm"),
    points: el.point,
    type: "Оплата",
    UZS: el.amount,
    cashbackSum: el.cashback,
    sale: el.discount,
  }))
}



interface IPointHelperItem {
  date: string,
  amount: number,
  type: number,
  name?: string
}

const pointTypes: any = {
  1: "Баллы за день рождения",
  2: "Приветственные баллы",
  3: "Баллы за покупки приглашенного клиента",
  4: "VIP баллы",
  7: "Баллы за покупки",
  8: "Баллы вместо кешбэка",
  9: "Баллы за приглашенного клиента",
  10: "Использовано при покупки"
}

export const tablePointsHelper = (arr: IPointHelperItem[]) => {
  return arr.map(el => ({
    date: dayjs(el.date).format("DD.MM.YYYY hh:mm"),
    type: pointTypes[el.type] || "",
    referal: el.name || "",
    points: el.amount
  }))
}


export const tableRecommendsHelper = (arr: ITableRecs[]) => {
  return arr.map(el => ({
    registration_date: dayjs(el.date).format("DD.MM.YYYY hh:mm"),
    client: el.name,
    level: el.levelNumber,
    image: el.image
  }))
}