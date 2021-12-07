import { useRef, useState } from 'react';
import {
    Container,
    RDatePicker,
    WrapText,
    WrapButton,
    DateIcon,
    DisabledDateIcon,
    Message,
} from './style';
import { useTranslation } from 'react-i18next';

interface Props {
    onChange?: (e: any) => void;
    margin?: string;
    disabled?: boolean
    value?: any,
    isFilter?: boolean,
    isStyledDate?:boolean
    text?: string
    minDate?: Date | string,
    maxDate?: Date | string,
    error?: boolean,
    message?:string,
    height?: {
        mobile?: number;
        planshet?: number;
        laptop?: number;
        desktop?: number;
    };
}

const CustomDatePicker = ({
    onChange = () => { },
    margin,
    height,
    text,
    message,
    value,
    minDate,
    maxDate,
    error,
    disabled,
    isStyledDate,
    isFilter
}: Props) => {
    const datePickerRef: any = useRef();
    const date = isFilter ? value : value ? "" + value?.day + "-" + value?.month?.number + "-" + value?.year : null
    const styleData=value?.slice(8,10)+value?.slice(4,8)+value?.slice(0,4);
    const handleClick = () => { 
        datePickerRef.current.openCalendar()
    }

    return (
        <Container disabled={disabled} margin={margin} error={error}>
            <WrapButton disabled={disabled} onClick={handleClick}>
                <WrapText disabled={disabled}>
                    {(!date && text) && <span>{text}</span>}
                    {date && <span>{isStyledDate ? styleData:date}</span>}
                </WrapText>
                {disabled ? <DisabledDateIcon /> : <DateIcon />}
            </WrapButton>
            <RDatePicker
                inputClass='custom-input'
                ref={datePickerRef}
                minDate={minDate}
                onChange={onChange}
                maxDate={maxDate}
                value={value}
                disabled={disabled}
                format='YYYY-MM-DD'
                portal={true}
                zIndex={100000}
            />
             <Message  >
                {error ? message : null}
            </Message>
        </Container>
    );
};

export default CustomDatePicker;

