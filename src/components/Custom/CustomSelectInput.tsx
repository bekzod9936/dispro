import { Input, InputAdornment } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core'
import { ArrowDown } from '../../assets/icons/ClientStatisticsIcons/Filters'

const useStyles = makeStyles({
    root: {
        width: "100%",
        border: '1px solid #C2C2C2',
        boxSizing: "border-box",
        height: "60px",
        borderRadius: "14px",
        outline: "none",
    }
})
const CustomSelectInput = () => {
    const classes = useStyles();

    return (
        <Input
            className={classes.root}
            disableUnderline
            endAdornment={<InputAdornment position="start">
                <ArrowDown />
            </InputAdornment>}

        />

    )
}

export default CustomSelectInput
