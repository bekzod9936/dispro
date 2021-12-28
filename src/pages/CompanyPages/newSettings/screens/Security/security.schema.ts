import * as yup from "yup";

export interface IForm {
  enablepurchase?: boolean;
  limit?: number;
  data?: { isEnabledPaySumLimit?: boolean; pay_sum_limit?: number | string };
}

export const securitySchema = yup.object().shape({
  enablepurchase: yup.boolean(),
  limit: yup
    .number()
    .nullable(true)
    .transform((parsedValue, originalValue) =>
      originalValue === "" ? null : parsedValue
    )
    .when("enablepurchase", {
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
});
