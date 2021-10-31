import { IProps, FormProps } from "./types";
import { useForm, Controller } from "react-hook-form";
import {
  Container,
  Content,
  ContentHead,
  ContentBody,
  HeadText,
  Text,
  ContentRow,
  BallText,
  SecondText,
  Form,
  ActDiv,
} from "./style";
import { numberWith } from "services/utils";
import InputFormat from "components/Custom/InputFormat";
import Button from "components/Custom/Button";
import { DownloadIcon } from "assets/icons/SettingsIcons/SettingsPageIcon";

const CashierBalls = ({ ballCount = 0 }: IProps) => {
  const {
    handleSubmit,
    control,
    formState: { isValid, errors },
  } = useForm<FormProps>({
    mode: "onChange",
    shouldFocusError: true,
    reValidateMode: "onChange",
  });

  const onSave = (data: FormProps) => {
    console.log(data.ballAmount, "ball Amount that  I need");
  };

  return (
    <Container>
      <Content>
        <ContentHead>
          <HeadText>Остаток</HeadText>
          <Text>Накоплено</Text>
          <Text>Списано</Text>
        </ContentHead>
        <ContentBody>
          <ContentRow>
            <BallText>{numberWith(ballCount, " ")}</BallText>
            <SecondText>0</SecondText>
            <SecondText>0</SecondText>
          </ContentRow>
          <ContentRow>
            <Form onSubmit={handleSubmit(onSave)}>
              <Controller
                name="ballAmount"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => {
                  return (
                    <InputFormat
                      label={"Колличество баллов"}
                      type="string"
                      field={field}
                      max={parseInt(ballCount).toString()}
                      fullWidth={true}
                      width={{
                        width: "50%",
                      }}
                      margin={{
                        laptop: "30px 0 0",
                      }}
                      error={errors.ballAmount}
                    />
                  );
                }}
              />
              <ActDiv>
                <Button
                  disabled={!isValid}
                  startIcon={<DownloadIcon />}
                  type="submit"
                >
                  Списать баллы
                </Button>
              </ActDiv>
            </Form>
          </ContentRow>
        </ContentBody>
      </Content>
    </Container>
  );
};

export default CashierBalls;
