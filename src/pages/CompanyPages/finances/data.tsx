import {
  CashBackIcon,
  WalletIcon,
} from '../../../assets/icons/FinancePageIcons/FinaceIcons';

///Sugestion section
export const columns: any = [
  {
    field: 'date',
    headerName: 'Дата',
    type: 'date',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    minWidth: 130,
  },
  {
    field: 'consumer',
    headerName: 'Покупатель',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    minWidth: 170,
  },
  {
    field: 'price',
    headerName: 'Сумма покупки UZS',
    type: 'number',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    minWidth: 200,
  },
  {
    field: 'type',
    headerName: 'Тип',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    minWidth: 120,
  },
  {
    field: 'profit',
    headerName: 'Прибыль',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    minWidth: 150,
  },
  {
    field: 'commission',
    headerName: 'Комиссия DIS',
    type: 'number',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    minWidth: 200,
  },
  {
    field: 'name',
    headerName: 'Название',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    minWidth: 150,
  },
];

export const body = [
  {
    id: 0,
    date: '23.06.2021',
    consumer: 'Фахриддин Юлдошев',
    price: 310000,
    type: 'Купон',
    profit: '175 000 (50%)',
    commission: '175 000 (50%)',
    name: 'Бешеная скидка',
  },
  {
    id: 1,
    date: '22.06.2022',
    consumer: 'Колпаков Александр',
    price: 320000,
    type: 'Купон',
    profit: '175 000 (50%)',
    commission: '175 000 (50%)',
    name: 'Петарды сердец',
  },
  {
    id: 2,
    date: '22.06.2021',
    consumer: 'Тошкентов Умрзок',
    price: 330000,
    type: 'Подписка',
    profit: '175 000 (50%)',
    commission: '175 000 (50%)',
    name: 'Бешеная скидка',
  },
  {
    id: 3,
    date: '22.06.2021',
    consumer: 'Колпаков Александр',
    price: 340000,
    type: 'Сертификат',
    profit: '175 000 (50%)',
    commission: '175 000 (50%)',
    name: 'Мириады зеркал',
  },
  {
    id: 4,
    date: '22.06.2021',
    consumer: 'Колпаков Александр',
    price: 340000,
    type: 'Сертификат',
    profit: '175 000 (50%)',
    commission: '175 000 (50%)',
    name: 'Мириады зеркал',
  },
  {
    id: 5,
    date: '22.06.2021',
    consumer: 'Тошкентов Умрзок',
    price: 330000,
    type: 'Подписка',
    profit: '175 000 (50%)',
    commission: '175 000 (50%)',
    name: 'Бешеная скидка',
  },
  {
    id: 6,
    date: '23.06.2021',
    consumer: 'Фахриддин Юлдошев',
    price: 310000,
    type: 'Купон',
    profit: '175 000 (50%)',
    commission: '175 000 (50%)',
    name: 'Бешеная скидка',
  },
  {
    id: 7,
    date: '22.06.2021',
    consumer: 'Тошкентов Умрзок',
    price: 330000,
    type: 'Подписка',
    profit: '175 000 (50%)',
    commission: '175 000 (50%)',
    name: 'Бешеная скидка',
  },
  {
    id: 8,
    date: '23.06.2021',
    consumer: 'Фахриддин Юлдошев',
    price: 310000,
    type: 'Купон',
    profit: '175 000 (50%)',
    commission: '175 000 (50%)',
    name: 'Бешеная скидка',
  },
];

// Payment section
export const paymentColumns = [
  {
    field: 'date',
    headerName: 'Дата и время',
    type: 'date',
    flex: 1,
    minWidth: 180,
  },
  {
    field: 'consumer',
    headerName: 'Покупатель',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    minWidth: 170,
  },
  {
    field: 'numberCard',
    headerName: 'Номер карты',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    minWidth: 170,
  },
  {
    field: 'type',
    headerName: 'Сумма UZS',
    type: 'number',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    minWidth: 170,
  },
  {
    field: 'profit',
    headerName: 'Прибыль (99%)',
    type: 'number',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    minWidth: 180,
  },
  {
    field: 'commission',
    headerName: 'Комиссия DIS (1%)',
    type: 'number',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    minWidth: 200,
  },
  {
    field: 'numberPark',
    headerName: 'Номер карты парка',
    type: 'number',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    minWidth: 200,
  },
];

export const paymetBody = [
  {
    id: 0,
    date: '23.06.2021 11:56',
    consumer: 'Фахриддин Юлдошев',
    numberCard: '8600 **** **** *364',
    type: 15000,
    profit: 14850,
    commission: 150.0,
    numberPark: 8600364,
  },
  {
    id: 1,
    date: '23.06.2021 11:56',
    consumer: 'Фахриддин Юлдошев',
    numberCard: '8600 **** **** *364',
    type: 15000,
    profit: 14850,
    commission: 150.0,
    numberPark: 8600364,
  },
  {
    id: 2,
    date: '23.06.2021 11:56',
    consumer: 'Фахриддин Юлдошев',
    numberCard: '8600 **** **** *364',
    type: 15000,
    profit: 14850,
    commission: 150.0,
    numberPark: 8600364,
  },
  {
    id: 3,
    date: '23.06.2021 11:56',
    consumer: 'Фахриддин Юлдошев',
    numberCard: '8600 **** **** *364',
    type: 15000,
    profit: 14850,
    commission: 150.0,
    numberPark: 8600364,
  },
];

// CashBack section
export const cashBackColumns = [
  {
    field: 'opartion',
    headerName: 'Тип операции',
    flex: 1,
    minWidth: 200,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params: any) => {
      return (
        <>
          {params.value === 'Начисление кешбэка' ? (
            <CashBackIcon />
          ) : (
            <WalletIcon />
          )}
          {params.value}
        </>
      );
    },
  },
  {
    field: 'consumer',
    headerName: 'Покупатель',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    minWidth: 170,
  },
  {
    field: 'cashBack',
    headerName: 'Кешбэк UZS',
    flex: 1,
    minWidth: 170,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'totalSum',
    headerName: 'Комиссия DIS /Сумма пополнения',
    type: 'number',
    flex: 1,
    minWidth: 170,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'dateBuy',
    headerName: 'Дата покупки',
    type: 'number',
    flex: 1,
    minWidth: 170,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'date',
    headerName: 'Дата начисления',
    type: 'number',
    flex: 1,
    minWidth: 170,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'status',
    headerName: 'Статус',
    type: 'number',
    flex: 1,
    minWidth: 150,
    align: 'center',
    headerAlign: 'center',
  },
];

export const cashBackBody = [
  {
    id: 0,
    opartion: 'Начисление кешбэка',
    consumer: 'Фахриддин Юлдошев',
    cashBack: 15000,
    totalSum: 150,
    dateBuy: '22.06.2021',
    date: '22.06.2021',
    status: 'Начислено',
  },
  {
    id: 1,
    opartion: 'Пополнение депозита',
    consumer: 'Фахриддин Юлдошев',
    cashBack: 15000,
    totalSum: 150,
    dateBuy: '22.06.2021',
    date: '22.06.2021',
    status: 'Начислено',
  },
  {
    id: 2,
    opartion: 'Начисление кешбэка',
    consumer: 'Фахриддин Юлдошев',
    cashBack: 15000,
    totalSum: 150,
    dateBuy: '22.06.2021',
    date: '22.06.2021',
    status: 'Начислено',
  },
  {
    id: 3,
    opartion: 'Пополнение депозита',
    consumer: 'Фахриддин Юлдошев',
    cashBack: 15000,
    totalSum: 150,
    dateBuy: '22.06.2021',
    date: '22.06.2021',
    status: 'Начислено',
  },
];

///Casher section
const style = {
  background: 'linear-gradient(215.2deg, #C7EEFF -12.1%, #FCA9EA 101.51%)',
  borderRadius: '14px',
  width: '40px',
  height: '40px',
  marginRight: '15px',
};
export const casherColumns: any = [
  {
    field: 'casher',
    headerName: 'Кассир',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    minWidth: 200,
    renderCell: (params: any) => {
      return (
        <div
          style={{
            width: '100%',
            display: 'flex',
            height: '100%',
            alignItems: 'center',
          }}
        >
          <div style={style}></div>
          {params.value}
        </div>
      );
    },
  },
  {
    field: 'date',
    headerName: 'Дата транзакции',
    type: 'dateTime',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    minWidth: 170,
  },
  {
    field: 'time',
    headerName: 'Время трнанзакции',
    type: 'number',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    minWidth: 200,
  },
  {
    field: 'sum',
    headerName: 'Общая сумма',
    type: 'number',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    minWidth: 120,
  },
  {
    field: 'discount',
    headerName: 'Скидка',
    type: 'number',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    minWidth: 150,
  },
  {
    field: 'paid',
    headerName: 'Оплачено',
    type: 'number',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    minWidth: 200,
  },
  {
    field: 'consumer',
    headerName: 'Покупатель',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    minWidth: 150,
  },
];

export const casherBody = [
  {
    id: 0,
    casher: 'Кудрат ака',
    date: '04.06.2021',
    time: '17:00:30',
    sum: 160000,
    discount: 20000,
    paid: 140000,
    consumer: 'Тошкентов Умрзок',
  },
  {
    id: 1,
    casher: 'Ли Александра',
    date: '04.06.2001',
    time: '17:00:30',
    sum: 250500,
    discount: 25000,
    paid: 225500,
    consumer: 'Верстальщик Бобур',
  },
  {
    id: 2,
    casher: 'Ни Наталья',
    date: '04.06.2020',
    time: '17:00:30',
    sum: 103000,
    discount: 18000,
    paid: 85000,
    consumer: 'Бекендер Кудрат',
  },
];
