import { useEffect, useRef, useState } from "react";
import Button from "components/Custom/Buttons/Button";
import { useTranslation } from "react-i18next";
import { IconButton } from "@material-ui/core";
import useWindowWidth from "services/hooks/useWindowWidth";
import {
  Container,
  RDatePicker,
  DownIcon,
  WrapText,
  ResetIcon,
  WrapButton,
  DateIcon,
  MobileReset,
  DeleteIcon,
} from "./style";

interface Props {
  onChange?: (e: any) => void;
  margin?: string;

  defaultValue?: string[];
  numberofmonths?: number;
  height?: {
    mobile?: number;
    planshet?: number;
    laptop?: number;
    desktop?: number;
  };
  notshowvalue?: boolean;
  showoldvalue?: boolean;
  maxDate?: any;
}

const DatePicker = ({
  onChange = () => {},
  margin,
  defaultValue = [""],
  numberofmonths,
  height,
  showoldvalue,
  notshowvalue = true,
  maxDate,
}: Props) => {
  const datePickerRef: any = useRef();
  const { t } = useTranslation();
  const { width } = useWindowWidth();

  const [values, setValues] = useState<any>(defaultValue);

  const [date, setDate] = useState("");
  const handleChange = (e: any) => {
    setValues(e);
  };
  useEffect(() => {
    if (values?.length === 2) {
      onChange(datePickerRef?.current?.childNodes[0]?.attributes?.value?.value);
      datePickerRef.current.closeCalendar();
      setDate(datePickerRef?.current?.childNodes[0]?.attributes?.value?.value);
    }
  }, [datePickerRef?.current?.childNodes[0]?.attributes?.value?.value, values]);

  const handleClick = () => {
    setDate("");
    setValues("");
    onChange("");
  };

  const format = "YYYY-MM-DD";
  if (showoldvalue) {
    return (
      <Container margin={margin}>
        <WrapButton>
          <Button
            startIcon={<DateIcon />}
            endIcon={width > 600 ? <DownIcon /> : null}
            onClick={() => datePickerRef.current.openCalendar()}
            buttonStyle={{
              bgcolor: "white",
              shadow: "0px 4px 4px rgba(0, 0, 0, 0.04)",
              color: "#223367",
              height: height
                ? height
                : {
                    mobile: 36,
                  },
            }}
          >
            <WrapText>
              <span>{t("datePicker")}</span>
              <span>{date}</span>
            </WrapText>
          </Button>
          {date === "" ? null : (
            <IconButton onClick={handleClick}>
              <ResetIcon />
            </IconButton>
          )}
        </WrapButton>
        <RDatePicker
          inputClass="custom-input"
          ref={datePickerRef}
          range={true}
          onChange={handleChange}
          numberOfMonths={numberofmonths ? numberofmonths : width > 600 ? 2 : 1}
          value={values}
          format={format}
          portal={true}
          maxDate={maxDate}
        />
        {date === "" && notshowvalue ? null : (
          <MobileReset>
            {` ${date}`}
            <IconButton onClick={handleClick}>
              <DeleteIcon />
            </IconButton>
          </MobileReset>
        )}
      </Container>
    );
  }
  return (
    <>
      <Container margin={margin}>
        <WrapButton>
          <Button
            startIcon={<DateIcon />}
            endIcon={width > 600 ? <DownIcon /> : null}
            onClick={() => datePickerRef.current.openCalendar()}
            buttonStyle={{
              bgcolor: "white",
              shadow: "0px 4px 4px rgba(0, 0, 0, 0.04)",
              color: "#223367",
              height: height
                ? height
                : {
                    mobile: 36,
                  },
            }}
          >
            <WrapText>
              <span>{t("datePicker")}</span>
              <span>{date}</span>
            </WrapText>
          </Button>
          {date === "" ? null : (
            <IconButton onClick={handleClick}>
              <ResetIcon />
            </IconButton>
          )}
        </WrapButton>
        <RDatePicker
          inputClass="custom-input"
          ref={datePickerRef}
          range={true}
          onChange={handleChange}
          numberOfMonths={numberofmonths ? numberofmonths : width > 600 ? 2 : 1}
          value={values}
          format={format}
          portal={true}
          maxDate={maxDate}
        />
      </Container>

      {date === "" && notshowvalue ? null : (
        <MobileReset>
          {`${t("period")}: ${date}`}
          <IconButton onClick={handleClick}>
            <DeleteIcon />
          </IconButton>
        </MobileReset>
      )}
    </>
  );
};

export default DatePicker;
