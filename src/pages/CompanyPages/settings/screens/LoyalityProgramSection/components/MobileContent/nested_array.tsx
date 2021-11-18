import { useTranslation } from "react-i18next";
import { useFieldArray, Controller, useWatch } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
//hooks
import useDetail from "../../hooks/useDetail";
//actions
import { addModal } from "services/redux/Slices/settingsSlice";
//styles
import { Wrapper, Column, ModalContent, MRow, Title } from "./style";
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

const NestedArray = ({ index, control, setValue }: IProps) => {
  const { labelType, loyalityOptions } = useDetail();
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
  const openM = useAppSelector((state) => state.settings.openM);

  return (
    <Wrapper>
      {fields.map((item: any, smallIndex: number) => {
        return (
          <Column key={smallIndex}>
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
