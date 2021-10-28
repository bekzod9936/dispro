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
import { useAppSelector } from "services/redux/hooks";
import { SaveIcon } from "assets/icons/InfoPageIcons/InfoPageIcons";
import { ReactComponent as ArrowBack } from "assets/icons/arrow_back.svg";
import RippleEffect from "components/Custom/RippleEffect";
import { useHistory, useLocation } from "react-router-dom";
import CustomToggle from "components/Custom/CustomToggleSwitch";
import MFormatInput from "components/Custom/MoneyInput";
import Input from "components/Custom/Input";
import useCashierSetting, { IForm } from "../../hooks/useCashierSetting";
// import { numberWith } from "services/utils";
import Button from "components/Custom/Button";

const CashierSetting = () => {
  const companyId: any = localStorage.getItem("companyId");

  const { t } = useTranslation();
  const summaOp = useAppSelector((state) => state.staffs.summaOperations);

  const {
    handleSubmit,
    ballCheck,
    control,
    additionalCheck,
    recommendCheck,
    ballUzs,
    ballPoint,
    changeLoyality,
  } = useCashierSetting();
  const location = useLocation();
  const history = useHistory();

  console.log(summaOp, "=== summa settings ===");

  const onSave = (data: IForm) => {
    console.log(data, "forma");
    changeLoyality.mutate({
      companyId: companyId,
      rewards: [
        {
          isActive: ballCheck,
          rewardType: 5,
          amount: data.ballPoint,
          levels: [],
        },
        {
          isActive: additionalCheck,
          rewardType: 6,
          amount: data.ballUzs,
          levels: [
            {
              requirements: [
                {
                  type: 1,
                  amount: data.summaOperations?.toString()?.split(" ").join(""),
                  unit: "UZS",
                  condition: "or",
                },
              ],
            },
          ],
        },
        {
          isActive: additionalCheck,
          rewardType: 7,
          amount: data.referBallUzs?.toString()?.split(" ").join(""),
          levels: [
            {
              requirements: [
                {
                  type: 1,
                  amount: data.countRefer?.toString()?.split(" ").join(""),
                  unit: "шт.",
                  condition: "or",
                },
              ],
            },
          ],
        },
      ],
    });
  };

  const prevPage: any = location.state;
  return (
    <CashSettingWrap>
      <CashierWrapTitle>
        <RippleEffect
          onClick={() => {
            history.push(prevPage?.prevPage ? prevPage?.prevPage : "/staff");
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
                name="ballPoint"
                defaultValue={ballPoint?.toString()}
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      label={"Размер вознаграждения %"}
                      disabled={!ballCheck}
                      type="string"
                      defaultValue={ballPoint?.toString()}
                      field={field}
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
                  control={control}
                  name="ballUzs"
                  defaultValue={ballUzs}
                  render={({ field }) => {
                    return (
                      <Input
                        label={"Размер вознаграждения UZS"}
                        disabled={!additionalCheck}
                        defaultValue={ballUzs}
                        type="string"
                        fullWidth={true}
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
                  control={control}
                  name="summaOperations"
                  defaultValue={summaOp}
                  render={({ field }) => {
                    return (
                      <MFormatInput
                        label={"Сумма опреации"}
                        disabled={!additionalCheck}
                        type="string"
                        defaultValue={summaOp}
                        field={field}
                        // {...field}
                        // onChange={(e: any) => field.onChange(e)}
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
            <SettingRow>
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
                  name="recommendCheck"
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
                  control={control}
                  name="referBallUzs"
                  render={({ field }) => {
                    return (
                      <Input
                        label={"Размер вознаграждения UZS"}
                        disabled={!recommendCheck}
                        defaultValue="0"
                        type="string"
                        fullWidth={true}
                        // field={field}
                        {...field}
                        onChange={(e: any) => field.onChange(e)}
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
                  control={control}
                  name="countRefer"
                  render={({ field }) => {
                    return (
                      <Input
                        label={"Количество рекомендаций"}
                        disabled={!recommendCheck}
                        //   defaultValue={numberWith(item?.percent, " ")}
                        type="string"
                        fullWidth={true}
                        field={field}
                        defaultValue="0"
                        // {...field}
                        // onChange={(e: any) => field.onChange(e.target.value)}
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
