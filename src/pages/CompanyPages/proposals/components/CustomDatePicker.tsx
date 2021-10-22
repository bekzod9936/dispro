import { CalendarIcon } from 'assets/icons/ClientStatisticsIcons/ClientStatisticsIcons'
import DatePicker from 'react-multi-date-picker'
import styled from 'styled-components'

export const CustomDatePicker = (props: any) => {
    // const [value, setValue] = React.useState(new Date())


    return (
        <Container {...props}>
            <DatePicker 
                calendarPosition="bottom"
                scrollSensitive={false}
                minDate={props.minDate}
                maxDate={props.maxDate}
                disabled={props.disabled} 
                onChange={(date) => {
                props?.field?.onChange(date)
            }} 
                format="D MMMM YYYY" /* value={value} onChange={handleChange} */ 
                inputClass="customInput" />
            <CalendarIcon />  
         
        </Container>
    )
}


const Container = styled.div`
    max-width: ${({maxWidth}: any) => maxWidth || "500px"};
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 25px;
    margin-right: ${({marginRight}: any) => marginRight || 0};
    
    div.rmdp-container {    
        width: 100%;
    }
   
    input.customInput {
        width: 100%;
        border: 1px solid #C2C2C2;
        box-sizing: border-box;
        border-radius: 14px;
        padding: 16px 25px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 500 !important;
        color: #223367;
        font-family: "Roboto", sans-serif;
        outline: 0;
    }
    svg {
        position: absolute;
        right: 25px;
        pointer-events: none;
    }
`