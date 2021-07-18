import { Checkbox, Grid, Radio, RadioGroup } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowDown, ArrowUp, ResetIcon } from '../../assets/icons/ClientStatisticsIcons/Filters';
import { Flex } from '../../styles/BuildingBlocks';
import { CustomInput, DropDownTitle, Text } from '../../styles/CustomStyles';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import CustomDatePicker from './CustomDatePicker';
import { CalendarIcon } from '../../assets/icons/ClientStatisticsIcons/ClientStatisticsIcons';
import { useDispatch } from 'react-redux';
import { resetFilters } from '../../services/redux/Slices/clientStatistics';
import CustomSelectWithArrow from './CustomSelectWithArrow';

interface ICustomDropDown {
    title: string,
    inputType: string,
    numOfInputs: string[],
    index: number,
    headerButtonText?: string,
    request: string,
    handleInputChange: Function,
    value?: any,
    dateFrom?: any,
    dateTo?: any,
    checked?: string | string[],
}

const CustomDropDown: React.FC<ICustomDropDown> = ({ checked, dateTo, dateFrom, value, title, inputType, index, handleInputChange, headerButtonText, numOfInputs, request }) => {
    const { t } = useTranslation()
    const dispatch = useDispatch();
    const [openFilter, setOpenFilter] = useState<string[] | []>([]);
    const handleArrowUp = () => {
        const newFilterState = openFilter.filter(value => value !== title);
        setOpenFilter([...newFilterState]);
    }
    const handleArrowDown = () => {
        setOpenFilter([...openFilter, title]);
    }
    const renderFields = () => {
        switch (inputType) {
            case "radio":
                // return <RadioGroup row style={{ width: "100%" }}>
                return numOfInputs.map((item, index, array) => {
                    return <Grid item lg={array.length == 2 ? 5 : array.length == 3 ? 4 : array.length == 4 ? 6 : 12}>
                        <Radio
                            checked={checked === item}
                            color="primary" value={item} onChange={(value) => { handleInputChange(value.currentTarget.value) }} />
                        <Text marginLeft="0px" fontWeight={400}>{t(item)}</Text>
                    </Grid>
                })

                {/* </RadioGroup> */ }


            case "date":

                return numOfInputs.map((item, index, array) => {
                    return <Grid item lg={array.length == 2 ? 6 : 12} style={{ position: "relative" }}>
                        <CustomDatePicker index={index + 1} date={index == 0 ? dateFrom : dateTo} handleDateChange={handleInputChange} />

                    </Grid>
                })

            case "input":

                return numOfInputs.map((item, index, array) => {
                    return <Grid style={{ textAlign: "center" }} item lg={array.length === 1 ? 12 : 6}><CustomInput
                        onBlur={(e) => { handleInputChange(e.target.value, index + 1) }}
                        type="text" /></Grid>
                })

            case "checkbox":
                return numOfInputs.map((item) => {
                    return <Grid item lg={5}><Checkbox color="primary" /><Text fontWeight={400} marginLeft="0px" fontSize="13px">{item}</Text></Grid>
                })

            case "select":
                return numOfInputs.map(item => {
                    return <CustomSelectWithArrow value={"12345"} options={[{ key: "sfsdfsdf", value: "sadfasdfasdf" }]} />
                }
                )


        }
    }

    return (
        <>
            <DropDownTitle index={index}>
                <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
                    <div>{t(title)}</div>
                    {(inputType !== "header" && !openFilter.find((value) => value === title)) ? <div onClick={handleArrowDown}><ArrowDown /></div> : (inputType !== "header" && openFilter.find(value => value === title)) ?
                        <div onClick={handleArrowUp}><ArrowUp /></div> :
                        <div style={{ cursor: "pointer" }} onClick={() => { dispatch(resetFilters()) }}>{headerButtonText} <ResetIcon /></div>}

                </Flex>
            </DropDownTitle>
            {openFilter.find((value) => value === title) && <div style={{ maxWidth: "400px", background: index % 2 !== 0 ? "#F0F1FD" : "white" }} >
                <Flex
                    width={inputType === "select" ? "80%" : inputType === "input" ? "100%" : inputType === "radio" ? "95%" : "100%"}
                    justifyContent="start" flexDirection="column" alignItems="flex-start">
                    <div>
                        <Text fontSize="14px" color="#C7C7C7" fontWeight={600} marginLeft="12px">{t(request)}</Text>
                    </div>
                    <Grid container>

                        {renderFields()}

                    </Grid>

                </Flex>
            </div>}

        </>
    );
}

export default CustomDropDown;
