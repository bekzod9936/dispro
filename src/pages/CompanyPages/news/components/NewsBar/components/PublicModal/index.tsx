import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import CustomDatePicker from "components/Custom/CustomDatePicker";
import Button from "components/Custom/Button";
import { Form, WrapInputs, Label, Container, PeriodWrapper } from "./style";
import { useState } from "react";
import Input from "components/Custom/Input";
import { useTranslation } from "react-i18next";
import { todayDate } from "./constants";
import { useAppSelector, useAppDispatch } from "services/redux/hooks";
import { setSelectedNews } from "services/redux/Slices/news";
import { fetchUpdateNews } from "services/queries/newPageQuery";
import dayjs from "dayjs";
import useWindowWidth from "services/hooks/useWindowWidth";
import { CancelIcon } from "assets/icons/ClientsPageIcons/ClientIcons";
import { WhitePublishIcon } from "assets/icons/news/newsIcons";
import {
  MobileCancelIcon,
  PublishIcon,
} from "assets/icons/proposals/ProposalsIcons";
interface PublicClick {
  setPublisOpen?: any;
}

export const PublicModal = ({ setPublisOpen: setPublisOpen }: PublicClick) => {
  const selectedNews = useAppSelector((state) => state.news.selectedNews);
  const updatedNews = selectedNews?.fullData?.data;
  const dispatch = useAppDispatch();
  const newsId = selectedNews?.fullData?.data?.id;
  const { mutate } = useMutation((data: any) => fetchUpdateNews(data));
  const [validation,setValidation]=useState(false)
  const [filter, setFilter] = useState<any>({});
  const history = useHistory();
  const { width } = useWindowWidth();
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
      startLifeTime: data.startDate ,
      endLifeTime:data.endDate ,
      description: updatedNews?.description,
      ageFrom: parseInt(updatedNews?.ageFrom),
      ageUnlimited: false,
      couponIds: [],
      image: updatedNews?.image,
      genderType: updatedNews?.genderType,
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

  const cancelPublish = () => {
    dispatch(setSelectedNews(""));
    setPublisOpen(false);
  };

  return (
    <Container>
      {width <= 600 && (
        <form onSubmit={handleSubmit(upDateWaitingNews)}>
          <PeriodWrapper>
            <div>
              <h5>{t("Выберите период")}</h5>
              <p>{t("Выберите период")}</p>
              <div className="startAndEndDate">
                <div>
                <Controller
                  name="startDate"
                  rules={{
                    required: true,
                  }}
                  control={control}
                  render={({ field }) => (
                    <CustomDatePicker
                      text={t("from")}
                      margin={width > 430 ? "0 10px 0 0" : "0 0 12px 0"}
                      error={errors.startDate}
                      minDate={new Date()}
                      onChange={field.onChange}
                      value={field.value} 
                      />
                  )}
                />
                </div>
                <div style={{ paddingTop: "20px" }}>
                <Controller
                  rules={{
                    required: true,
                  }}
                  control={control}
                  name="endDate"
                  render={({ field }) => (
                    <CustomDatePicker
                      text={t("to")}
                      error={errors.endDate}
                      minDate={watch("startDate")}
                      onChange={field.onChange}
                      value={field.value} />
                  )}
                />
                </div>
              </div>
            </div>
            <div className="buttonsWrapper">
              <Button
                buttonStyle={
                  width > 600
                    ? { color: "#223367", bgcolor: "#ffffff" }
                    : { color: "#606EEA", bgcolor: "rgba(96, 110, 234, 0.1)" }
                }
                margin={{ laptop: "0 20px 0 0", mobile: "0 8px 0 0" }}
                endIcon={<MobileCancelIcon />}
                onClick={cancelPublish}
              >
                {t("Отмена")}
              </Button>
              <Button
                
                buttonStyle={{
                  shadow: "0px 4px 9px rgba(96, 110, 234, 0.46)",
                }}
                endIcon={width > 335 && <PublishIcon />}
                type="submit"
              >
                {t("Опубликовать")}
              </Button>
            </div>
          </PeriodWrapper>
        </form>
      )}
      {width > 600 && (
        <Form onSubmit={handleSubmit(upDateWaitingNews)}>
            <WrapInputs>
                        <div className="startAndEndDate">
                <Controller
                  name="startDate"
                  rules={{
                    required: true,
                  }}
                  control={control}
                  render={({ field }) => (
                    <CustomDatePicker
                      text={t("from")}
                      margin={width > 430 ? "0 10px 0 0" : "0 0 12px 0"}
                      error={errors.startDate}
                      minDate={new Date()}
                      onChange={field.onChange}
                      value={field.value} 
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
                    <CustomDatePicker
                      text={t("to")}
                      error={errors.endDate}
                      minDate={watch("startDate")}
                      onChange={field.onChange}
                      value={field.value} />
                  )}
                />
          </div>
         
              </WrapInputs>
              
        
          {width > 1000 ? (
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
                {t("Отмена")}
              </Button>
              <Button
                buttonStyle={{
                  shadow: "0px 4px 9px rgba(96, 110, 234, 0.46)",
                }}
                type="submit"
                margin={{ laptop: "0 0px 0 0" }}
                startIcon={<WhitePublishIcon />}
              >
                {t("Опубликовать")}
              </Button>
            </div>
          ) : (
            <div style={{ display: "flex",  paddingTop: "20px", justifyContent: "center" }}>
              <Button
                buttonStyle={{
                  color: "#606EEA",
                  bgcolor: " rgba(96,110,234,0.1)",
                }}
                margin={{ laptop: "0 20px 0 0",planshet:"0 20px 0 20px", mobile: "0 8px 0 0" }}
                endIcon={<MobileCancelIcon />}
                onClick={cancelPublish}
              >
                {t("Отмена")}
              </Button>
              <Button     type="submit">
            
                {t("Опубликовать")}
              </Button>
            </div>
          )}
        </Form>
      )}
    </Container>
  );
};
