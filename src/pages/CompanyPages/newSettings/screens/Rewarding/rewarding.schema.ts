import * as yup from "yup";

export interface IForm {
  enablepurchase?: boolean;
  rewardType1?: boolean;
  rewardType2?: boolean;
  rewardType3?: boolean;
  rewardType4?: boolean;
  amountType1?: number;
  amountType2?: number;
  amountType3?: number;
  amountType4?: number;
  beforeDay?: number;
  congratulationText?: string;
  limitCountReward?: number;
  amountRequirements?: number;
  limit?: number;
  values?: { companyId: number; rewards: any[] };
}

export const rewardingSchema = yup.object().shape({
  rewardType1: yup.boolean(),
  amountType1: yup
    .number()
    .nullable(true)
    .transform((parsedValue, originalValue) =>
      originalValue === "" ? null : parsedValue
    )
    .when("rewardType1", {
      is: true,
      then: yup
        .number()
        .min(1000, "minvalue")
        .nullable(true)
        .transform((parsedValue, originalValue) =>
          originalValue === "" ? null : parsedValue
        )
        .required("requiredField"),
    }),

  rewardType2: yup.boolean(),
  amountType2: yup
    .number()
    .nullable(true)
    .transform((parsedValue, originalValue) =>
      originalValue === "" ? null : parsedValue
    )
    .when("rewardType2", {
      is: true,
      then: yup
        .number()
        .min(1000, "minvalue")
        .nullable(true)
        .transform((parsedValue, originalValue) =>
          originalValue === "" ? null : parsedValue
        )
        .required("requiredField"),
    }),
  limitCountReward: yup
    .number()
    .nullable(true)
    .transform((parsedValue, originalValue) =>
      originalValue === "" ? null : parsedValue
    )
    .when("rewardType2", {
      is: true,
      then: yup
        .number()
        .min(1, "minvalue")
        .nullable(true)
        .transform((parsedValue, originalValue) =>
          originalValue === "" ? null : parsedValue
        )
        .required("requiredField"),
    }),
  rewardType3: yup.boolean(),
  amountType3: yup
    .number()
    .nullable(true)
    .transform((parsedValue, originalValue) =>
      originalValue === "" ? null : parsedValue
    )
    .when("rewardType3", {
      is: true,
      then: yup
        .number()
        .min(1000, "minvalue")
        .nullable(true)
        .transform((parsedValue, originalValue) =>
          originalValue === "" ? null : parsedValue
        )
        .required("requiredField"),
    }),
  beforeDay: yup
    .number()
    .nullable(true)
    .transform((parsedValue, originalValue) =>
      originalValue === "" ? null : parsedValue
    )
    .when("rewardType3", {
      is: true,
      then: yup
        .number()
        .nullable(true)
        .transform((parsedValue, originalValue) =>
          originalValue === "" ? null : parsedValue
        )
        .required("requiredField"),
    }),
  congratulationText: yup
    .string()
    .nullable(true)
    .transform((parsedValue, originalValue) =>
      originalValue === "" ? null : parsedValue
    )
    .when("rewardType3", {
      is: true,
      then: yup
        .string()
        .nullable(true)
        .transform((parsedValue, originalValue) =>
          originalValue === "" ? null : parsedValue
        )
        .required("requiredField"),
    }),
  rewardType4: yup.boolean(),
  amountType4: yup
    .number()
    .nullable(true)
    .transform((parsedValue, originalValue) =>
      originalValue === "" ? null : parsedValue
    )
    .when("rewardType4", {
      is: true,
      then: yup
        .number()
        .min(1000, "minvalue")
        .nullable(true)
        .transform((parsedValue, originalValue) =>
          originalValue === "" ? null : parsedValue
        )
        .required("requiredField"),
    }),
  amountRequirements: yup
    .number()
    .nullable(true)
    .transform((parsedValue, originalValue) =>
      originalValue === "" ? null : parsedValue
    )
    .when("rewardType4", {
      is: true,
      then: yup
        .number()
        .min(1000, "minvalue")
        .nullable(true)
        .transform((parsedValue, originalValue) =>
          originalValue === "" ? null : parsedValue
        )
        .required("requiredField"),
    }),
});
