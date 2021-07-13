import React, { useRef } from 'react';
import { Grow, makeStyles, Paper, Popper } from '@material-ui/core';
import { classicNameResolver } from 'typescript';
import { Arrow } from '../../styles/Elements';

// interface IProps {
//     open: boolean,
//     children: any
// }
const useStyles = makeStyles({
    paper: {
        background: "white",
        zIndex: 10,
        borderRadius: "12px",
    },

    popper: {
        zIndex: 15,
        marginTop: "40px"

    }
})


const DropDown = React.forwardRef((props: { open: boolean, children: any }, ref: any) => {

    const classes = useStyles();
    //const arrowRef = useRef(null);

    //const arrowRef = document.querySelector("#arrow");

    return (
        <div>

            <Popper open={props.open}
                transition
                role={undefined}
                anchorEl={ref.current}
                className={classes.popper}
                placement="bottom-end"

                modifiers={{
                    preventOverflow: {
                        enabled: true,
                        boundariesElement: "scrollParent",
                    },
                    arrow: {
                        enabled: true,
                    }
                }}
            >


                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            // transformOrigin: placement === 'bottom' ? 'center bottom' : 'center bottom',

                        }}
                    >
                        <>


                            <Paper className={classes.paper}>
                                {props.children}
                            </Paper>
                        </>
                    </Grow>
                )}

            </Popper>

        </div>
    );
}
)
export default DropDown;
