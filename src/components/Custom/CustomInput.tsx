import { Input, InputLabel } from '@material-ui/core';
import React from 'react';
import { makeStyles } from "@material-ui/core"
import { useTranslation } from 'react-i18next';
import { Text } from '../../styles/CustomStyles'
import { Flex } from '../../styles/BuildingBlocks';
import { AddIconSettings, DeleteIcon } from '../../assets/icons/SettingsIcons/SettingsPageIcon';
interface IProps {
    type?: string,
    field?: any,
    label: string,
    aboveInput?: string,
    centered?: boolean
    id?: string,
    error?: string,
    notRequired?: boolean,
    aboveLabel?: any,
    style?: Object,
    onChange?: any,
    name?: string,
    withPercent?: boolean
    stylePercent?: any,
    handleAddClick?: any,
    handleDeleteClick?: any,
    specialCase?: boolean,
    flexStyle?: any,
    onPercentChange?: any
    value?: any,
    valuePercent?: any,
    labelWidth?: string | null
}
const useStyles = makeStyles({
    input: {
        width: "85%",
        padding: "15px 20px",
        fontSize: "13pt",
        border: "1px solid #c2c2c2",
        borderRadius: "14px",
    },
    label: {
        display: "flex",
        justifyContent: "spacebetween",
        marginBottom: "10px",
    },
    aboveInput: {
        marginBottom: "10px"
    },
    error: {
        fontSize: "12pt",
        fontWeight: 300,
        color: "red",

    }
})
const CustomInput: React.FC<IProps> = ({ labelWidth,
    valuePercent,
    value,
    onPercentChange,
    flexStyle,
    specialCase,
    handleDeleteClick,
    handleAddClick,
    stylePercent,
    withPercent,
    name,
    onChange,
    style,
    type,
    field,
    id,
    label,
    aboveInput,
    error,
    notRequired,
    centered,
    aboveLabel }) => {

    const { t } = useTranslation();
    const classes = useStyles();
    return (
        <>
            {(aboveInput && aboveLabel) && <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "start", width: "85%" }}>
                <div style={{ marginTop: "25px" }}>
                    <Text fontSize="16px" fontWeight={500}>
                        {t(aboveInput)}
                    </Text>
                </div>
                <div style={{ width: "90%", marginTop: "7px" }}>
                    <Text fontSize="14px" fontWeight={300}>{t(aboveLabel)}</Text>
                </div>

            </div>}
            <InputLabel style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", width: "85%", marginTop: (aboveInput && aboveLabel) ? "15px" : specialCase ? "0px" : "20px" }} htmlFor={id} >
                <div>
                    <Text fontSize="16" fontWeight={700} color="#C7C7C7">
                        {t(label)}
                    </Text>
                </div>
                {notRequired && <div style={{ marginLeft: "25%" }}>
                    <Text fontSize="12px" fontWeight={300} color="#C4C4C4">
                        {t("notRequiredField")}
                    </Text>
                </div>}


            </InputLabel>
            <Flex justifyContent="start" alignItems="center" width={withPercent ? "auto" : "100%"} style={flexStyle}>
                <div style={!centered ? { width: "100%", margin: "0px" } : { width: "100%", margin: "0px", display: "flex", justifyContent: "center" }}>
                    <Input value={value} name={name} onChange={onChange} style={style} disableUnderline className={classes.input} {...field} id={id} />
                </div>
                {withPercent &&
                    <>
                        <div>
                            <Input value={valuePercent} style={{ width: "105px" }} disableUnderline className={classes.input} onChange={onPercentChange} />
                        </div>
                        <div onClick={handleAddClick} style={{ padding: "12px", borderRadius: '14px', }}>
                            <AddIconSettings />
                        </div>
                        <div onClick={handleDeleteClick} style={{ padding: "12px", borderRadius: '14px', }}>
                            <DeleteIcon />
                        </div>
                    </>
                }


            </Flex>
            {error && <div>
                <span className={classes.error}>{t(error)}</span>
            </div>}
        </>

    );
}

export default CustomInput;
