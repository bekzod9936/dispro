import React from 'react'
import { Select } from "@material-ui/core"
import { makeStyles } from '@material-ui/core'
import CustomSelectInput from './CustomSelectInput'

const useStyles = makeStyles((theme) => ({
    root: {
        width: "90%",
        height: "40px",
        border: "1px solid lightgrey",
        //padding: "0px 20px",
        outline: "none",
        marginLeft: "20px",
        borderRadius: "12px",
        marginTop: "5px",
        marginBottom: "10px",
    },
    paper: {
        overflowX: "unset",
        overflowY: "unset",
        marginTop: "50px",
        background: "white",
        borderRadius: "14px",
        // paddingLeft: "20px",
        width: "150px",
        "&::before": {
            content: '""',
            position: "absolute",
            marginRight: "-0.71em",
            top: -10,
            left: 15,
            width: "17px",
            height: "17px",
            backgroundColor: "white",
            boxShadow: theme.shadows[1],
            tranlsate: "rotate(180deg)",
            clipPath: "polygon(50% 0%, 0 100%, 100% 100%)"
        }
    }
    ,
    option: {
        width: "100%",
        boxSizing: "border-box",
        padding: "14px 25px",
        "&:hover": {
            background: "rgba(96, 110, 234, 0.1)"
        }
    }


}))

interface IProps {
    children?: any,
    value: string | null,
    options: { key: string, value: string }[]
}


const CustomSelectWithArrow: React.FC<IProps> = ({ children, value, options }) => {
    const classes = useStyles();
    return (
        <Select
            className={classes.root}
            value={value}
            disableUnderline
            MenuProps={{
                classes: { paper: classes.paper }
            }
            }
        >
            {options?.map((item, index) => {
                return <option className={classes.option} key={index} value={item.value}>{item.key}</option>
            })}
        </Select>
    )
}

export default CustomSelectWithArrow
