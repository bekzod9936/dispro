import { IProps } from "./type";
import { Controller } from "react-hook-form";
import { Container, HeadText, Header, Body, Text } from "./style";
import TwoUsers from "../../../../components/TwoUsers";
import { useTranslation } from "react-i18next";
import Button from "components/Custom/Buttons/Button";
import InputFormat from "components/Custom/InputFormat";
import { Break } from "../../../../style";
import { ruCount } from "services/utils";

const ReferalCard = ({
  removeCol,
  item,
  index,
  fields,
  control,
  errors,
}: IProps) => {
  const { t } = useTranslation();
  return (
    <Container>
      <Header>
        <HeadText>Уровень {index + 1}</HeadText>
        {index === fields.length - 1 && index !== 0 && (
          <Button
            buttonStyle={{
              bgcolor: "transparent",
              color: "#FF5E68",
            }}
            onClick={removeCol}
          >
            {t("delete")}
          </Button>
        )}
      </Header>
      <Break height={15} />
      <Body>
        <Controller
          name={`referals.${[index]}.percent`}
          control={control}
          defaultValue={item?.percent}
          rules={{
            required: true,
          }}
          render={({ field }) => {
            return (
              <InputFormat
                width={{
                  width: "100%",
                }}
                label={"Укажите %"}
                field={field}
                max="100"
                message={""}
                error={errors?.referals?.[index]?.percent ? true : false}
              />
            );
          }}
        />
        <Break height={10} />
        <Text>1 клиент получает _% с каждой покупки 2 Клиентa</Text>
        <Break height={15} />

        <TwoUsers
          name1="Саша"
          name2="Егор"
          name3={
            item.number === 2
              ? "Петя"
              : item.number > 2
              ? index +
                " " +
                ruCount({
                  count: index,
                  firstWord: t("people"),
                  secondWord: t("peopleRu"),
                  thirdWord: t("peopleRu"),
                })
              : null
          }
        />
      </Body>
    </Container>
  );
};

export default ReferalCard;
