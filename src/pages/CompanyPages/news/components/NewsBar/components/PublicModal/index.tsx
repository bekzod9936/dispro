import { Controller, useForm, useWatch } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";

import Button from "components/Custom/Button";
import { Form, WrapInputs, Label, WrapDate, Container } from "./style";
import { useState } from "react";
import Input from "components/Custom/Input";
import { useTranslation } from "react-i18next";
import { todayDate, nextDay } from "./constants";
import { useAppSelector } from "services/redux/hooks";
import { fetchUpdateNews } from "services/queries/newPageQuery";
import {
  CancelIcon,
  CloseIcon,
} from "assets/icons/ClientsPageIcons/ClientIcons";
import { WhitePublishIcon } from "assets/icons/news/newsIcons";
interface PublicClick {
  setPublisOpen?: any;
}

export const PublicModal = ({ setPublisOpen: setPublisOpen }: PublicClick) => {
  const selectedNews = useAppSelector((state) => state.news.selectedNews);
  const updatedNews = selectedNews?.fullData?.data;
  const newsId = selectedNews?.fullData?.data?.id;
  const { mutate } = useMutation((data: any) => fetchUpdateNews(data));
  const [filter, setFilter] = useState<any>({});
  const history = useHistory();
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    shouldFocusError: true,
    reValidateMode: "onChange",
  });

  const upDateWaitingNews = (data: any) => {
    let newsBody = {
      title: updatedNews?.title,
      startLifeTime: filter?.regDate?.regDateFrom,
      endLifeTime: filter?.regDate?.regDateTo,
      description: updatedNews?.description,
      ageFrom: parseInt(updatedNews?.ageFrom),
      ageUnlimited: false,
      couponIds: [],
      image: updatedNews?.image,
      genderType: data.gender?.id,
      pushUp: updatedNews?.pushUp,
      settings: {
        weekDays:
          updatedNews?.pushUp && updatedNews?.settings?.length > 0
            ? updatedNews?.settings?.weekdays.map((el: any) => el)
            : [0, 1, 2, 3, 4, 5, 6],
        aroundTheClock: updatedNews?.settings?.aroundTheClock,
        time: {
          from:
            updatedNews?.pushUp && updatedNews?.settings?.time?.from
              ? updatedNews?.settings?.time?.from
              : "00:00",
          to:
            updatedNews?.pushUp && updatedNews?.settings?.time?.to
              ? updatedNews?.settings?.time?.to
              : "23:59",
        },
        stores:
          updatedNews?.pushUp && updatedNews?.settings?.stores?.length
            ? updatedNews?.settings?.stores?.map((el: any) => el)
            : [],
      },
      pushUpTitle: updatedNews?.pushUpTitle,
    };

    let newsInfo = { newsBody, newsId };

    mutate(newsInfo);
    setTimeout(() => history.push("/news"), 500);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(upDateWaitingNews)}>
        <WrapInputs>
          <Label>{t("chose_date")}</Label>
          <div>
            <Input
              type="date"
              width={{
                maxwidth: 200,
              }}
              min={todayDate}
              required={true}
              IconStart={<WrapDate>{t("from")}</WrapDate>}
              inputStyle={{
                inpadding: "0 10px 0 0",
              }}
              value={filter?.regDate?.regDateFrom}
              onChange={(e) =>
                setFilter((prev: any) => ({
                  ...prev,
                  regDate: {
                    ...prev["regDate"],
                    regDateFrom: e.target.value,
                  },
                }))
              }
            />
            <Input
              type="date"
              min={
                filter?.regDate?.regDateFrom
                  ? filter?.regDate?.regDateFrom
                  : nextDay
              }
              width={{
                maxwidth: 200,
              }}
              required={true}
              margin={{ laptop: "0 0 0 15px" }}
              IconStart={<WrapDate>{t("to")}</WrapDate>}
              inputStyle={{
                inpadding: "0 10px 0 0",
              }}
              value={filter?.regDate?.regDateTo}
              onChange={(e) =>
                setFilter((prev: any) => ({
                  ...prev,
                  regDate: {
                    ...prev["regDate"],
                    regDateTo: e.target.value,
                  },
                }))
              }
            />
          </div>
        </WrapInputs>

        <div
          style={{
            display: "flex",
            paddingTop: "20px",
            justifyContent: "flex-end",
          }}
        >
          <Button
            buttonStyle={{ color: "#223367", bgcolor: "#ffffff" }}
            margin={{ laptop: "0 22px 0 0" }}
            onClick={() => setPublisOpen(false)}
            startIcon={<CancelIcon />}
          >
            Отмена
          </Button>
          <Button
            type="submit"
            margin={{ laptop: "0 0px 0 0" }}
            startIcon={<WhitePublishIcon />}
          >
            Опубликовать
          </Button>
        </div>
      </Form>
    </Container>
  );
};
