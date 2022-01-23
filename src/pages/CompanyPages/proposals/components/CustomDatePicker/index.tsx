import { CalendarIcon } from 'assets/icons/ClientStatisticsIcons/ClientStatisticsIcons'
import DatePicker from 'react-multi-date-picker'
import { Container } from './style'

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
