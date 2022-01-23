import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  CashSettingWrap,
  CashierWrapTitle,
  TitleText,
  CashierBody,
  Break,
  SettingRow,
  SettingCol,
  SettingTitle,
  SettingText,
  Form,
  UpSide,
  DownSide,
} from "./style";
import { SaveIcon } from "assets/icons/InfoPageIcons/InfoPageIcons";
import { ReactComponent as ArrowBack } from "assets/icons/arrow_back.svg";
import RippleEffect from "components/Custom/RippleEffect";
import { useHistory, useLocation } from "react-router-dom";
import CustomToggle from "components/Custom/CustomToggleSwitch";
import useCashierSetting, { IForm } from "../../hooks/useCashierSetting";
import Button from "components/Custom/Buttons/Button";
import InputFormat from "components/Custom/InputFormat";
import { useEffect } from "react";

const CashierSetting = () => {
  const companyId: any = localStorage.getItem("companyId");

  const { t } = useTranslation();
  const {
    handleSubmit,
    ballCheck,
    control,
    additionalCheck,
    recommendCheck,
    changeLoyality,
    errors,
    watch,
    clearErrors,
    setValue,
  } = useCashierSetting();
  const location = useLocation();
  const history = useHistory();

  const onSave = (data: IForm) => {
    changeLoyality.mutate({
      companyId: ~~companyId,
      rewards: [
        {
          isActive: ballCheck,
          rewardType: 5,
          amount: ~~data.ballPoint || 0,
          levels: [],
        },
        {
          isActive: additionalCheck || false,
          rewardType: 6,
          amount: ~~data.ballUzs || 0,
          levels: [
            {
              requirements: [
                {
                  type: 3,
                  amount:
                    ~~data.summaOperations?.toString()?.split(" ").join("") ||
                    0,
                  unit: "UZS",
                  condition: "or",
                },
              ],
            },
          ],
        },
        // {
        // 	isActive: additionalCheck,
        // 	rewardType: 7,
        // 	amount: data.referBallUzs?.toString()?.split(' ').join(''),
        // 	levels: [
        // 		{
        // 			requirements: [
        // 				{
        // 					type: 1,
        // 					amount: data.countRefer?.toString()?.split(' ').join(''),
        // 					unit: 'шт.',
        // 					condition: 'or',
        // 				},
        // 			],
        // 		},
        // 	],
        // },
      ],
    });
  };

  //! alert bad code

  useEffect(() => {
    if (!watch("recommendCheck")) {
      clearErrors("referBallUzs");
    }
  }, [watch("recommendCheck")]);

  useEffect(() => {
    if (!watch("ballCheck")) {
      clearErrors("ballPoint");
      setValue("ballPoint", "");
    }
  }, [watch("ballCheck")]);

  useEffect(() => {
    if (!watch("additionalCheck")) {
      clearErrors("ballUzs");
      setValue("ballUzs", "");
      setValue("summaOperations", "");
    }
  }, [watch("additionalCheck")]);

  useEffect(() => {
    if (!watch("additionalCheck")) {
      clearErrors("summaOperations");
    }
  }, [watch("additionalCheck")]);

  useEffect(() => {
    if (!watch("recommendCheck")) {
      clearErrors("countRefer");
    }
  }, [watch("recommendCheck")]);

  const prevPage: any = location.state;
  return (
    <CashSettingWrap>
      <CashierWrapTitle>
        <RippleEffect
          onClick={() => {
            history.push(
              prevPage?.prevPage ? prevPage?.prevPage : "/staff/cashier"
            );
          }}
        >
          <ArrowBack />
        </RippleEffect>
        <TitleText>Настройки (Вознаграждение кассиров)</TitleText>
      </CashierWrapTitle>
      <Break height={43} />
      <CashierBody>
        <Form onSubmit={handleSubmit(onSave)}>
          <UpSide>
            {/* first  */}
            <SettingRow>
              <SettingCol>
                <SettingTitle>Баллы за покупку</SettingTitle>
                <Break height={15} />

                <SettingText>
                  Начисление баллов кассиру в размере процента от суммы счета
                </SettingText>
              </SettingCol>
              <SettingCol>
                <Controller
                  name="ballCheck"
                  control={control}
                  render={({ field }) => {
                    return <CustomToggle checked={field.value} {...field} />;
                  }}
                />
              </SettingCol>
            </SettingRow>
            <Break height={35} />
            <SettingRow>
              <Controller
                rules={{
                  required: watch("ballCheck"),
                  min: 1,
                }}
                name="ballPoint"
                control={control}
                render={({ field }) => {
                  return (
                    <InputFormat
                      message={
                        watch("ballPoint") <= 0
                          ? t("minValue_1")
                          : t("requiredField")
                      }
                      error={Boolean(errors?.ballPoint)}
                      label={"Размер вознаграждения %"}
                      disabled={!ballCheck}
                      type="string"
                      field={field}
                      max="100"
                      fullWidth={true}
                      maxLength={3}
                      width={{
                        width: "70%",
                      }}
                      margin={{
                        laptop: "30px 0 0",
                      }}
                    />
                  );
                }}
              />
            </SettingRow>

            <Break height={35} width={10} />

            {/* second  */}
            <SettingRow>
              <SettingCol>
                <SettingTitle>Дополнительные баллы</SettingTitle>
                <Break height={15} />

                <SettingText>
                  Начисление дополнительных баллов кассиру при условии, когда
                  сумма операции больше указанной
                </SettingText>
              </SettingCol>
              <SettingCol>
                <Controller
                  name="additionalCheck"
                  control={control}
                  render={({ field }) => {
                    return <CustomToggle checked={field.value} {...field} />;
                  }}
                />
              </SettingCol>
            </SettingRow>

            <SettingRow>
              <SettingCol>
                <Controller
                  rules={{
                    required: watch("additionalCheck"),
                    min: 1,
                  }}
                  control={control}
                  name="ballUzs"
                  render={({ field }) => {
                    return (
                      <InputFormat
                        maxLength="11"
                        label={"Размер вознаграждения UZS"}
                        disabled={!additionalCheck}
                        // type='string'
                        message={
                          watch("ballUzs") <= 0
                            ? t("minValue_1")
                            : t("requiredField")
                        }
                        error={Boolean(errors?.ballUzs)}
                        fullWidth
                        field={field}
                        width={{
                          width: "100%",
                        }}
                        margin={{
                          laptop: "30px 0 0",
                        }}
                      />
                    );
                  }}
                />
              </SettingCol>
              <SettingCol>
                <Controller
                  rules={{
                    required: watch("additionalCheck"),
                    min: 1,
                  }}
                  control={control}
                  name="summaOperations"
                  render={({ field }) => {
                    return (
                      <InputFormat
                        message={
                          watch("summaOperations") <= 0
                            ? t("minValue_1")
                            : t("requiredField")
                        }
                        error={Boolean(errors?.summaOperations)}
                        maxLength="11"
                        label={"Сумма операции"}
                        disabled={!additionalCheck}
                        type="string"
                        field={field}
                        fullWidth={true}
                        width={{
                          width: "100%",
                        }}
                        margin={{
                          laptop: "30px 0 0",
                        }}
                      />
                    );
                  }}
                />
              </SettingCol>
            </SettingRow>

            <Break height={35} />

            {/* third  */}
            {/* <SettingRow>
							<SettingCol>
								<SettingTitle>Баллы за рекомендацию</SettingTitle>
								<Break height={15} />
								<SettingText>
									Начисление дополнительных баллов кассиру при условии, когда
									количество рекомендаций больше указанного
								</SettingText>
							</SettingCol>
							<SettingCol>
								<Controller
									name='recommendCheck'
									control={control}
									render={({ field }) => {
										return <CustomToggle checked={field.value} {...field} />;
									}}
								/>
							</SettingCol>
						</SettingRow> */}
            {/* <SettingRow>
							<SettingCol>
								<Controller
									rules={{
										required: watch('recommendCheck'),
										min: 1,
									}}
									control={control}
									name='referBallUzs'
									render={({ field }) => {
										return (
											<InputFormat
												message={
													watch('referBallUzs') <= 0
														? t('minValue_1')
														: t('requiredField')
												}
												error={Boolean(errors?.referBallUzs)}
												maxLength='11'
												label={'Размер вознаграждения UZS'}
												disabled={!recommendCheck}
												defaultValue='0'
												type='string'
												fullWidth={true}
												field={field}
												width={{
													width: '100%',
												}}
												margin={{
													laptop: '30px 0 0',
												}}
											/>
										);
									}}
								/>
							</SettingCol>
							<SettingCol>
								<Controller
									rules={{
										required: watch('recommendCheck'),
										min: 1,
									}}
									control={control}
									name='countRefer'
									render={({ field }) => {
										return (
											<InputFormat
												message={
													watch('countRefer') <= 0
														? t('minValue_1')
														: t('requiredField')
												}
												error={Boolean(errors?.countRefer)}
												maxLength='11'
												label={'Количество рекомендаций'}
												disabled={!recommendCheck}
												type='string'
												fullWidth={true}
												field={field}
												width={{
													width: '100%',
												}}
												margin={{
													laptop: '30px 0 0',
												}}
											/>
										);
									}}
								/>
							</SettingCol>
						</SettingRow> */}
          </UpSide>
          <DownSide>
            <Button type="submit" startIcon={<SaveIcon />}>
              {t("save")}
            </Button>
          </DownSide>
        </Form>
      </CashierBody>
    </CashSettingWrap>
  );
};

export default CashierSetting;
