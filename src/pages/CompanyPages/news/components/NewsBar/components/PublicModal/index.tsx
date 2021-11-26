import { Controller, useForm, useWatch } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";

import Button from "components/Custom/Button";
import { Form, WrapInputs, Label, WrapDate, Container,PeriodWrapper } from "./style";
import { useState } from "react";
import Input from "components/Custom/Input";
import { useTranslation } from "react-i18next";
import { todayDate, nextDay } from "./constants";
import { useAppSelector } from "services/redux/hooks";
import { fetchUpdateNews } from "services/queries/newPageQuery";
import dayjs from "dayjs";
import useWindowWidth from "services/hooks/useWindowWidth";
import {
  CancelIcon,
  CloseIcon,
} from "assets/icons/ClientsPageIcons/ClientIcons";
import { WhitePublishIcon } from "assets/icons/news/newsIcons";
import { MobileCancelIcon, PublishIcon } from "assets/icons/proposals/ProposalsIcons";
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
  const {width}=useWindowWidth();
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
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
      startLifeTime: data.startDate,
      endLifeTime: data.endDate,
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
    setTimeout(() => history.push("/news/active"), 500);
  };

  
  return (
    <Container>
         {width<=600 &&
         <form onSubmit={handleSubmit(upDateWaitingNews)}>
        <PeriodWrapper >
        <div>
          <h5>Выберите дату публикации</h5>
          <p>Выберите дату публикации</p>
          <div className="startAndEndDate">
            <Controller
              name="startDate"
              rules={{
                required: true,
              }}
              control={control}
              render={({ field }) => (
                <Input
                  label={width <= 430 && t("From")}
                  field={field}
                  type="date"
                  error={!!errors.startDate}
                  min={dayjs(Date.now()).format("YYYY-MM-DD")}
                   message={t("requiredField")}
               
                  margin={{ laptop: "0 20px 20px 0" }}
                />
              )}
            />
            <Controller
              rules={{
                required: true,
              }}
              control={control}
              name="endDate"
              render={({ field }) => (
                <Input
                  field={field}
                  error={!!errors.endDate}
                  label={width <= 430 && t("To")}
                  min={watch("startDate")}
                  message={t("requiredField")}
                  type="date"
          
                />
              )}
            />
          </div>
        </div>
        <div className="buttonsWrapper">
          <Button
            buttonStyle={width > 600 ? { color: "#223367", bgcolor: "#ffffff" } : { color: "#606EEA", bgcolor: "rgba(96, 110, 234, 0.1)" }}
            margin={{ laptop: "0 20px 0 0", mobile: "0 8px 0 0" }}
            startIcon={width > 600 ? <CancelIcon /> : <MobileCancelIcon />}
            onClick={() => setPublisOpen(false)}
          >
            Отменить
          </Button>
          <Button buttonStyle={{
                shadow: '0px 4px 9px rgba(96, 110, 234, 0.46)' 
              }} startIcon={width > 335 && <PublishIcon />} type="submit">
            Опубликовать
          </Button>
        </div>
      </PeriodWrapper>
      </form>
        }
        {width> 600 &&  <Form onSubmit={handleSubmit(upDateWaitingNews)}>
        <WrapInputs>
          <Label>{t("chose_date")}</Label>
          <div className="startAndEndDate">
            <Controller
              name="startDate"
              rules={{
                required: true,
              }}
              control={control}
              render={({ field }) => (
                <Input
                  label={width <= 430 && t("From")}
                  field={field}
                  type="date"
                  error={!!errors.startDate}
                  
                  min={dayjs(Date.now()).format("YYYY-MM-DD")}
                  margin={{ laptop: "0 20px 20px 0" }}
                />
              )}
            />
            <Controller
              rules={{
                required: true,
              }}
              control={control}
              name="endDate"
              render={({ field }) => (
                <Input
                  field={field}
                  error={!!errors.endDate}
                  label={width <= 430 && t("To")}
                  min={watch("startDate")}
                  // message={t("requiredField")}
                  type="date"
                />
              )}
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
          buttonStyle={{
                
            shadow: '0px 4px 9px rgba(96, 110, 234, 0.46)' 
          }}
            type="submit"
            margin={{ laptop: "0 0px 0 0" }}
            startIcon={<WhitePublishIcon />}
          >
            Опубликовать
          </Button>
        </div>
      </Form>}
     
    </Container>
  );
};
