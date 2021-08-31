import React, { useState } from 'react';
import { Text } from '../../../styles/CustomStyles';
import { Backdrop, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import { options } from 'yargs';
import { classes } from 'istanbul-lib-coverage';
import { useTranslation } from 'react-i18next';
import { ArrowDown } from '../../../assets/icons/ClientStatisticsIcons/Filters';
import { setOperationStatistics } from '../../../services/redux/Slices/statistics';


const useStyles = makeStyles({
    root: {
        border: "1px solid #c2c2c2",
        borderRadius: "14px",
        height: "57px",
        width: "100%",
        boxSizing: "border-box",
        padding: "14px 14px",
        position: "relative",


    },
    value: {},
    label: {
        marginBottom: "10px",
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        marginRight: '2px',
        padding: "4px 6px",
        borderRadius: "18px",
        background: "#f5f5f5",
    },
    paper: {
        borderRadius: "14px",
        top: 150,
        position: 'absolute'

    }
})

interface IProps {
    options: any,
    label: string,
    setValues?: any,
    values?: any,
    field?: any,
    nodeType?: boolean,
    defaultValue?: any,
    style?: any,
    fieldState?: any

}
const CustomMulitpleSelect: React.FC<IProps> = ({ defaultValue, fieldState, nodeType, options, field, label, setValues, values, style }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);

    // const handleValueChange = (value: any) => {

    //     let newArr = values.filter((item: any) => item !== value);
    //     setValues(newArr);
    // }
    return (
        <div style={{ width: "85%", marginTop: "25px" }}>
            <InputLabel style={{ marginBottom: "10px" }} htmlFor="multopleselect">
                <Text fontSize="16px" fontWeight={700} color="#c7c7c7">
                    {t(label)}
                </Text>
            </InputLabel>
            <Select
                id="multipleselect"
                multiple
                disableUnderline
                className={classes.root}
                displayEmpty
                {...field}
                style={{ border: fieldState?.error ? "1px solid red" : undefined }}
                SelectDisplayProps={{
                    style: {
                        background: "none",
                        zIndex: 500,
                    },
                    onClick: (e) => {
                        e.stopPropagation()
                    }

                }}
                inputProps={{
                    "aria-disabled": true
                }}
                MenuProps={{
                    MenuListProps: {

                    },
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left"
                    },
                    transformOrigin: {
                        vertical: "top",
                        horizontal: "left"
                    },
                    getContentAnchorEl: null,
                    classes: { paper: classes.paper }
                }}
                //value={field ? undefined : values}
                defaultValue={[]}

                //onChange={field ? undefined : (e) => setValues(e.target.value)}
                renderValue={(selected: any) => {
                    if (selected.length > 0) {
                        return <div className={classes.chips}>
                            {selected?.map((value: any) => {

                                return <div className={classes.chip}>{!nodeType ? options[+value - 1]?.name : options[+value - 1]?.key} <span
                                    style={{ fontSize: "10pt", color: "#c0c0c0" }} >x</span></div>
                            })
                            }


                        </div>
                    }
                }}
            >
                {options.map((item: any) => {
                    return <MenuItem value={item.id} style={{ background: field?.value?.includes(item.id) ? "#f5f5f5" : undefined }}>{item.name}</MenuItem>
                })}
            </Select>
        </div>
    );
}

export default CustomMulitpleSelect;
