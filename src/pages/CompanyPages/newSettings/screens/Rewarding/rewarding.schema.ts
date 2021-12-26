import * as yup from 'yup';
export const rewardingSchema = yup.object().shape({
  rewardType1: yup.boolean(),
  amountType1: yup
    .number()
    .nullable(true)
    .transform((parsedValue, originalValue) =>
      originalValue === '' ? null : parsedValue
    )
    .when('rewardType1', {
      is: true,
      then: yup
        .number()
        .min(1000, 'minValue1000')
        .nullable(true)
        .transform((parsedValue, originalValue) =>
          originalValue === '' ? null : parsedValue
        )
        .required('requiredField'),
    }),

  rewardType2: yup.boolean(),
  amountType2: yup
    .number()
    .nullable(true)
    .transform((parsedValue, originalValue) =>
      originalValue === '' ? null : parsedValue
    )
    .when('rewardType2', {
      is: true,
      then: yup
        .number()
        .min(1000, 'minValue1000')
        .nullable(true)
        .transform((parsedValue, originalValue) =>
          originalValue === '' ? null : parsedValue
        )
        .required('requiredField'),
    }),
  limitCountReward: yup
    .number()
    .nullable(true)
    .transform((parsedValue, originalValue) =>
      originalValue === '' ? null : parsedValue
    )
    .when('rewardType2', {
      is: true,
      then: yup
        .number()
        .min(1, 'minValue1')
        .nullable(true)
        .transform((parsedValue, originalValue) =>
          originalValue === '' ? null : parsedValue
        )
        .required('requiredField'),
    }),
  rewardType3: yup.boolean(),
  amountType3: yup
    .number()
    .nullable(true)
    .transform((parsedValue, originalValue) =>
      originalValue === '' ? null : parsedValue
    )
    .when('rewardType3', {
      is: true,
      then: yup
        .number()
        .min(1000, 'minValue1000')
        .nullable(true)
        .transform((parsedValue, originalValue) =>
          originalValue === '' ? null : parsedValue
        )
        .required('requiredField'),
    }),
  beforeDay: yup
    .number()
    .nullable(true)
    .transform((parsedValue, originalValue) =>
      originalValue === '' ? null : parsedValue
    )
    .when('rewardType3', {
      is: true,
      then: yup
        .number()
        .nullable(true)
        .transform((parsedValue, originalValue) =>
          originalValue === '' ? null : parsedValue
        )
        .required('requiredField'),
    }),
  congratulationText: yup
    .string()
    .nullable(true)
    .transform((parsedValue, originalValue) =>
      originalValue === '' ? null : parsedValue
    )
    .when('rewardType3', {
      is: true,
      then: yup
        .string()
        .nullable(true)
        .transform((parsedValue, originalValue) =>
          originalValue === '' ? null : parsedValue
        )
        .required('requiredField'),
    }),
  rewardType4: yup.boolean(),
  amountType4: yup
    .number()
    .nullable(true)
    .transform((parsedValue, originalValue) =>
      originalValue === '' ? null : parsedValue
    )
    .when('rewardType4', {
      is: true,
      then: yup
        .number()
        .min(1000, 'minValue1000')
        .nullable(true)
        .transform((parsedValue, originalValue) =>
          originalValue === '' ? null : parsedValue
        )
        .required('requiredField'),
    }),
  amountRequirements: yup
    .number()
    .nullable(true)
    .transform((parsedValue, originalValue) =>
      originalValue === '' ? null : parsedValue
    )
    .when('rewardType4', {
      is: true,
      then: yup
        .number()
        .min(1000, 'minValue1000')
        .nullable(true)
        .transform((parsedValue, originalValue) =>
          originalValue === '' ? null : parsedValue
        )
        .required('requiredField'),
    }),
});
