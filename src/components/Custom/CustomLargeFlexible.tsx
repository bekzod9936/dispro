import { Input, InputAdornment } from '@material-ui/core';
import React from 'react';
import { SearchIcon } from '../../assets/icons/ClientsPageIcons/ClientIcons';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles({
    input: {
        background: "white",
        borderRadius: "12px",
        fontSize: "15px",
        fontWeight: 500,
    },

    adornment: {

    },
});

interface ICustomSearchFlexible {
    margin?: string,
    padding?: string,
    width?: string,
    adornmentMargin?: string,
    onChange?: any,
    placeholder?: string,
    value?: string
}


const CustomSearchFlexible: React.FC<ICustomSearchFlexible> = ({ value, placeholder, margin, padding, width, adornmentMargin, onChange }) => {
    const classes = useStyles();
    return (
        <>
            <Input className={classes.input}
                disableUnderline
                style={{
                    margin: margin || "auto",
                    padding: padding || "0px",
                    width: width || "auto",
                }}
                placeholder={placeholder || ""}
                onChange={onChange}
                value={value}
                startAdornment={
                    <InputAdornment position="start" style={{ margin: adornmentMargin || "0px", marginRight: "10px" }}>
                        <SearchIcon />
                    </InputAdornment>
                }
            />

        </>
    );

}

export default CustomSearchFlexible;
