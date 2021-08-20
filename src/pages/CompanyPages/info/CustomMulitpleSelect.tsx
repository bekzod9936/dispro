import React from 'react';
import { Text } from '../../../styles/CustomStyles';
import { InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import { options } from 'yargs';
import { classes } from 'istanbul-lib-coverage';
import { useTranslation } from 'react-i18next';


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
        marginRight: '2px'
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
    nodeType?: boolean

}
const CustomMulitpleSelect: React.FC<IProps> = ({ nodeType, options, field, label, setValues, values }) => {
    const classes = useStyles();
    const { t } = useTranslation();
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

                MenuProps={{
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
                value={values}
                defaultValue={[]}
                onChange={(e) => setValues(e.target.value)}
                renderValue={(selected: any) => {
                    if (selected) {
                        return <div className={classes.chips}>
                            {selected?.map((value: any) => {
                                console.log(value, "value+");
                                console.log(values, "value++");


                                return <div onClick={(e) => { e.stopPropagation() }} className={classes.chip}>{!nodeType ? options[+value - 1].name : options[+value - 1].key} <span
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        let filtered = values.filter((item: any) => item !== value);
                                        setValues(filtered)
                                    }}
                                    style={{ fontSize: "12pt", color: "blue", zIndex: 2500, }} >x</span></div>
                            })
                            }


                        </div>
                    }
                }}
            >
                {options.map((item: any) => {
                    return <MenuItem value={item.id}>{item.name}</MenuItem>
                })}
            </Select>
        </div>
    );
}

export default CustomMulitpleSelect;
