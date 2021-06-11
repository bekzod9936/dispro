import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import HorizontalMenu from '../../../components/Custom/HorizontalMenu';
import { useAppDispatch, useAppSelector } from '../../../services/redux/hooks';
import { setCurrentSection } from '../../../services/redux/Slices/statistics';

const StatisticsPage = () => {
    const statisticsState = useAppSelector(state => state.statistics);
    const dispatch = useAppDispatch();
    const menuItems = [
        {
            key: "clients",
            title: "Клиенты"
        },
        {
            key: "operations",
            title: "Операции"
        },
        {
            key: "traffic_providers",
            title: "Источники трафика"
        },
        {
            key: "special_proposals",
            title: "Спец предложения"
        },

    ]
    //const [section, sestSection] = useState(menuItems[0].key);

    const menuItemClickHandler = (value: string) => {
        //sestSection(value);
        dispatch(setCurrentSection(value));
    }
    return (
        <div style={{ padding: "30px" }}>
            Statistics1
            <Grid container>
                <Grid item lg={7} > <HorizontalMenu section={statisticsState.currentSection} menuItems={menuItems} menuItemClickHandler={menuItemClickHandler} /></Grid>
            </Grid>

        </div>
    );
}

export default StatisticsPage;
