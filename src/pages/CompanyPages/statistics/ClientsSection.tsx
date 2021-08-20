import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchClientStatistics } from '../../../services/queries/PartnerQueries';
import { IClientStatistics } from '../../../services/Types/api';
import SingleStatisticsItem from './SingleStatisticsItem';
import { AgeIcon, AllClientsIcon, BagIcon, CalendarIcon, CartIcon, CashbackIcon, ChequeIcon, ClientPoints, CouponIcon, DiscountIcon, FemaleIcon, FilterIcon, MaleIcon, PaidIcon, PurchuasesIcon, QuestionIcon, SerteficatesIcon } from "../../../assets/icons/ClientStatisticsIcons/ClientStatisticsIcons"
import { useAppDispatch, useAppSelector } from '../../../services/redux/hooks';
import { resetDates, resetFilterItem, setApplied, setDateFrom, setDateTo, setEndDate, setFilterIsOpen, setGender, setPurchaseCost, setPurchuaseAmountFrom, setPurchuaseAmountTo, setStartDate, setStatus, setTrafficProvider } from '../../../services/redux/Slices/clientStatistics';
import { setStatistics } from '../../../services/redux/Slices/statistics';
import { useTranslation } from 'react-i18next';
import Filter from '../../../components/Custom/Filter';
import { Flex } from '../../../styles/BuildingBlocks';
import { UnderSectionButton, Text, SectionWrapper } from '../../../styles/CustomStyles';
import { IClientStatisticFilter } from '../../../services/Types/Components';
import CustomDatePicker from '../../../components/Custom/CustomDatePicker';
import moment from 'moment';
import { stat } from 'fs';
import CustomDatePickerForUndersection from '../../../components/Custom/CustomDatePickerForUndersection';
import { ResetIcon } from '../../../assets/icons/ClientStatisticsIcons/Filters';
import InlineFilters from './InlineFilters';
const ClientsSection = ({ filters }: any) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState<boolean>(false);
    const clientStatistics: any = useAppSelector(state => state.statistics.clientStatistics);
    const filterIsOpen = useAppSelector(state => state.clientStatistics.filterIsOpen);
    const statisticsState = useAppSelector(state => state.clientStatistics);
    const section = useAppSelector(state => state.statistics.currentSection)
    const [inlineFilterState, setInlineFilterState] = useState<any>();
    const [date, setDate] = useState(moment(Date.now()).format("YYYY/MM/DD"));
    const dispatch = useAppDispatch();
    const Icons: (() => JSX.Element)[] = [

        AllClientsIcon,
        BagIcon,
        CartIcon,
        AgeIcon,
        ChequeIcon,
        ClientPoints,
        CouponIcon,
        DiscountIcon,
        FemaleIcon,
        MaleIcon,
        CashbackIcon,
        PaidIcon,
        PurchuasesIcon,
        QuestionIcon,
        SerteficatesIcon
    ];
    useEffect(() => {
        setInlineFilterState(statisticsState);
    }, [statisticsState]);
    const handleDateChangeClientStatistics = (date: Date, index: number) => {
        if ((!statisticsState.startDate && !statisticsState.endDate) || (statisticsState.startDate && statisticsState.endDate)) {
            dispatch(setStartDate(date));
            dispatch(setEndDate(null));
            setOpen(false);
        }
        else if (statisticsState.startDate && !statisticsState.endDate) {
            dispatch(setEndDate(date));
            setOpen(false);
        }
    }


    const response = useQuery(["clientStatistics", section, statisticsState.applied, statisticsState.startDate, statisticsState.endDate
    ], () => fetchClientStatistics(
        section, statisticsState.gender, statisticsState.purchaseAmountFrom, statisticsState.purchaseAmountTo, statisticsState.purchaseCost,
        statisticsState.trafficProvider, statisticsState.status, statisticsState.dateTo, statisticsState.dateFrom, statisticsState.startDate, statisticsState.endDate
    ), {
        retry: 0,
        onSuccess: (data) => {
            if (Icons) {
                const responseData = data.data.data;
                const readyData = Object.keys(responseData).splice(0, 15).map((item: string, index) => {

                    return {
                        title: item,
                        quantity: responseData[item],
                        icon: Icons[index],
                    }


                })
                dispatch(setStatistics(readyData));

            }
            dispatch(setApplied(false));


        },
        enabled: !!statisticsState.applied || statisticsState.endDate !== null || statisticsState.startDate !== null,
        refetchOnWindowFocus: false,
    });
    const handleClose = (value: string) => {
        dispatch(resetFilterItem(value));
    }
    return (<>
        <div></div>
        {clientStatistics.length > 0 && (
            <SectionWrapper>
                <Flex justifyContent="space-between" alignItems="center" width="fit-content" margin="0px">
                    <UnderSectionButton onClick={() => { dispatch(setFilterIsOpen(!filterIsOpen)) }}>
                        <span style={{ minHeight: "28px", minWidth: "28px" }}>
                            <FilterIcon />
                        </span>
                        <Text>{t("filters")}</Text>
                    </UnderSectionButton>
                    <UnderSectionButton>
                        <span style={{ zIndex: 5000 }} onClick={() => setOpen(!open)}>
                            <CalendarIcon />
                        </span>
                        <div>
                            <div>
                                <Text>{t("datePicker")}</Text>
                            </div>

                            <div>
                                <Text fontSize="12px" color="silver" fontWeight={400}>{(statisticsState.startDate ? moment(statisticsState.startDate).locale("ru").format('ll') + "-" : "") + `${statisticsState.endDate ? moment(statisticsState.endDate).locale("ru").format("ll") : ""}`}</Text>
                            </div>

                        </div>

                        <CustomDatePickerForUndersection style={{ visibility: "hidden", position: "absolute" }} handleDateChange={handleDateChangeClientStatistics} isOpen={open} top={300} left={190} date={date} />

                    </UnderSectionButton>
                    {(statisticsState.startDate || statisticsState.endDate)
                        &&
                        <div onClick={() => { dispatch(resetDates()) }} style={{ cursor: "pointer" }}>
                            <ResetIcon />
                        </div>
                    }


                </Flex>
                {inlineFilterState && <InlineFilters handleClose={handleClose} filterItems={inlineFilterState} />}
                {filterIsOpen && <Filter onApply={() => dispatch(setApplied(true))} filters={filters} />}

                <Grid container spacing={8} >
                    {clientStatistics?.map((item: any) => {
                        return <Grid item lg={3} spacing={0} style={{ paddingLeft: item.title === "ageAvg" ? "5px" : "32px" }} >
                            <SingleStatisticsItem title={item.title} Icon={item.icon} quantity={item.quantity} />
                        </Grid>
                    })}
                </Grid>
            </SectionWrapper>

        )}
    </>
    );
}

export default ClientsSection;
