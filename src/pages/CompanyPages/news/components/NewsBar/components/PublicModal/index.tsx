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
      startLifeTime:
        width > 1000 ? data.startDate : filter?.regDate?.regDateFrom,
      endLifeTime: width > 1000 ? data.endDate : filter?.regDate?.regDateTo,
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
                  <CustomDatePicker
                    margin="0 15px 0 0"
                    isStyledDate
                    text={t("from")}
                    minDate={todayDate}
                    maxDate={filter?.regDate?.regDateTo}
                    onChange={(e) => {
                      let date =
                        "" + e.year + "-" + e.month.number + "-" + e.day;
                      setFilter((prev: any) => ({
                        ...prev,
                        regDate: {
                          ...prev["regDate"],
                          regDateFrom: date,
                        },
                      }));
                    }}
                    value={filter?.regDate?.regDateFrom}
                  />
                </div>
                <div style={{ paddingTop: "20px" }}>
                  <CustomDatePicker
                           isStyledDate
                    text={t("to")}
                    minDate={filter?.regDate?.regDateFrom}
                    onChange={(e) => {
                      let date =
                        "" + e.year + "-" + e.month.number + "-" + e.day;
                      setFilter((prev: any) => ({
                        ...prev,
                        regDate: {
                          ...prev["regDate"],
                          regDateTo: date,
                        },
                      }));
                    }}
                    value={filter?.regDate?.regDateTo}
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
                disabled={
                  filter?.regDate?.regDateFrom && filter?.regDate?.regDateTo
                    ? false
                    : true
                }
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
          {width>600 &&width<=1000 ?     <WrapInputs>
                  <Label>{t("chose_date")}</Label>
                  <div>
                    <CustomDatePicker
                      margin="0 15px 0 0"
                      isStyledDate
                  
                      text={t("from")}
                    
                      minDate={todayDate}
                      maxDate={filter?.regDate?.regDateTo}
                      onChange={(e) => {
                        let date =
                          ""+ e.year + "-" + e.month.number + "-" + e.day;
                        setFilter((prev: any) => ({
                          ...prev,
                          regDate: {
                            ...prev["regDate"],
                            regDateFrom: date
                          },
                        }));
                      }}
                      value={filter?.regDate?.regDateFrom}
                    />
                    <CustomDatePicker
                        isStyledDate
                      text={t("to")}
                      minDate={filter?.regDate?.regDateFrom}
                      onChange={(e) => {
                        let date =
                        ""+e.year + "-" + e.month.number + "-" + e.day;
                        setFilter((prev: any) => ({
                          ...prev,
                          regDate: {
                            ...prev["regDate"],
                            regDateTo: date,
                          },
                        }));
                      }}
                      
                      value={filter?.regDate?.regDateTo}
                    />
                  </div>
                </WrapInputs>:
          <WrapInputs>
            <Label>{t("Выберите период")}</Label>
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
}
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
              <Button
              disabled={ width>600  && width<=1000 &&
                filter?.regDate?.regDateFrom && filter?.regDate?.regDateTo
                  ? false
                  :width<600 ? false : true
              }
                endIcon={width > 335 && <PublishIcon />}
                type="submit"
              >
                {t("Опубликовать")}
              </Button>
            </div>
          )}
        </Form>
      )}
    </Container>
  );
};
