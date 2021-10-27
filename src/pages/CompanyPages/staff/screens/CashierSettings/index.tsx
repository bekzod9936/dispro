import { Controller } from "react-hook-form";
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
} from "./style";
import { ReactComponent as ArrowBack } from "assets/icons/arrow_back.svg";
import RippleEffect from "components/Custom/RippleEffect";
import { useHistory, useLocation } from "react-router-dom";
import CustomToggle from "components/Custom/CustomToggleSwitch";
import MFormatInput from "components/Custom/MoneyInput";
import useCashierSetting, { IForm } from "../../hooks/useCashierSetting";

const CashierSetting = () => {
  const {
    handleSubmit,
    ballCheck,
    setValue,
    control,
    additionalCheck,
    recommendCheck,
  } = useCashierSetting();
  const location = useLocation();
  const history = useHistory();

  const onSave = (data: IForm) => {
    console.log(data);
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

          <SettingRow>
            <Controller
              control={control}
              name="ballPoint"
              render={({ field }) => {
                return (
                  <MFormatInput
                    label={"Размер вознаграждения %"}
                    disabled={!ballCheck}
                    //   defaultValue={numberWith(item?.percent, " ")}
                    type="string"
                    fullWidth={true}
                    {...field}
                    value={field?.value?.textmask}
                    onChange={(e: any) => field.onChange(e.target.value)}
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

          <Break height={35} />

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
                render={({ field }) => {
                  return (
                    <MFormatInput
                      label={"Размер вознаграждения UZS"}
                      disabled={!additionalCheck}
                      //   defaultValue={numberWith(item?.percent, " ")}
                      type="string"
                      fullWidth={true}
                      {...field}
                      value={field?.value?.textmask}
                      onChange={(e: any) => field.onChange(e.target.value)}
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
                render={({ field }) => {
                  return (
                    <MFormatInput
                      label={"Сумма опреации"}
                      disabled={!additionalCheck}
                      //   defaultValue={numberWith(item?.percent, " ")}
                      type="string"
                      fullWidth={true}
                      {...field}
                      value={field?.value?.textmask}
                      onChange={(e: any) => field.onChange(e.target.value)}
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
                    <MFormatInput
                      label={"Размер вознаграждения UZS"}
                      disabled={!recommendCheck}
                      //   defaultValue={numberWith(item?.percent, " ")}
                      type="string"
                      fullWidth={true}
                      {...field}
                      value={field?.value?.textmask}
                      onChange={(e: any) => field.onChange(e.target.value)}
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
                    <MFormatInput
                      label={"Количество рекомендаций"}
                      disabled={!recommendCheck}
                      //   defaultValue={numberWith(item?.percent, " ")}
                      type="string"
                      fullWidth={true}
                      {...field}
                      value={field?.value?.textmask}
                      onChange={(e: any) => field.onChange(e.target.value)}
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
        </Form>
      </CashierBody>
    </CashSettingWrap>
  );
};

export default CashierSetting;
