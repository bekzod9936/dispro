export interface ITotal {
  amount: number;
  isActive: boolean;
  levels: any[];
  rewardType: number;
  userType: 1 | 2;
}

export interface IForm {
  awardLimit: number | null;
  awardSizeFirst: number | null;
  awardSizeFourth: number | null;
  awardSizeSecond: number | null;
  awardSizeThird: number | null;
  description: string | null;
  ifMoreThan: string | null;
  payfor: string | null;

  //invite bonus types
  inviteCheck: boolean;
  recommendCheck: boolean;
  vipCheck: boolean;
  birthdayCheck: boolean;
}

export const TOTAL_FIELDS_PATTERN: ITotal[] = [
  {
    amount: 0,
    isActive: false,
    levels: [],
    rewardType: 1,
    userType: 1,
  },
  {
    amount: 0,
    isActive: false,
    levels: [],
    rewardType: 2,
    userType: 1,
  },
  {
    amount: 0,
    isActive: false,
    levels: [{ beforeDay: "5", congratulationText: "qwertyu" }],
    rewardType: 3,
    userType: 1,
  },
  {
    amount: 0,
    isActive: false,
    levels: [
      {
        requirements: [
          { id: 0, type: "1", unit: "UZS", amount: "", condition: "" },
        ],
      },
    ],
    rewardType: 4,
    userType: 1,
  },
];
