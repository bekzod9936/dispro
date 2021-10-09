import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  cursor: pointer;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px;
  padding: 10px;
  margin-top: 100px;
  margin-bottom: 10px;
`;

export const Text = styled.div`
  user-select: none;
  font-weight: 500;
  font-size: 16px;
  color: #223367;
`;

// <KeyboardDatePicker
// disableToolbar
// variant='inline'
// id='date-picker-inline'
// value={selectedDate}
// inputVariant='standard'
// format='MM/dd/yyyy'
// keyboardIcon={<CalendarIcon1 />}
// onChange={(newDate: any) => {
//   handleDateChange(newDate);
// }}
// KeyboardButtonProps={{
//   onFocus: (e: any) => {
//     setIsOpen(true);
//   },
// }}
// PopoverProps={{
//   disableRestoreFocus: true,
//   onClose: () => {
//     setIsOpen(false);
//   },
// }}
// InputProps={{
//   disableUnderline: true,
//   readOnly: true,
//   onFocus: (e: any) => {
//     setIsOpen(true);
//   },
// }}
// open={isOpen}
// />

export const Wrapper = styled.div``;
