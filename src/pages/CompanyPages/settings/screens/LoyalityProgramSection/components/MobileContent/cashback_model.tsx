import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
//assets and style
import { ReactComponent as ArrowBack } from "assets/icons/arrow_left.svg";
import { Container, Header, Body, Row, Htext, Text, Column } from "./style";
import { FormProps } from "../../hooks/useLoyality";
//hooks
import { useAppSelector } from "services/redux/hooks";
import useMobileContent from "./useMobileContent";
//components
import InputFormat from "components/Custom/InputFormat";
import Input from "components/Custom/Input";
import { IconButton } from "@material-ui/core";
import { Break } from "../../../QRCodesSection/components/style";
import NestedArray from "./nested_array";

const CashbackModel = () => {
  const { t } = useTranslation();
  const { handleClick } = useMobileContent();
  const base_loyality = useAppSelector((state) => state.settings.base_loyality);
  const {
    control,
    formState: { errors },
  } = useForm();
  const { fields, append, remove } = useFieldArray<FormProps>({
    control,
    name: "levels",
  });

  return (
    <Container>
      <Header>
        <IconButton onClick={() => handleClick("cashback", false)}>
          <ArrowBack />
        </IconButton>
        <Htext>Настройка предостовления скидки</Htext>
      </Header>
      <Body>
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
                field={field}
                message={t("requiredField")}
              />
            )}
          />
        </Row>
        <Break height={15} />
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
                  name={`base_name`}
                  rules={{
                    required: true,
                  }}
                  control={control}
                  render={({ field }) => (
                    <Input
                      label={"№ 1 Название статуса"}
                      type="string"
                      field={field}
                      message={t("requiredField")}
                    />
                  )}
                />
              </Row>
              <Break height={15} />
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

              {/* //level requirements  */}
              <NestedArray index={index} control={control} />
            </Column>
          );
        })}
      </Body>
    </Container>
  );
};

export default CashbackModel;
