import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import HorizontalMenu from '../../../components/Custom/HorizontalMenu';
import { useAppDispatch, useAppSelector } from '../../../services/redux/hooks';
import { setCurrentSection } from '../../../services/redux/Slices/statistics';
import ClientsSection from './ClientsSection';
import OperationsSection from './OperationsSection';
import TrafficsSection from './TrafficsSection';
import ProposalsSection from "./ProposalsSection"
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
    const renderSection = () => {
        switch (statisticsState.currentSection) {
            case "clients":
                return <ClientsSection />;
            case "operations":
                return <OperationsSection />
            case "traffic_providers":
                return <TrafficsSection />
            case "special_proposals":
                return <ProposalsSection />

        }
    }
    const menuItemClickHandler = (value: string) => {

        dispatch(setCurrentSection(value));
    }
    return (
        <div style={{ padding: "30px" }}>
            Statistics1
            <Grid container >
                <Grid item lg={7} > <HorizontalMenu section={statisticsState.currentSection} menuItems={menuItems} menuItemClickHandler={menuItemClickHandler} /></Grid>
                {renderSection()}
            </Grid>

        </div>
    );
}

export default StatisticsPage;
