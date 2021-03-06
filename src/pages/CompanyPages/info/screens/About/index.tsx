import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Input from "components/Custom/Input";
import Links from "./Links";
import Spinner from "components/Custom/Spinner";
import { Text, Title } from "../../style";
import MultiSelect from "components/Custom/MultiSelect";
import { useHistory } from "react-router";
import useLayout from "../../../../../components/Layout/useLayout";
import { IconButton } from "@material-ui/core";
import useInfoPage from "../useInfoPage";
import useAbout from "./useAbout";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { inputPhoneNumber } from "utilities/inputFormat";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import SaveButton from "../../components/Buttons/SaveButton";
import ExitButton from "../../components/Buttons/ExitButton";
import LogoDef from "assets/icons/SideBar/logodefault.png";
import { setExitModal } from "services/redux/Slices/info/info";
import { TextArea } from "components/Custom/TextArea";
import useWindowWidth from "services/hooks/useWindowWidth";
import {
  Container,
  UpSide,
  LeftSide,
  RightSide,
  WrapHeader,
  WrapCurrency,
  ArrowIcon,
  WrapArrow,
  PhotoLoadingIcon,
  TrashIcon,
  WrapLoading,
  LabelLoading,
  PhotoWrap,
  WrapTrash,
  Form,
  DownSide,
  WebLink,
  WrapWebLink,
  WebValue,
  WrapKeyWords,
  ButtonKeyWord,
  DeleteIcon,
  Message,
  ForExample,
  WrapPhoto,
} from "./style";

interface FormProps {
  telNumber?: string;
  companyLink?: string;
  link?: string;
  name?: string;
  annotation?: string;
  keywords?: string;
  description?: string;
  categories?: any[];
  socialLinks?: { name?: string; value?: string }[];
  logo?: string;
  links?: [];
}
interface socialProps {
  name?: string;
  value?: any;
}

const Main = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { width } = useWindowWidth();

  const { response, data } = useInfoPage();
  const companyId: any = localStorage.getItem("companyId");
  const {
    resCategory,
    resDelete,
    resUpLoad,
    resinfoSubData,
    handleUpload,
    category,
    handlePhotoDelete,
    upload,
    defSocial,
    defLinks,
  } = useAbout({ logo: data.logo });
  const { resHeader } = useLayout({ id: companyId });

  const [errorLogo, setErrorLogo] = useState(false);
  const [defMulti, setDefMulti] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [logo, setLogo] = useState<any>("");
  const [web, setWeb] = useState<any>([]);
  const [option, setOption] = useState<any[]>([]);
  const [keywords, setKeywords] = useState<any[]>([]);
  const [social, setSocial]: any = useState(defSocial);

  const [links, setLinks] = useState(defLinks);

  const infoData = useAppSelector((state) => state.info.data);
  const regFilled = useAppSelector((state) => {
    return state.auth.regFilled;
  });
  const fill =
    (infoData?.filled && infoData?.filledAddress) ||
    (regFilled?.filled && regFilled?.filledAddress);

  useEffect(() => {
    setCategories(category);
  }, [category]);

  useEffect(() => {
    setDefMulti(data.categories);
  }, [data]);

  useEffect(() => {
    const newArr = categories.filter((v: any) => {
      const def = defMulti.find((i: any) => i === v.value);
      if (def !== undefined) {
        return def;
      }
    });
    setValue("categories", newArr);
    setOption(newArr);
  }, [defMulti, categories]);

  useEffect(() => {
    setLogo(upload);
    setValue("logo", upload);
  }, [upload]);

  useEffect(() => {
    if (logo !== "") {
      setErrorLogo(false);
    }
  }, [logo]);

  useEffect(() => {
    const tel: string = String(data?.telNumber).slice(4);

    setValue("annotation", data.annotation);
    setValue("description", data.description);
    setValue("logo", data.logo);
    setValue("telNumber", tel);
    setValue("socialLinks", data.socialLinks);
    setValue("name", data.name);
    setLogo(data.logo);
    setWeb(data.links);
    if (data?.keyWords !== "") {
      const keys: any = data?.keyWords?.split(",");
      setKeywords(keys);
    } else {
      setKeywords([]);
    }
    const newLinks = links.map((v: any) => {
      const link = data?.socialLinks?.find((i: any) => i.name === v.name);
      return {
        name: v.name,
        value: link?.value || "",
      };
    });
    const newSocial = social.map((v: any) => {
      const link = data?.socialLinks?.find((i: any) => i.name === v.name);
      return {
        ...v,
        value: link?.value || "",
      };
    });
    setLinks(newLinks);
    setSocial(newSocial);
    setValue("socialLinks", newLinks);
  }, [data]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    setError,
    watch,
    clearErrors,
  } = useForm<FormProps>({
    mode: "onBlur",
    shouldFocusError: true,
  });

  const tel: any = getValues();

  let checkPhone = inputPhoneNumber({
    value: tel?.telNumber,
  });

  useEffect(() => {
    if (getValues("telNumber") === undefined) {
      setValue("telNumber", "");
    } else {
      setValue("telNumber", checkPhone.newString);
    }
  }, [checkPhone.check, watch("telNumber")]);

  useEffect(() => {
    const subscription = watch((value: any) => {
      setOption(value.categories);
    });
    return () => subscription.unsubscribe();
  }, [watch(["categories"])]);

  const handleInfoSubmit = (v: any) => {
    const category = v.categories.map((v: any) => v.value);
    if (getValues("companyLink") === "" && getValues("link") === "") {
      if (getValues("keywords") === "") {
        if (logo !== "") {
          resinfoSubData.mutate(
            {
              ...data,
              annotation: v.annotation,
              categories: category,
              companyId: +companyId,
              currencyId: "1",
              description: v.description,
              isHalol: true,
              keyWords: keywords.join(","),
              linkEnable: false,
              links: web,
              logo: logo,
              name: v.name,
              socialLinks: links,
              telNumber: `+998${v.telNumber}`,
              isKosher: false,
            },
            {
              onSuccess: () => {
                resHeader.refetch();
                response.refetch();
                if (!infoData?.filledAddress || !regFilled?.filledAddress) {
                  history.push("/info/address");
                }
              },
            }
          );
        }
      } else {
        setError(
          "keywords",
          { type: "value", message: t("shouldsavekeyword") },
          { shouldFocus: true }
        );
      }
    } else {
      if (getValues("companyLink") === "") {
        setError("companyLink", {}, { shouldFocus: true });
      }
      if (getValues("link") === "") {
        setError(
          "link",
          { type: "value", message: t("requiredField") },
          { shouldFocus: true }
        );
      } else {
        if (getValues("link") !== "") {
          if (
            getValues("link")?.startsWith("https://") ||
            getValues("link")?.startsWith("http://") ||
            getValues("link")?.startsWith("wwww.")
          ) {
            setError(
              "link",
              { type: "value", message: t("shouldsavelink") },
              { shouldFocus: true }
            );
          } else {
            setError(
              "link",
              { message: "???????????????? ????????????" },
              { shouldFocus: true }
            );
          }
        }
      }
    }
  };
  console.log(errors);
  const handleWebDelete = (v: any) => {
    const newArr = web.filter((i: any) => {
      if (i.address === v.address && i.name === v.name) {
        return;
      } else {
        return i;
      }
    });
    setWeb(newArr);
  };

  const handleKeyDelete = (v: any) => {
    const newArr = keywords.filter((i: any) => i !== v);
    setKeywords(newArr);
  };

  const handleWebLink = () => {
    if (getValues("companyLink") === "") {
      setError("companyLink", {}, { shouldFocus: true });
    } else {
      clearErrors("companyLink");
    }
    if (
      getValues("link") === "" ||
      !getValues("link")?.startsWith("https://") ||
      !getValues("link")?.startsWith("http://") ||
      !getValues("link")?.startsWith("wwww.")
    ) {
      if (getValues("link") === "") {
        setError(
          "link",
          { message: t("requiredField") },
          { shouldFocus: true }
        );
      } else {
        if (
          getValues("link")?.startsWith("https://") ||
          getValues("link")?.startsWith("http://") ||
          getValues("link")?.startsWith("wwww.")
        ) {
        } else {
          setError(
            "link",
            { message: "???????????????? ????????????" },
            { shouldFocus: true }
          );
        }
      }
    } else {
      clearErrors("link");
    }
    if (
      getValues("companyLink") !== "" &&
      getValues("link") !== "" &&
      (getValues("link")?.startsWith("https://") ||
        getValues("link")?.startsWith("http://") ||
        getValues("link")?.startsWith("wwww."))
    ) {
      setWeb([
        ...web,
        {
          name: getValues("companyLink"),
          address: getValues("link"),
          enable: false,
        },
      ]);
      setValue("link", "");
      setValue("companyLink", "");
      clearErrors("link");
      clearErrors("companyLink");
    }
  };

  const handleKeywords = () => {
    if (getValues("keywords") === "") {
      setError("keywords", {}, { shouldFocus: true });
    } else {
      clearErrors("keywords");
      setKeywords([...keywords, getValues("keywords")]);
      setValue("keywords", "");
    }
  };

  const handleSocialChange = ({ name, value }: socialProps) => {
    const newLinks = links?.map((v: any) => {
      const a = name === v?.name;
      return {
        ...v,
        value: a ? value : v?.value,
      };
    });
    const newSocial = social?.map((v: any) => {
      if (v.name !== name) {
        return v;
      } else {
        return { ...v, value: value };
      }
    });
    setLinks(newLinks);
    setSocial(newSocial);
    setValue("socialLinks", newLinks);
  };

  const handleSocialDelete = (name: any) => {
    const newLinks = links?.map((v: any) => {
      if (v.name !== name) {
        return v;
      } else {
        return { ...v, value: "" };
      }
    });
    console.log(newLinks);
    const newSocial = social?.map((v: any) => {
      if (v.name !== name) {
        return v;
      } else {
        return { ...v, value: "" };
      }
    });
    setLinks(newLinks);
    setSocial(newSocial);
    setValue("socialLinks", newLinks);
  };

  const selectAndKeywords = (
    <>
      <Controller
        name="categories"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <MultiSelect
            isLoading={resCategory.isLoading || response.isLoading}
            options={option?.length < 2 ? category : []}
            isMulti={true}
            label={t("chose_categories")}
            margin={{
              laptop: "20px 0 25px",
            }}
            message={t("requiredField")}
            error={errors.categories ? true : false}
            field={field}
            isClearable={false}
            nooptionsmessage={t("noOptionMessage")}
          />
        )}
      />
      <Controller
        name="keywords"
        control={control}
        rules={{ required: keywords?.length === 0 }}
        defaultValue=""
        render={({ field }) => (
          <Input
            label={t("keywords")}
            error={errors.keywords ? true : false}
            message={
              errors.keywords?.type === "value"
                ? errors.keywords.message
                : t("requiredField")
            }
            type="string"
            field={field}
            margin={{
              laptop: "20px 0 0",
            }}
            isAbsolute={true}
            inputStyle={{
              border:
                getValues("keywords") !== ""
                  ? "1px solid #606EEA"
                  : "1px solid #C2C2C2",
            }}
            IconEnd={
              <WrapArrow
                onClick={handleKeywords}
                bgcolor={getValues("keywords") !== ""}
                style={{ cursor: "pointer" }}
              >
                <ArrowIcon />
              </WrapArrow>
            }
          />
        )}
      />
      <WrapKeyWords>
        {keywords?.map((v: any) => {
          return (
            <ButtonKeyWord>
              {v}
              <IconButton onClick={() => handleKeyDelete(v)}>
                <DeleteIcon color="#C4C4C4" />
              </IconButton>
            </ButtonKeyWord>
          );
        })}
      </WrapKeyWords>
    </>
  );

  if (resinfoSubData.isLoading || response.isLoading || response.isFetching) {
    return <Spinner />;
  }

  return (
    <Form onSubmit={handleSubmit(handleInfoSubmit)}>
      <UpSide>
        <Container>
          <LeftSide>
            <WrapHeader>
              <Title>{t("logo")}</Title>
              <WrapLoading>
                {logo ? null : (
                  <Text weight="normal" color="#C4C4C4">
                    {t("logo_text")}
                  </Text>
                )}
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="logo1"
                  type="file"
                  onChange={handleUpload}
                />
                {response.isLoading ? (
                  <Spinner />
                ) : logo ? (
                  resDelete.isLoading ? (
                    <Spinner />
                  ) : resDelete.isSuccess && logo === "" ? (
                    <LabelLoading htmlFor="logo1">
                      {t("upload_photo")} <PhotoLoadingIcon />
                    </LabelLoading>
                  ) : (
                    <WrapPhoto>
                      <PhotoWrap
                        onClick={async () => {
                          await handlePhotoDelete();
                          await setLogo("");
                        }}
                      >
                        <LazyLoadImage
                          alt="image"
                          src={logo}
                          height="100%"
                          width="100%"
                          style={{
                            objectFit: "scale-down",
                            borderRadius: "14px",
                          }}
                          effect="blur"
                          onError={(e: any) => {
                            e.target.onerror = null;
                            e.target.src = LogoDef;
                          }}
                        />
                        <WrapTrash>
                          <TrashIcon />
                        </WrapTrash>
                      </PhotoWrap>
                    </WrapPhoto>
                  )
                ) : resUpLoad.isLoading ? (
                  <Spinner />
                ) : (
                  <LabelLoading htmlFor="logo1">
                    {t("upload_photo")} <PhotoLoadingIcon />
                  </LabelLoading>
                )}
              </WrapLoading>
              {errorLogo ? <Message>{t("addinfologo")}</Message> : null}
            </WrapHeader>
            <Controller
              name="name"
              control={control}
              rules={{ required: true, maxLength: 30 }}
              render={({ field }) => (
                <Input
                  label={t("title")}
                  error={errors.name ? true : false}
                  message={t("requiredField")}
                  type="string"
                  field={field}
                  margin={{
                    laptop: "20px 0 25px",
                  }}
                  maxLength={30}
                />
              )}
            />
            <Controller
              name="annotation"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  label={t("company_direction")}
                  error={errors.annotation ? true : false}
                  message={t("requiredField")}
                  type="string"
                  field={field}
                  margin={{
                    laptop: "20px 0 25px",
                  }}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextArea
                  {...field}
                  message={t("requiredField")}
                  error={errors.description ? true : false}
                  minHeight={"120px"}
                  maxHeight={"300px"}
                  resize={"vertical"}
                  title={t("description")}
                />
              )}
            />
            <WrapCurrency>
              <span>{t("currency")}</span>
              <div>UZS (Uzbekistan sum)</div>
            </WrapCurrency>
            {width > 1000 ? selectAndKeywords : null}
          </LeftSide>
          <RightSide>
            {width <= 1000 ? selectAndKeywords : null}
            <Title>{t("phone")}</Title>
            <Text>{t("maincompanynumber")}</Text>
            <Controller
              name="telNumber"
              control={control}
              rules={{ required: true, maxLength: 9, minLength: 9 }}
              defaultValue=""
              render={({ field }) => (
                <Input
                  label={t("phoneNumber")}
                  error={errors.telNumber ? true : false}
                  message={t("requiredField")}
                  type="tel"
                  field={field}
                  margin={{
                    laptop: "20px 0 25px",
                  }}
                  inputStyle={{ inpadding: "0 20px 0 0" }}
                  maxLength={9}
                  IconStart={<div className="inputstyle">+998</div>}
                />
              )}
            />
            <Title>{t("companyLink")}</Title>
            <Text>{t("companyLink_text")}</Text>
            <Controller
              name="companyLink"
              control={control}
              rules={{ required: false }}
              defaultValue=""
              render={({ field }) => (
                <Input
                  message={t("requiredField")}
                  error={errors.companyLink ? true : false}
                  label={t("linkName")}
                  type="string"
                  field={field}
                  margin={{
                    laptop: "20px 0 25px",
                  }}
                />
              )}
            />
            <Controller
              name="link"
              control={control}
              rules={{ required: false }}
              defaultValue=""
              render={({ field }) => (
                <Input
                  label={t("link")}
                  type="string"
                  field={field}
                  margin={{
                    laptop: "20px 0 0",
                  }}
                  inputStyle={{
                    border:
                      getValues("link") !== ""
                        ? "1px solid #606EEA"
                        : "1px solid #C2C2C2",
                  }}
                  isAbsolute={true}
                  message={errors?.link?.message}
                  error={errors.link ? true : false}
                  IconEnd={
                    <WrapArrow
                      style={{ cursor: "pointer" }}
                      onClick={handleWebLink}
                      bgcolor={getValues("link") !== ""}
                    >
                      <ArrowIcon />
                    </WrapArrow>
                  }
                />
              )}
            />
            <ForExample>{t("forexample")}: https://dis-count.app/</ForExample>
            {web?.length > 0 ? <Title>{t("companyLink")}</Title> : null}
            {web?.map((v: any) => (
              <>
                <WrapWebLink key={v.address}>
                  <WebLink>{v?.name}</WebLink>
                  <WebValue>
                    <a href={v?.address} target="_blank">
                      ({v?.address})
                    </a>
                    <IconButton onClick={() => handleWebDelete(v)}>
                      <DeleteIcon />
                    </IconButton>
                  </WebValue>
                </WrapWebLink>
              </>
            ))}
            <Title>{t("socialLinks")}</Title>
            <div style={{ display: "block" }}>
              {social?.map((v: any) => (
                <Links
                  key={v.name}
                  {...v}
                  onChange={handleSocialChange}
                  onDelete={handleSocialDelete}
                />
              ))}
            </div>
          </RightSide>
        </Container>
      </UpSide>
      <DownSide>
        <div>
          {fill ? null : (
            <ExitButton
              onClick={() => dispatch(setExitModal(true))}
              mobile={true}
              margin={{
                laptop: "0 10px 0 0",
              }}
            />
          )}
          <SaveButton
            onClick={() => {
              if (logo === "") {
                setErrorLogo(true);
              }
            }}
            margin={{ laptop: "0" }}
          />
        </div>
      </DownSide>
    </Form>
  );
};

export default Main;
