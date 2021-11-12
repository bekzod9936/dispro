import { CartIcon, CashBackIcon, DiscountIcon, DownIcon, GoBackIcon, HandIcon, MoneyBagIcon, MoneyStatsIcon, PointActionsIcon, RatingIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import { useTranslation } from "react-i18next"
import { IFilters } from "services/redux/Slices/clients/types"
import { RemoveFilterBtn } from "../components/Header/components/RemoveFilterBtn"
import { SelectedFilter } from "../components/Header/style"
import dayjs from "dayjs";


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
  if (notless) {
    result.push(
      <SelectedFilter>
        <p>
          {t("notless")}: {notless} сум
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
    result.push(
      <SelectedFilter>
        {purchaseAmount?.purchaseCountFrom && (
          <p>
            {t("from")}: {purchaseAmount?.purchaseCountFrom + " сум"}
          </p>
        )}
        {purchaseAmount?.purchaseCountTo && (
          <p>
            {t("to")}: {purchaseAmount?.purchaseCountTo + " сум"}
          </p>
        )}
        <RemoveFilterBtn onClick={() => handleRemove("purchaseAmount")} />
      </SelectedFilter>
    );
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
          value: 250000
        }
      }
    })
    return temp.filter(e => !!e)
  }
};


export const getFiltersForQuery = (filters: any) => {
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
            usedLevelNumber: filters[el].value,
          };
        }
      }
    }
    return obj;
  }, {});

  return Object.keys(res)
    .map((el, index) => {
      if (index > 0) {
        return `&${el}=${res[el]}`;
      } else return `${el}=${res[el]}`;
    })
    .join("");
};







