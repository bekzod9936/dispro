import DateFnsUtils from '@date-io/date-fns';
import { Portal } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import React from 'react';
import { setTimeout } from 'timers';
import { CalendarIcon } from '../../assets/icons/ClientStatisticsIcons/ClientStatisticsIcons';

interface IProps {
    date: string,
    isOpen?: boolean | undefined,
    style?: object,
    handleDateChange: Function,
    index?: number,
    prefix?: string,
    mainStyle?: any

}

const CustomDatePicker: React.FC<IProps> = ({ mainStyle, prefix, date, isOpen, style, handleDateChange, index = 0 }) => {

    return (
        <>
            {/* {isOpen != ? */}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    style={{ width: "90%", display: "flex", borderRadius: "12px", marginRight: "10px", ...mainStyle }}
                    inputVariant="standard"
                    keyboardIcon={<CalendarIcon />}
                    margin="normal"
                    error={false}
                    helperText={false}
                    InputProps={{
                        disableUnderline: true,
                        readOnly: true,
                        placeholder: prefix,
                        style: style ? style : {
                            border: "1px solid #C2C2C2",
                            padding: "12px 14px",
                            borderRadius: "12px",
                        }
                    }}


                    value={date}
                    onChange={(date) => handleDateChange(date, index)}


                    KeyboardButtonProps={{
                        'aria-label': 'change date',

                    }}
                />
            </MuiPickersUtilsProvider>


        </>

    );
}

export default CustomDatePicker;
