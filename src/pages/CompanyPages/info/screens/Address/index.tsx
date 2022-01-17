import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Title, Text } from "../../style";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import Input from "components/Custom/Input";
import Button from "components/Custom/Buttons/Button";
import Spinner from "components/Custom/Spinner";
import { IconButton } from "@material-ui/core";
import WorkingHours from "./WorkingHours";
import { useMutation } from "react-query";
import { IAddress } from "services/models/address_model";
import YandexMap from "./YandexMap";
import axios from "axios";
import partnerApi from "services/interceptors/partner_interceptor";
import NewCompanyNotification from "./NewCompanyNotification";
import useAddress from "./useAddress";
import useInfoPage from "../useInfoPage";
import useLayout from "components/Layout/useLayout";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import SaveButton from "../../components/Buttons/SaveButton";
import ExitButton from "../../components/Buttons/ExitButton";
import {
  setAddressAdding,
  setExitModal,
} from "services/redux/Slices/info/info";
import {
  Container,
  Rightside,
  YandexContainer,
  Form,
  LeftSide,
  MobileMap,
  PlusIcon,
  SearchIcon,
  WrapHeader,
  WrapClose,
  CloseIcon,
  WrapContent,
  AddressInfo,
  Text1,
  Left,
  Right,
  Number,
  AddWrap,
  WrapInput,
  ButtonsWrap,
  Ul,
  Li,
  WrapAddress,
  DeleteIcon,
  WrapSearch,
  WrapLocationAddress,
  NoResult,
  Message,
  DownSide,
  LeftIcon,
  WrapModalClose,
  ModelContent,
  ModelTitle,
  ModalWrap,
  PlanshetHeader,
  PlanshetWrapWorking,
  WrapWorking,
} from "./style";
import FullModal from "components/Custom/FullModal";
import useWindowWidth from "services/hooks/useWindowWidth";
import MultiSelect from "components/Custom/MultiSelect";
import Modal from "components/Custom/Modal";

interface FormProps {
  address?: string;
  addressDesc?: string;
  name?: string;
  aroundTheClock?: boolean;
  telNumbers?: any;
  regionId?: { value?: number; title?: string };
  id?: number;
  isMain?: boolean;
}

interface WProps {
  aroundTheClock: boolean;
  work: {
    day: number;
    dayOff: boolean;
    wHours: { from: string; to: string };
    bHours: { from: string; to: string };
    weekday: string;
  }[];
}

const Address = () => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();
  const companyId: any = localStorage.getItem("companyId");
  const {
    responseAddress,
    dataAddress,
    weeks,
    inntialWorkTime,
    responseRegions,
    regions,
  } = useAddress({
    id: companyId,
  });
  const dispatch = useAppDispatch();
  const { resHeader } = useLayout({ id: companyId });
  const { response, data } = useInfoPage();
  const [workError, setWorkError] = useState<boolean>(false);
  const [fillial, setFillial] = useState<any[]>([]);
  const [searchRes, setSearchRes] = useState<IAddress[]>([]);
  const [inpuSearch, setInpuSearch] = useState<string>("");
  const [searchFocus, setSearchFocus] = useState<boolean>(false);
  const [yandexRef, setYandexRef] = useState<any>(null);
  const [searchAddressList, setSearchaddressList] = useState([]);
  const [searchAddress, setSearchAddress] = useState("");
  const [isSearchInputFocus, setIsSearchInputFocus] = useState(false);
  const [newComp, setNewComp] = useState(false);
  const [open, setOpen] = useState(true);
  const [palceOptions, setPalceOptions] = useState<any[]>([]);
  const [place, setPlace] = useState<any[]>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [add, setAdd] = useState<boolean>(false);
  const [mapAddress, setMapAddress] = useState({ name: "" });
  const [send, setSendDate] = useState<any>({
    aroundTheClock: false,
    work: inntialWorkTime,
  });
  const [modalSaveOpen, setModalSaveOpen] = useState(false);
  const [showWork, setShowWork] = useState(false);
  const [isMain, setIsMain] = useState<boolean>(false);
  const [mapError, setMapError] = useState(false);

  const defaultTime = inntialWorkTime.map((v: any) => {
    const common = weeks.find((i: any) => i.day === v.day);
    return {
      ...v,
      weekday: common?.weekday,
    };
  });

  useEffect(() => {
    dispatch(setAddressAdding(false));
  }, []);

  const [workingTime, setworkingTime] = useState<WProps>({
    aroundTheClock: false,
    work: defaultTime,
  });

  const infoData = useAppSelector((state) => state.info.data);

  const regFilled = useAppSelector((state) => {
    return state.auth.regFilled;
  });
  const fill = infoData?.filledAddress || regFilled?.filledAddress;

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FormProps>({
    mode: "onBlur",
    shouldFocusError: true,
  });

  const values = getValues();

  const fetchYandexAddressName = (lat: any, lon: any) => {
    axios
      .get(
        `https://geocode-maps.yandex.ru/1.x?apikey=fd83ecfe-efaa-4ff2-b7ce-1bd8cac8f127&lang=ru-RU&format=json&geocode=${lat},${lon}`
      )
      .then((res) => {
        setMapAddress({
          name: res.data.response.GeoObjectCollection.featureMember[0].GeoObject
            .metaDataProperty.GeocoderMetaData.Address.formatted,
        });

        setValue(
          "address",
          res.data.response.GeoObjectCollection.featureMember[0].GeoObject
            .metaDataProperty.GeocoderMetaData.Address.formatted
        );
      });
  };

  const onClickPlace = (e: any) => {
    const coords = e.get("coords");
    if (place?.length !== 0 || !open) {
      setPlace(coords);
      yandexRef?.setCenter(coords, 18);
      setMapError(false);
    }
  };

  const onBoundsChange = (e: any) => {
    if ((place[0] !== "" && place[1] !== "") || !edit) {
      const latAndlot = e.get("target").getCenter();
      fetchYandexAddressName(latAndlot[1], latAndlot[0]);
    }
  };

  const searchSelectedAddress = (item: any) => {
    setSearchAddress(item.GeoObject.name);
    const coordinates = item.GeoObject.Point.pos.split(" ");
    yandexRef?.setCenter([coordinates[1], coordinates[0]], 18);
    setIsSearchInputFocus(false);
  };

  const fetchYandexAddressSearch = (searchName: any) => {
    axios
      .get(
        `https://geocode-maps.yandex.ru/1.x?apikey=fd83ecfe-efaa-4ff2-b7ce-1bd8cac8f127&lang=ru-RU&format=json&geocode=${searchName}`
      )
      .then((res) => {
        setSearchaddressList(
          res.data.response.GeoObjectCollection.featureMember
        );
      });
  };

  useEffect(() => {
    if (!open && searchAddress !== "") {
      fetchYandexAddressSearch(searchAddress);
    }
  }, [searchAddress, open]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "telNumbers",
  });

  const handleSearch = (e: any) => {
    setInpuSearch(e.target.value);

    const searchResult = fillial.filter((v: any) => {
      return (
        v.address.toLowerCase().includes(e.target.value?.toLowerCase()) ||
        v.addressDesc.toLowerCase().includes(e.target.value?.toLowerCase()) ||
        v.name.toLowerCase().includes(e.target.value?.toLowerCase())
      );
    });

    setSearchRes(searchResult);
  };

  const handleChoosFillial = (v: any) => {
    const region = regions.filter((a: any) => {
      if (a.value === v.regionId) {
        return a;
      }
    });

    const newNumbers = v.telNumbers.map((v: any) => {
      return { number: +v.slice(4) };
    });
    setAdd(true);
    setPlace([v?.location.lat, v?.location.lng]);
    yandexRef?.setCenter([v?.location.lat, v?.location.lng], 18);
    setOpen(false);
    setValue("id", v.id);
    setValue("name", v.name);
    setSearchAddress(v.address);
    setValue("address", v.address);
    setValue("regionId", region[0]);
    setValue("telNumbers", newNumbers);
    setValue("addressDesc", v.addressDesc);
    setIsMain(v.isMain);
    dispatch(setAddressAdding(true));

    const newData: any = workingTime.work.map((a: any) => {
      const common: any = v?.workingTime?.work?.find(
        (i: any) => i.day === a.day
      );
      return {
        day: a.day,
        dayOff: common?.dayOff || false,
        wHours: common?.wHours || { from: "", to: "" },
        bHours: common?.bHours || { from: "", to: "" },
        weekday: a.weekday,
      };
    });
    setworkingTime({
      aroundTheClock: v.workingTime.aroundTheClock,
      work: newData,
    });
    setSendDate({
      aroundTheClock: v.workingTime.aroundTheClock,
      work: v?.workingTime?.work,
    });
  };

  const handleSaveClick = () => {
    if (!send.aroundTheClock) {
      const a = send.work.filter((v: any) => {
        if (!v.dayOff) {
          if (v.wHours?.from === "" || v.wHours.to === "") {
            return { ...v };
          }
        }
      });

      setWorkError(a?.length === 0);
      if (a?.length !== 0) {
        setShowWork(true);
      } else {
        setShowWork(false);
      }
    }

    if (place[0] !== "" && place[1] !== "") {
      setMapError(false);
    } else {
      setMapError(true);
    }
  };

  const handlePluseClick = () => {
    setOpen(false);
    setAdd(false);

    setMapAddress({ name: "" });
    setValue("address", "");
    yandexRef?.setCenter([41.32847446609404, 69.24298268717716], 10);
    setSearchAddress("");
    setValue("addressDesc", "");
    setValue("name", "");
    setValue("telNumbers", [{ number: "" }]);
    setEdit(true);
    setValue("regionId", undefined);
    setPlace([""]);
    setworkingTime({ aroundTheClock: false, work: defaultTime });
    setIsMain(!data.filledAddress);
    dispatch(setAddressAdding(true));
  };

  const addressDelete = useMutation(
    (v: any) => {
      console.log(v);
      return partnerApi.delete(`/directory/stores/${v}`);
    },
    {
      onSuccess: () => {
        responseAddress.refetch();
        setOpen(true);
        yandexRef?.setCenter([41.32847446609404, 69.24298268717716], 10);
        setPlace([]);
        setEdit(false);
        setMapAddress({ name: "" });
        setValue("id", undefined);
        setValue("name", "");
        setSearchAddress("");
        setValue("address", "");
        setValue("regionId", undefined);
        setValue("telNumbers", [{ number: "" }]);
        setValue("addressDesc", "");
        setSendDate({ aroundTheClock: false, work: inntialWorkTime });
        dispatch(setAddressAdding(false));
      },
    }
  );

  const handleDeleteFilial = () => {
    addressDelete.mutate(getValues("id"));
  };

  const getTime = (e: any) => {
    setSendDate({
      aroundTheClock: e?.aroundTheClock,
      work: e.work.map((v: any) => {
        return {
          day: v.day,
          dayOff: v.dayOff,
          wHours: v.wHours,
          bHours: v.bHours,
        };
      }),
    });
  };

  const addressPut = useMutation(
    (v: any) => {
      return partnerApi.put(`/directory/stores/${v.id}`, v);
    },
    {
      onSuccess: () => {
        setOpen(true);
        resHeader.refetch();
        responseAddress.refetch();
        yandexRef?.setCenter([41.32847446609404, 69.24298268717716], 10);
        setPlace([]);
        setSendDate({ aroundTheClock: false, work: inntialWorkTime });
        dispatch(setAddressAdding(false));
        setEdit(false);
      },
    }
  );

  const addressPost = useMutation(
    (v: any) => {
      return partnerApi.post(`/directory/stores`, v);
    },
    {
      onSuccess: () => {
        setOpen(true);
        responseAddress.refetch();
        resHeader.refetch();
        yandexRef?.setCenter([41.32847446609404, 69.24298268717716], 10);
        setPlace([]);
        dispatch(setAddressAdding(false));
        setEdit(false);
      },
    }
  );

  const mainPut = useMutation(
    (v: any) => {
      return partnerApi.put(`/directory/company/address`, v);
    },
    {
      onSuccess: () => {
        resHeader.refetch();
        response.refetch();
        responseAddress.refetch();
        setOpen(true);
        yandexRef?.setCenter([41.32847446609404, 69.24298268717716], 10);
        setPlace([]);
        dispatch(setAddressAdding(false));
        setEdit(false);
      },
    }
  );

  const mainPost = useMutation((v: any) => {
    return partnerApi.put(`/directory/company/address`, v);
  });

  useEffect(() => {
    const a = send.work.filter((v: any) => {
      if (!v.dayOff) {
        if (v.wHours?.from === "" || v.wHours.to === "") {
          return { ...v };
        }
      }
    });
    setWorkError(a?.length === 0 || send.aroundTheClock);
  }, [send]);

  useEffect(() => {
    setFillial(dataAddress);
    const newArr = dataAddress.map((v: any) => {
      return { lat: v.location.lat, lng: v.location.lng, address: v.address };
    });
    setPalceOptions(newArr);
  }, [dataAddress]);

  const handleSubmitPut = (e: any) => {
    const values = {
      isMain: e.isMain,
      address: e.address,
      addressDesc: e.addressDesc,
      regionId: e?.regionId?.value,
      telNumbers: e.telNumbers.map((v: any) => `+998${v?.number}`),
      companyId: +companyId,
      location: { lat: place[0], lng: place[1] },
      workingTime: send,
      id: e.id,
    };
    if (workError && place[0] !== "" && place[1] !== "") {
      if (isMain) {
        mainPut.mutate({
          ...values,
          telNumber: `+998${e.telNumbers[0]?.number}`,
        });
      } else {
        addressPut.mutate({ ...values, name: e.name });
      }
    }
  };

  const handleSubmitPost = (e: any) => {
    const values = {
      address: e.address,
      addressDesc: e.addressDesc,
      regionId: e?.regionId?.value,
      telNumbers: e.telNumbers.map((v: any) => `+998${v?.number}`),
      companyId: +companyId,
      location: { lat: place[0], lng: place[1] },
      workingTime: send,
      isMain: e.isMain,
    };
    if (workError && place[0] !== "" && place[1] !== "") {
      if (fill) {
        addressPost.mutate({ ...values, name: e.name });
      } else {
        mainPost
          .mutateAsync({
            ...values,
            telNumber: `+998${e.telNumbers[0]?.number}`,
          })
          .then(() => {
            resHeader.refetch();
            response.refetch();
            responseAddress.refetch();
            setOpen(true);
            yandexRef?.setCenter([41.32847446609404, 69.24298268717716], 10);
            setPlace([]);
            setNewComp(true);
            dispatch(setAddressAdding(false));
            setEdit(false);
          });
      }
    }
  };

  useEffect(() => {
    if (!fill) {
      setOpen(false);
      setMapAddress({ name: "" });
      setValue("address", "");
      yandexRef?.setCenter([41.32847446609404, 69.24298268717716], 10);
      setSearchAddress("");
      setValue("addressDesc", "");
      setValue("name", "");
      setValue("telNumbers", [{ number: "" }]);
      setEdit(true);
      setValue("regionId", undefined);
      setPlace([""]);
      setworkingTime({ aroundTheClock: false, work: defaultTime });
      setIsMain(!data.filledAddress);
      dispatch(setAddressAdding(true));
    }
  }, [fill]);

  const onClose = () => {
    setModalSaveOpen(false);
    setOpen(true);
    yandexRef?.setCenter([41.32847446609404, 69.24298268717716], 10);
    setPlace([]);
    setEdit(false);
    setMapAddress({ name: "" });
    setValue("id", undefined);
    setValue("name", "");
    setSearchAddress("");
    setValue("address", "");
    setValue("regionId", undefined);
    setValue("telNumbers", [{ number: "" }]);
    setValue("addressDesc", "");
    setSendDate({
      aroundTheClock: false,
      work: inntialWorkTime,
    });
    setShowWork(false);
    setMapError(false);
    dispatch(setAddressAdding(false));
  };

  const formcontent = (
    <Form
      onSubmit={
        edit ? handleSubmit(handleSubmitPost) : handleSubmit(handleSubmitPut)
      }
    >
      {open ? null : (
        <WrapClose>
          {fill ? (
            <>
              {edit ? (
                <Title>{t("newbranch")}</Title>
              ) : add ? (
                isMain ? (
                  <Title>{t("mainaddress")}</Title>
                ) : (
                  <Title>{t("fillialcompany")}</Title>
                )
              ) : null}
            </>
          ) : (
            <Title>{t("mainaddress")}</Title>
          )}
          {fill ? (
            <IconButton onClick={() => setModalSaveOpen(true)}>
              <CloseIcon />
            </IconButton>
          ) : null}
        </WrapClose>
      )}
      <LeftSide>
        <div>
          <Controller
            name="regionId"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <MultiSelect
                isLoading={responseRegions.isLoading}
                options={regions}
                label={t("chooseregion")}
                margin={{
                  laptop: "0 0 25px",
                }}
                message={t("requiredField")}
                error={errors.regionId ? true : false}
                field={field}
                isClearable={false}
              />
            )}
          />
          <Title>{t("Address")}</Title>
          <Text>{t("enterLocationText")}</Text>
          <WrapAddress>
            <WrapSearch>
              <Input
                label={t("enterLocation")}
                margin={{
                  laptop: "20px 0 25px",
                }}
                onChange={(e) => {
                  setValue("address", e.target.value);
                  if (!e.target.value) setSearchaddressList([]);
                  setSearchAddress(e.target.value);
                }}
                onFocus={() => setIsSearchInputFocus(true)}
                value={searchAddress}
                autoComplete="off"
                type="search"
              />
              <Ul
                visable={searchAddressList.length !== 0 && isSearchInputFocus}
              >
                {searchAddressList?.map((v: any) => (
                  <Li onClick={() => searchSelectedAddress(v)}>
                    {v?.GeoObject.name}
                  </Li>
                ))}
              </Ul>
            </WrapSearch>
            <WrapLocationAddress>
              <Title>{t("selectedaddress")}</Title>
              <span>
                {place[0] !== "" && place[1] !== "" ? mapAddress.name : null}
                {mapError ? <Message>{t("showinmap")}</Message> : null}
              </span>
            </WrapLocationAddress>
          </WrapAddress>
          <MobileMap>
            <YandexContainer bcolor={mapError}>
              <YandexMap
                onBoundsChange={onBoundsChange}
                handleRef={(e: any) => setYandexRef(e)}
                place={place}
                onClickPlaceMark={onClickPlace}
                placeOptions={palceOptions}
              />
            </YandexContainer>
          </MobileMap>
          <Title>{t("addressClarification")}</Title>
          <Text>{t("enterOrientationText")}</Text>
          <Controller
            name="addressDesc"
            control={control}
            rules={{ required: true }}
            defaultValue=""
            render={({ field }) => (
              <Input
                label={t("enterOrientation")}
                error={errors.addressDesc ? true : false}
                message={t("requiredField")}
                type="text"
                field={field}
                margin={{
                  laptop: "20px 0 25px",
                }}
              />
            )}
          />
          {isMain ? null : (
            <>
              <Title>{t("filialName")}</Title>
              <Text>{t("enterTitleText")}</Text>
              <Controller
                name="name"
                control={control}
                rules={{ required: true, maxLength: 30 }}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    maxLength={30}
                    label={t("enterTitle")}
                    error={errors.name ? true : false}
                    message={t("requiredField")}
                    isAbsolute={true}
                    field={field}
                    margin={{
                      laptop: "20px 0 0",
                    }}
                  />
                )}
              />
            </>
          )}

          <ul style={{ listStyle: "none" }}>
            {fields.map((item, index) => {
              return (
                <li key={item?.id}>
                  <Controller
                    name={`telNumbers.${index}.number`}
                    rules={{
                      required: true,
                      maxLength: 9,
                      minLength: 9,
                    }}
                    control={control}
                    defaultValue={values.telNumbers?.[index]?.number}
                    render={({ field }) => (
                      <Input
                        label={t("phoneNumber")}
                        {...field}
                        onChange={(e: any) => {
                          field.onChange(e.target.value.match(/\d/g)?.join(""));
                        }}
                        maskPhone={true}
                        margin={{
                          laptop: "20px 0 0",
                        }}
                        isAbsolute={true}
                        message={t("requiredField")}
                        inputStyle={{ inpadding: "0 20px 0 0" }}
                        error={
                          errors.telNumbers?.[index]?.number ? true : false
                        }
                        IconEnd={
                          index === 0 ? null : (
                            <IconButton
                              style={{ marginRight: "15px" }}
                              onClick={() => remove(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          )
                        }
                        IconStart={<div className="inputstyle">+998</div>}
                        type="text"
                        minLength={9}
                      />
                    )}
                  />
                </li>
              );
            })}
          </ul>
          <Button
            buttonStyle={{
              color: "#3492FF",
              bgcolor: "transparent",
            }}
            onClick={() => {
              append({ number: "" });
            }}
            padding={{ laptop: "0", planshet: "0", desktop: "0", mobile: "0" }}
            margin={{
              laptop: "10px 0 0",
            }}
          >
            {t("addPhoneNumber")}
          </Button>
          <WrapWorking>
            <Title>{t("workingHours")}</Title>
            <WorkingHours workingTime={workingTime} getTime={getTime} />
          </WrapWorking>
          {workError === false && showWork ? (
            <Message>{t("requiredField")}</Message>
          ) : null}
          <ButtonsWrap>
            {fill ? null : (
              <ExitButton
                onClick={() => dispatch(setExitModal(true))}
                margin={{
                  laptop: "20px 10px 0",
                  mobile: "10px 10px 0 0",
                }}
                mobile={true}
              />
            )}
            <SaveButton
              onClick={() => handleSaveClick()}
              disabled={
                addressPut.isLoading ||
                mainPut.isLoading ||
                addressPost.isLoading
              }
              margin={{
                laptop: "20px 0 0",
                mobile: "10px 0 0 0",
              }}
            />
            {isMain || edit ? null : (
              <Button
                buttonStyle={{
                  shadow: "0px 4px 9px rgba(255, 94, 104, 0.46)",
                  weight: "500",
                  bgcolor: "#FF5E68",
                  color: "#FFFFFF",
                }}
                margin={{
                  laptop: "20px 0 0 20px",
                  mobile: "10px 0 0 10px",
                }}
                disabled={addressDelete.isLoading}
                type="button"
                onClick={handleDeleteFilial}
              >
                {t("deletefilial")}
              </Button>
            )}
          </ButtonsWrap>
        </div>
      </LeftSide>
      <DownSide>
        <div>
          {fill ? null : (
            <ExitButton
              onClick={() => dispatch(setExitModal(true))}
              margin={{
                laptop: "20px 10px 0",
                planshet: "0 10px 0",
                mobile: "0",
              }}
              mobile={true}
            />
          )}
          <SaveButton
            onClick={() => handleSaveClick()}
            disabled={
              addressPut.isLoading || mainPut.isLoading || addressPost.isLoading
            }
            margin={{
              laptop: "20px 0 0",
              mobile: "0 0 0 0",
              planshet: "0",
            }}
          />
          {isMain || edit ? null : (
            <Button
              buttonStyle={{
                shadow: "0px 4px 9px rgba(255, 94, 104, 0.46)",
                weight: "500",
                bgcolor: "#FF5E68",
                color: "#FFFFFF",
                height: {
                  planshet: 45,
                },
              }}
              margin={{
                laptop: "20px 0 0 20px",
                mobile: "0",
                planshet: "0 0 0 20px",
              }}
              disabled={addressDelete.isLoading}
              type="button"
              onClick={handleDeleteFilial}
            >
              {t("deletefilial")}
            </Button>
          )}
        </div>
      </DownSide>
    </Form>
  );

  return (
    <>
      <PlanshetHeader>
        {open ? (
          <>
            <Button
              buttonStyle={{
                bgcolor: "white",
                color: "#223367",
                weight: 500,
                shadow: "0px 4px 4px rgba(0, 0, 0, 0.04)",
                fontSize: {
                  mobile: 14,
                  laptop: 16,
                  desktop: 18,
                },
                height: {
                  mobile: 36,
                  planshet: 45,
                  laptop: 50,
                  desktop: 60,
                },
              }}
              margin={{
                mobile: "15px 0 0 20px",
              }}
              onClick={handlePluseClick}
            >
              <PlusIcon />
              {t("addFilial")}
            </Button>
            <WrapInput>
              <Input
                inputStyle={{
                  inpadding: "0 10px",
                  border: "none",
                  height: { mobile: 36 },
                }}
                placeholder={t("searchbarnches")}
                IconStart={<SearchIcon />}
                margin={{ laptop: "0 0 0 20px", mobile: "0 20px" }}
                fullWidth={true}
                onChange={handleSearch}
                type="search"
                onFocus={() => setSearchFocus(true)}
                onBlur={() =>
                  inpuSearch === "" ? setSearchFocus(false) : null
                }
                value={inpuSearch}
              />
            </WrapInput>
          </>
        ) : null}
      </PlanshetHeader>
      <Container>
        {open ? (
          <>
            <AddWrap>
              <div>
                <WrapHeader>
                  <Button
                    buttonStyle={{
                      bgcolor: "white",
                      color: "#223367",
                      weight: 500,
                      shadow: "0px 4px 4px rgba(0, 0, 0, 0.04)",
                      fontSize: {
                        mobile: 14,
                        laptop: 16,
                        desktop: 18,
                      },
                      height: {
                        mobile: 36,
                        planshet: 45,
                        laptop: 50,
                        desktop: 60,
                      },
                    }}
                    margin={{
                      mobile: "15px 0 0 20px",
                    }}
                    onClick={handlePluseClick}
                  >
                    <PlusIcon />
                    {t("addFilial")}
                  </Button>
                  <WrapInput>
                    <Input
                      inputStyle={{
                        inpadding: "0 10px",
                        border: "none",
                        height: { mobile: 36 },
                      }}
                      placeholder={t("searchbarnches")}
                      IconStart={<SearchIcon />}
                      margin={{ laptop: "0 0 0 20px", mobile: "0 20px" }}
                      fullWidth={true}
                      onChange={handleSearch}
                      type="search"
                      onFocus={() => setSearchFocus(true)}
                      onBlur={() =>
                        inpuSearch === "" ? setSearchFocus(false) : null
                      }
                      value={inpuSearch}
                    />
                  </WrapInput>
                </WrapHeader>
                <WrapContent>
                  {responseAddress.isLoading || responseAddress.isFetching ? (
                    <Spinner />
                  ) : !searchFocus || inpuSearch === "" ? (
                    fillial?.map((v: IAddress) => (
                      <AddressInfo
                        onClick={() => {
                          handleChoosFillial(v);
                        }}
                      >
                        <Left>
                          <Title>{v.name}</Title>
                          <Text1>{v.address}</Text1>
                        </Left>
                        <Right>
                          {v.telNumbers.map((n: any) => (
                            <Number>{n}</Number>
                          ))}
                        </Right>
                      </AddressInfo>
                    ))
                  ) : searchRes.length === 0 ? (
                    <NoResult>{t("noresult")}</NoResult>
                  ) : (
                    searchRes?.map((v: IAddress) => (
                      <AddressInfo
                        onClick={() => {
                          handleChoosFillial(v);
                        }}
                      >
                        <Left>
                          <Title>{v.name}</Title>
                          <Text1>{v.address}</Text1>
                        </Left>
                        <Right>
                          {v.telNumbers.map((n: any) => (
                            <Number>{n}</Number>
                          ))}
                        </Right>
                      </AddressInfo>
                    ))
                  )}
                  <MobileMap>
                    <YandexContainer bcolor={mapError}>
                      <YandexMap
                        onBoundsChange={onBoundsChange}
                        handleRef={(e: any) => setYandexRef(e)}
                        place={place}
                        onClickPlaceMark={onClickPlace}
                        placeOptions={palceOptions}
                      />
                    </YandexContainer>
                  </MobileMap>
                </WrapContent>
              </div>
            </AddWrap>
          </>
        ) : width > 600 || !fill ? (
          formcontent
        ) : (
          <FullModal open={!open}>
            <>
              <WrapModalClose>
                <IconButton
                  onClick={() => setModalSaveOpen(true)}
                  style={{ width: "fit-content" }}
                >
                  <LeftIcon />
                </IconButton>

                {isMain ? (
                  <Title>{t("mainaddress")}</Title>
                ) : edit ? (
                  <Title>{t("newbranch")}</Title>
                ) : add ? (
                  <Title>{t("fillialcompany")}</Title>
                ) : null}
              </WrapModalClose>
              {formcontent}
            </>
          </FullModal>
        )}
        <Rightside>
          {width > 600 ? (
            <YandexContainer bcolor={mapError}>
              <YandexMap
                onBoundsChange={onBoundsChange}
                handleRef={(e: any) => setYandexRef(e)}
                place={place}
                onClickPlaceMark={onClickPlace}
                placeOptions={palceOptions}
              />
            </YandexContainer>
          ) : null}
          {!open ? (
            <PlanshetWrapWorking>
              <Title>{t("workingHours")}</Title>
              <WorkingHours workingTime={workingTime} getTime={getTime} />
            </PlanshetWrapWorking>
          ) : null}
        </Rightside>
        {newComp ? <NewCompanyNotification /> : null}
        <Modal open={modalSaveOpen}>
          <ModelContent>
            <ModelTitle>{t("exitpageaddress")}</ModelTitle>
            <ModelTitle>{t("areyousureleave")}</ModelTitle>
            <ModalWrap>
              <Button
                buttonStyle={{
                  color: "white",
                  bgcolor: "#FF5E68",
                  weight: 500,
                }}
                margin={{
                  laptop: "0 30px 0 0",
                  mobile: "0 10px 0 0",
                }}
                onClick={onClose}
              >
                {t("quit")}
              </Button>
              <Button
                buttonStyle={{
                  color: "white",
                  bgcolor: "#606EEA",
                }}
                onClick={() => {
                  setModalSaveOpen(false);
                }}
              >
                {t("back")}
              </Button>
            </ModalWrap>
          </ModelContent>
        </Modal>
      </Container>
    </>
  );
};

export default Address;
