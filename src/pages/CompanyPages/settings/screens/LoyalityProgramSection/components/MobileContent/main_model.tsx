import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
//actions
import { addModal, handleClick } from "services/redux/Slices/settingsSlice";
//assets and style
import { ReactComponent as ArrowBack } from "assets/icons/arrow_left.svg";
import {
  Container,
  Header,
  Body,
  Row,
  Htext,
  Text,
  Column,
  Footer,
} from "./style";
import { FormProps } from "../../hooks/useLoyality";
import { Break } from "pages/CompanyPages/settings/styles";
//hooks
import { useAppSelector, useAppDispatch } from "services/redux/hooks";
// import useMobileContent from "./useMobileContent";
//components
import Checkbox from "components/Custom/CheckBox";
import InputFormat from "components/Custom/InputFormat";
import Input from "components/Custom/Input";
import { IconButton } from "@material-ui/core";
import NestedArray from "./nested_array";
import Button from "components/Custom/Button";
import CancelButton from "pages/CompanyPages/settings/components/CancelButton";
import SaveButton from "pages/CompanyPages/settings/components/SaveButton";

const MainModel = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const base_loyality = useAppSelector((state) => state.settings.base_loyality);
  //using program loyality
  const usePoint: boolean = useAppSelector(
    (state) => state.loyalitySlice.usePoint
  );
  const useProgram: boolean = useAppSelector(
    (state) => state.loyalitySlice.useProgram
  );

  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm();
  const { fields, append, remove } = useFieldArray<FormProps>({
    control,
    name: "levels",
  });

  console.log(errors, "errors");

  const levels = useWatch({
    control,
    name: "levels",
  });

  const handleOpen = () => {
    dispatch(addModal(true));
  };

  const checkRequire = () => {
    if (levels?.length) {
      if (levels[levels.length - 1]?.requirements?.length >= 3) {
        return false;
      } else {
        return true;
      }
    }
    return true;
  };

  const onSubmit = (data: FormProps) => {
    console.log(data);
  };

  return (
    <Container>
      <Header>
        <IconButton
          onClick={() =>
            dispatch(
              handleClick({
                type: "cashback",
                open: false,
              })
            )
          }
        >
          <ArrowBack />
        </IconButton>
        <Htext>Настройка предостовления скидки</Htext>
      </Header>
      <Body onSubmit={handleSubmit(onSubmit)}>
        <Break height={20} />
        <Htext>Статусы клиентов</Htext>
        <Break height={2} />
        <Text>Создайте статусы и определите размер скидки</Text>
        <Break height={25} />
        <Row>
          <Controller
            name={`base_name`}
            rules={{
              required: true,
            }}
            control={control}
            render={({ field }) => (
              <Input
                label={"№ 1 Название статуса"}
                type="string"
                defaultValue={base_loyality?.base_name}
                field={field}
                message={t("requiredField")}
              />
            )}
          />
        </Row>
        <Break height={10} />
        <Row>
          <Controller
            name="base_percent"
            rules={{
              required: true,
              max: 100,
              min: 0,
            }}
            defaultValue={base_loyality?.base_percent}
            control={control}
            render={({ field }) => {
              return (
                <InputFormat
                  field={field}
                  label={""}
                  type="string"
                  defaultValue={base_loyality?.base_percent}
                  maxLength={3}
                  max="100"
                  width={{
                    width: "100%",
                  }}
                  margin={{
                    laptop: "20px 0 0",
                  }}
                  message={""}
                  error={errors.base_percent}
                />
              );
            }}
          />
        </Row>
        {fields.map((item: any, index: number) => {
          return (
            <Column key={index}>
              <Row>
                <Controller
                  name={`levels.${index}.name`}
                  rules={{
                    required: true,
                  }}
                  control={control}
                  render={({ field }) => (
                    <Input
                      label={`№ ${index + 2} Название статуса`}
                      type="string"
                      field={field}
                      defaultValue={item.name}
                      message={t("requiredField")}
                    />
                  )}
                />
              </Row>
              <Row>
                <Controller
                  name={`levels.${index}.percent`}
                  rules={{
                    required: true,
                    max: 100,
                    min: 0,
                  }}
                  control={control}
                  render={({ field }) => {
                    return (
                      <InputFormat
                        field={field}
                        label={""}
                        type="string"
                        defaultValue={item.percent}
                        maxLength={3}
                        max="100"
                        width={{
                          width: "100%",
                        }}
                        margin={{
                          laptop: "20px 0 0",
                        }}
                        message={""}
                        // error={errors.base_percent}
                      />
                    );
                  }}
                />
              </Row>

              {/* //level requirements  */}
              <Break height={5} />
              <NestedArray
                setValue={setValue}
                index={index}
                control={control}
              />
            </Column>
          );
        })}
        <Row>
          <Button
            buttonStyle={{
              bgcolor: "transparent",
              color: "#3492FF",
              fontSize: {
                mobile: 12.5,
                planshet: 14,
              },
            }}
            onClick={() => {
              append({
                name: "new_row",
                percent: 15,
                requirements: [],
              });
            }}
          >
            Добавить статус +
          </Button>
          {fields.length > 0 && checkRequire() && (
            <Button
              onClick={handleOpen}
              buttonStyle={{
                bgcolor: "transparent",
                color: "#3492FF",
                fontSize: {
                  mobile: 12.5,
                  planshet: 14,
                },
              }}
            >
              Добавить условие +
            </Button>
          )}
        </Row>
        <Break height={25} />
        <Row>
          <Controller
            name="useProgram"
            control={control}
            defaultValue={useProgram}
            render={({ field }) => (
              <Checkbox
                {...field}
                checked={useProgram}
                label={t("useLoyaltyProgram")}
              />
            )}
          />{" "}
        </Row>
        <Row>
          <Controller
            name="usePoint"
            control={control}
            defaultValue={usePoint}
            render={({ field }) => (
              <Checkbox
                {...field}
                checked={usePoint}
                label={t("substractingPoints")}
              />
            )}
          />
        </Row>
        <Break height={15} />
        <Footer>
          <CancelButton
            onClick={() => {
              dispatch(
                handleClick({
                  type: "cashback",
                  open: false,
                })
              );
            }}
            text={t("cancel")}
          />
          <SaveButton type="submit" text={t("save")} />
        </Footer>
      </Body>
    </Container>
  );
};

export default MainModel;
