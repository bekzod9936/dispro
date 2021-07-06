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
import { IClientStatisticFilter } from '../../../services/Types/Components';
import { resetDates, resetFilters, setApplied, setDateFrom, setDateTo, setFilterIsOpen, setGender, setPurchaseCost, setPurchuaseAmountFrom, setPurchuaseAmountTo, setStatus, setTrafficProvider } from '../../../services/redux/Slices/clientStatistics';
import { GridItem } from '../../../styles/BuildingBlocks';
import { PageWrapper } from '../../../styles/CustomStyles';
import { useTranslation } from 'react-i18next';
const StatisticsPage = () => {
    const { t } = useTranslation();
    const statisticsStateUpper = useAppSelector(state => state.statistics);
    const statisticsState = useAppSelector(state => state.clientStatistics);
    const dispatch = useAppDispatch();

    const filters: IClientStatisticFilter[] = [
        {
            title: "gender",
            inputType: "radio",
            request: "chose_gender",
            numOfInputs: ["male", "female"],
            inputHandler: (value: any) => { dispatch(setGender(value)) },
            checked: statisticsState.gender
        },
        {
            title: "registration_date",
            inputType: "date",
            request: "chose_date",
            numOfInputs: ["from", "to"],
            inputHandler: (value: any, index: number) => {
                if (index === 1) {
                    dispatch(setDateFrom(value))
                }
                else {
                    dispatch(setDateTo(value))
                }

            },
            dateFrom: statisticsState.dateFrom,
            dateTo: statisticsState.dateTo
        },
        {
            title: "purchuase_amount",
            inputType: "input",
            request: "enter_purchuase_diaposone",
            numOfInputs: ["from", "to"],
            inputHandler: (value: any, index: number) => {
                if (index === 1) {
                    dispatch(setPurchuaseAmountFrom(value))
                }
                else if (index === 2) {
                    dispatch(setPurchuaseAmountTo(value))
                }

            },
            checked: [statisticsState.purchaseAmountFrom, statisticsState.purchaseAmountFrom]
        },
        {
            title: "purchuase_cost",
            inputType: "input",
            request: "enter_amount",
            numOfInputs: ["cost"],
            inputHandler: (value: number) => {
                dispatch(setPurchaseCost(value))
            }
        },
        {
            title: "status",
            inputType: "checkbox",
            request: "chose_status",
            numOfInputs: ["base", "silver", "gold", "platinum"],
            inputHandler: (value: string) => {
                dispatch(setStatus(value));
            }
        },
        {
            title: "traffic_provider",
            inputType: "radio",
            request: "chose_trafic_provider",
            numOfInputs: ["app", "mobile", "cashier"],
            inputHandler: (value: any) => {
                dispatch(setTrafficProvider(value));
            },
            checked: statisticsState.trafficProvider
        }
    ]

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
            key: "traffic",
            title: "Источники трафика"
        },
        {
            key: "coupons",
            title: "Спец предложения"
        },

    ]

    const renderSection = () => {
        switch (statisticsStateUpper.currentSection) {
            case "clients":
                return <ClientsSection filters={filters} />;
            case "operations":
                return <OperationsSection filters={filters} />
            case "traffic":
                return <TrafficsSection />
            case "coupons":
                return <ProposalsSection />

        }
    }
    const menuItemClickHandler = (value: string) => {

        dispatch(setCurrentSection(value));
        dispatch(resetFilters());
        dispatch(resetDates());
        dispatch(setApplied(true));
    }
    return (
        <PageWrapper>
            {t("statistics")}
            <Grid container style={{ height: "100%" }}>
                <Grid item lg={12}>
                    <Grid item lg={7} > <HorizontalMenu section={statisticsStateUpper.currentSection} menuItems={menuItems} menuItemClickHandler={menuItemClickHandler} /></Grid>
                    {renderSection()}
                </Grid>
            </Grid>


        </PageWrapper>
    );
}

export default StatisticsPage;
