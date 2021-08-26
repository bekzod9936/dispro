import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { COLORS } from '../../services/Types/enums';




const Spinner = () => {
    return (
        <>
            <CircularProgress style={{ width: "40px", height: "40px", color: COLORS.purple }} />
        </>
    );
}

export default Spinner;
