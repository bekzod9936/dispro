import { InputLabel, TextareaAutosize } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "../../../styles/CustomStyles";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  label: {
    marginBottom: "10px",
  },
  textarea: {
    borderRadius: "14px",
    width: "100%",
    border: "1px solid #c2c2c2",
    minHeight: "125px",
    outline: "none",
    boxSizing: "border-box",
    padding: "10px",
  },
});

interface IProps {
  label: string;
  field?: any;
  style?: any;
  fullWidth?: any;
  fieldState?: any;
}

const CustomTextArea: React.FC<IProps> = ({
  fullWidth,
  style,
  label,
  field,
  fieldState,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <div style={{ width: fullWidth ? "100%" : "85%", marginTop: "25px" }}>
      <InputLabel className={classes.label} htmlFor="textarea">
        <Text fontSize="16px" fontWeight={700} color="#c7c7c7">
          {t(label)}
        </Text>
      </InputLabel>
      <TextareaAutosize
        style={{
          ...style,
          border: fieldState?.error ? "1px solid black" : undefined,
        }}
        {...field}
        maxRows={6}
        id="textarea"
        className={classes.textarea}
      />
    </div>
  );
};

export default CustomTextArea;
