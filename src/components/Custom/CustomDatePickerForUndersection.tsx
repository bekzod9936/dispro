interface IProps {
  date: string;
  style?: object;
  isOpen: boolean;
  handleDateChange: Function;
  index?: number;
  top?: number;
  left?: number;
}

const CustomDatePickerForUndersection: React.FC<IProps> = ({
  date,
  isOpen,
  top,
  left,
  style,
  handleDateChange,
  index = 0,
}) => {
  return (
    <>
      {/* {isOpen != ? */}
      {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          style={style}
          variant='inline'
          format='MM/dd/yyyy'
          inputVariant='standard'
          keyboardIcon={<CalendarIcon />}
          margin='normal'
          placeholder='chose_date'
          open={isOpen}
          InputProps={{
            disableUnderline: true,
            readOnly: true,
            style: style
              ? style
              : {
                  border: '1px solid #C2C2C2',
                  padding: '12px 14px',
                  borderRadius: '12px',
                },
          }}
          PopoverProps={{
            //   disableEnforceFocus: true,
            style: {
              //   pointerEvents: "none",
            },
            PaperProps: {
              style: {
                top: top,
                left: left,
              },
            },
          }}
          value={date}
          onChange={(date) => handleDateChange(date, index)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider> */}
    </>
  );
};

export default CustomDatePickerForUndersection;
