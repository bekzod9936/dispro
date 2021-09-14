import { InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Text } from '../../styles/CustomStyles';

interface IProps {
  field?: any;
  label: string;
  options: {
    key: any;
    value: number | string;
  }[];
  fillColor?: string;
  defaultValue?: number | string;
}
const useStyles = makeStyles({
  select: {
    border: '1px solid #C2C2C2',
    width: '85%',
    height: '60px',
    outline: 'none',
    borderRadius: '14px',
    padding: '0px',
    boxSizing: 'border-box',
    fontWeight: 700,
  },
  label: {
    margin: '10px',
  },
  input: {
    padding: '0px 15px',
    background: 'white',
  },
  paper: {
    marginTop: '60px',
  },
});
const CustomReusableSelect: React.FC<IProps> = ({
  defaultValue,
  fillColor,
  field,
  label,
  options,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <div style={{ width: '100%' }}>
      <InputLabel className={classes.label} htmlFor='select'>
        <Text color='#c2c2c2' fontSize='16px' marginLeft='0px' fontWeight={700}>
          {t(label)}
        </Text>
      </InputLabel>
      <Select
        id='select'
        disableUnderline
        style={{ background: fillColor || 'white' }}
        {...field}
        className={classes.select}
        defaultValue={defaultValue || null}
        inputProps={{
          className: classes.input,
          style: {
            background: fillColor || 'white',
          },
        }}
        SelectDisplayProps={{
          style: {
            background: fillColor || 'white',
          },
        }}
        MenuProps={{
          PaperProps: {
            className: classes.paper,
          },
        }}
      >
        {options.map((item) => {
          return <MenuItem value={item.value}>{item.key}</MenuItem>;
        })}
      </Select>
    </div>
  );
};

export default CustomReusableSelect;
