import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFieldArray, Controller, useWatch } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
//hooks
import useDetail from "../../hooks/useDetail";
//actions
import { addModal, handleClick } from "services/redux/Slices/settingsSlice";
//styles
import {
  Wrapper,
  Column,
  ModalContent,
  MRow,
  Title,
  Row,
  LabelLeft,
  SubText,
  DeleteIcon,
  RightLabel,
  MainText,
} from "./style";
//assets
import { ReactComponent as AddIcon } from "assets/icons/add.svg";
import { ReactComponent as RefreshIcon } from "assets/icons/refresh_page.svg";
//components
import InputFormat from "components/Custom/InputFormat";
import Modal from "components/Custom/Modal";
import CancelButton from "pages/CompanyPages/settings/components/CancelButton";
import Button from "components/Custom/Button";
import MultiSelect from "components/Custom/MultiSelect";
import { Break } from "pages/CompanyPages/settings/styles";
import { IconButton } from "@material-ui/core";
import RippleEffect from "components/Custom/RippleEffect";

const NestedArray = ({ index, control, setValue }: IProps) => {
  const [editLevel, setEditLevel] = useState(false);
  const [smallI, setSmallI] = useState("");
  const { labelType, loyalityOptions, oneFullOptions } = useDetail();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const levels = useWatch({
    control,
    name: `levels`,
  });
  const { append, remove, fields } = useFieldArray({
    control,
    name: `levels.${index}.requirements`,
  });

  const levelReqs = useWatch({
    control,
    name: `levels.${index}.requirements`,
  });
  const openM = useAppSelector((state) => state.settings.openM);

  const handleEdit = (indexMain: any) => {
    setEditLevel(true);
    dispatch(addModal(true));
    setSmallI(indexMain);
  };

  const changeLevelState = (reqType: any, indexN: any) => {
    if (levelReqs.length) {
      let thirdLevel = levelReqs[2] === levelReqs[indexN];
      if (levelReqs[0] === levelReqs[indexN]) {
        return <SubText>Основное условие</SubText>;
      }
      if (reqType?.condition === "or") {
        return (
          <RippleEffect
            onClick={() => handleEdit(indexN)}
            disabled={thirdLevel}
          >
            <MainText disabled={thirdLevel}>Альтернатива</MainText>
          </RippleEffect>
        );
      } else if (reqType?.condition === "and") {
        return (
          <RippleEffect
            onClick={() => handleEdit(indexN)}
            disabled={thirdLevel}
          >
            <MainText disabled={thirdLevel}>Доп. условие</MainText>
          </RippleEffect>
        );
      } else {
        return <SubText>Основное условие</SubText>;
      }
    }
  };

  return (
    <Wrapper>
      {fields.map((item: any, smallIndex: number) => {
        return (
          <Column key={smallIndex}>
            <Row>
              <LabelLeft>
                <SubText>Условия статуса</SubText>
                <IconButton
                  onClick={() => {
                    remove(smallIndex);
                    setValue(
                      `levels.${index}.requirements`,
                      fields.filter(
                        (item: any, indexV: number) => indexV !== smallIndex
                      )
                    );
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </LabelLeft>
              <RightLabel>{changeLevelState(item, smallIndex)}</RightLabel>
            </Row>
            <Controller
              name={`levels.${[index]}.requirements.${[smallIndex]}.type`}
              control={control}
              defaultValue={
                item?.type &&
                loyalityOptions?.find(
                  (c: any) =>
                    c?.value == levels[index]?.requirements[smallIndex]?.type
                )?.value
              }
              render={({ field }) => {
                return (
                  <MultiSelect
                    {...field}
                    name={field.name}
                    placeholder={labelType(item?.type)}
                    options={loyalityOptions?.filter(
                      (item: any) =>
                        !levels[index].requirements?.find(
                          (newItem: any) => newItem?.type == item?.value
                        )
                    )}
                    value={loyalityOptions?.find(
                      (c) =>
                        c.value == levels[index]?.requirements[smallIndex]?.type
                    )}
                    onChange={(e) => {
                      field.onChange(e.value);
                      if (e.value == 2) {
                        setValue(
                          `levels.${[index]}.requirements.${[
                            smallIndex,
                          ]}.condition`,
                          "and"
                        );
                      }
                    }}
                    // error={errors.companyType ? true : false}
                    message={t("requiredField")}
                  />
                );
              }}
            />
            <Break height={10} />
            <Controller
              name={`levels.${[index]}.requirements.${[smallIndex]}.amount`}
              control={control}
              defaultValue={item.amount}
              render={({ field }) => {
                return (
                  <InputFormat
                    width={{
                      width: "100%",
                    }}
                    label="Больше чем"
                    labelStyle={{
                      letterSpacing: "0.5",
                    }}
                    field={field}
                    defaultValue={item.amount}
                  />
                );
              }}
            />
          </Column>
        );
      })}
      <Modal open={openM}>
        <ModalContent>
          {editLevel ? (
            <>
              <MRow jContent="flex-start" aContent="center">
                <Title>Выберите параметры условия статуса</Title>
              </MRow>
              <MRow direction="column" aContent="center">
                <Button
                  buttonStyle={{
                    color: "#606EEA",
                    bgcolor: "#eff0fd",
                    weight: "500",
                  }}
                  endIcon={<RefreshIcon />}
                  onClick={() => {
                    // append({
                    //   type: 1,
                    //   amount: 10,
                    //   condition: "or",
                    //   unit: "шт",
                    // });
                    setValue(
                      `levels.${[index]}.requirements.${[smallI]}.condition`,
                      "or"
                    );
                    console.log(levelReqs, "condition");

                    dispatch(addModal(false));
                    setEditLevel(false);
                  }}
                >
                  Альтернативное условие
                </Button>
                <Button
                  buttonStyle={{
                    color: "#606EEA",
                    bgcolor: "#eff0fd",
                    weight: "500",
                  }}
                  endIcon={<AddIcon />}
                  onClick={() => {
                    // append({
                    //   type: 1,
                    //   amount: 10,
                    //   condition: "and",
                    //   unit: "шт",
                    // });
                    console.log(levelReqs, "condition");
                    setValue(
                      `levels.${[index]}.requirements.${[smallI]}.condition`,
                      "and"
                    );
                    dispatch(addModal(false));
                    setEditLevel(false);
                  }}
                >
                  Дополнительное условие
                </Button>
              </MRow>
              <MRow jContent="center" aContent="center">
                <CancelButton
                  onClick={() => {
                    dispatch(addModal(false));
                    setEditLevel(false);
                  }}
                  text={t("cancel")}
                />
              </MRow>
            </>
          ) : (
            <>
              <MRow jContent="flex-start" aContent="center">
                <Title>Выберите параметры условия статуса</Title>
              </MRow>
              <MRow direction="column" aContent="center">
                <Button
                  buttonStyle={{
                    color: "#606EEA",
                    bgcolor: "#eff0fd",
                    weight: "500",
                  }}
                  endIcon={<RefreshIcon />}
                  onClick={() => {
                    append({
                      type: 1,
                      amount: 10,
                      condition: "or",
                      unit: "шт",
                    });
                    dispatch(addModal(false));
                  }}
                >
                  Альтернативное условие
                </Button>
                <Button
                  buttonStyle={{
                    color: "#606EEA",
                    bgcolor: "#eff0fd",
                    weight: "500",
                  }}
                  endIcon={<AddIcon />}
                  onClick={() => {
                    append({
                      type: 1,
                      amount: 10,
                      condition: "and",
                      unit: "шт",
                    });
                    dispatch(addModal(false));
                  }}
                >
                  Дополнительное условие
                </Button>
              </MRow>
              <MRow jContent="center" aContent="center">
                <CancelButton
                  onClick={() => {
                    dispatch(addModal(false));
                  }}
                  text={t("cancel")}
                />
              </MRow>
            </>
          )}
        </ModalContent>
      </Modal>
    </Wrapper>
  );
};

export default NestedArray;

interface IProps {
  index: any;
  control: any;
  setValue: Function;
}
