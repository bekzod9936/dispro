import { Switch, withStyles } from '@material-ui/core';
import React from 'react';



export const StyledSwitch = withStyles((theme) => ({
    root: {
        width: 44,
        height: 22,
        padding: 0,
        margin: theme.spacing(1),
    },
    switchBase: {
        padding: 1,
        '&$checked': {
            transform: 'translateX(23px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: '#3492FF',
                opacity: 1,
                border: 'none',
            },
        },
        '&$focusVisible $thumb': {
            //    color: '#52d869',
            //  border: '6px solid #ffffffb7',
        },
    },
    thumb: {
        width: 18.6,
        height: 18.6,
    },
    track: {
        borderRadius: 26 / 2,

        backgroundColor: "#C4C4C4",
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
}))(({ classes, ...props }: any) => {
    return (
        <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
            }}
            {...props}
        />
    );
});

