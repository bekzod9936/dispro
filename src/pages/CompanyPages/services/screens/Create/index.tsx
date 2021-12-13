//components
import { useFieldArray, useForm, FormProvider } from "react-hook-form";
import { Header } from "./components/Header";
import Input from "components/Custom/Input";
import Radio from "components/Custom/Radio";
//style
import {
  Wrapper,
  Form,
  Container,
  MeasurementIcon,
  ServicesIcon,
  SectionsIcon,
  QuestionMarkIcon,
  LightToolTip,
  ToggleBlock,
} from "./style";
import { useTranslation } from "react-i18next";
import { SubButton } from "../../style";
import MultiSelect from "components/Custom/MultiSelect";
import { IconButton } from "@material-ui/core";
import CustomToggle from "components/Custom/CustomToggleSwitch";
import { Titles } from "./components/Titles";
import { titleType } from "./components/Titles";
interface CreateProps {}

export interface FormFieldTypes {
  titles: titleType[];
}

const measurements = [
  {
    name: "kg",
    value: 1,
    label: "кг",
  },
];

const radioList = [
  {
    value: 1,
    label: "Товар со скидкой",
  },
  {
    value: 2,
    label: "Товар за баллы",
  },
];

const Create: React.FC<CreateProps> = () => {
  const { t } = useTranslation();

  const form = useForm<FormFieldTypes>({
    mode: "onChange",
    defaultValues: {
      titles: [{ title: "", lang: "(Рус)" }],
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Wrapper>
      <Header />
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <FormProvider {...form}>
          <Container>
            <Titles control={form.control} />
            <div style={{ marginBottom: 25 }}>
              <Input
                label={t("description") + " (Рус)"}
                multiline
                type="textarea"
                inputStyle={{
                  height: { desktop: 124, laptop: 124 },
                  inpadding: "10px 15px",
                }}
              />
              <SubButton>{t("addDescOnAnotherLang")}</SubButton>
            </div>
            <div>
              <MultiSelect
                margin={{
                  desktop: "0 0 20px 0",
                  laptop: "0 0 20px 0",
                }}
                selectStyle={{
                  fontSize: {
                    desktop: 18,
                    laptop: 18,
                  },
                  bgcolor: "#eff0fd",
                  border: "none",
                  placeholdercolor: "#223367",
                  inpadding: "2px 10px 2px 75px",
                  placewieght: "500",
                }}
                iconleft="25px"
                icon={<MeasurementIcon />}
                isMulti
                options={measurements}
                placeholder={t("measurementUnit")}
              />
              <div style={{ display: "flex" }}>
                <MultiSelect
                  margin={{ desktop: "0 20px 0 0", laptop: "0 20px 0 0" }}
                  selectStyle={{
                    fontSize: {
                      desktop: 18,
                      laptop: 18,
                    },
                    bgcolor: "#eff0fd",
                    border: "none",
                    placeholdercolor: "#223367",
                    inpadding: "2px 10px 2px 75px",
                    placewieght: "500",
                  }}
                  iconleft="25px"
                  icon={<ServicesIcon />}
                  options={measurements}
                  placeholder={t("attendance")}
                />
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <MultiSelect
                    selectStyle={{
                      fontSize: {
                        desktop: 18,
                        laptop: 18,
                      },
                      bgcolor: "#eff0fd",
                      border: "none",
                      placeholdercolor: "#223367",
                      inpadding: "2px 10px 2px 75px",
                      placewieght: "500",
                    }}
                    iconleft="25px"
                    icon={<SectionsIcon />}
                    options={measurements}
                    placeholder={t("Космонавты")}
                  />
                  <SubButton>{t("createSection")}</SubButton>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 25,
              }}
            >
              <Radio
                formControlMarginRight="55px"
                flexDirection="row"
                list={radioList}
                textTransform
              />
              <LightToolTip
                placement="top"
                arrow
                title="При заказе этих товаров на их стоимость не будет начислятся cкидка/кешбэк/ баллы, а так же за товар нельзя оплатить баллами"
              >
                <QuestionMarkIcon />
              </LightToolTip>
            </div>
            <ToggleBlock>
              <CustomToggle />
              <p>Не применять программу лояльности</p>
              <LightToolTip
                placement="top"
                arrow
                title="При заказе этих товаров на их стоимость не будет начислятся cкидка/кешбэк/ баллы, а так же за товар нельзя оплатить баллами"
              >
                <QuestionMarkIcon />
              </LightToolTip>
            </ToggleBlock>
          </Container>
        </FormProvider>
      </Form>
    </Wrapper>
  );
};

export default Create;
