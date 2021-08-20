import { Grid } from '@material-ui/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { BagIcon, CalendarIcon, CartIcon, CashbackIcon, ChequeIcon, DiscountIcon, FilterIcon, PaidIcon } from '../../../assets/icons/ClientStatisticsIcons/ClientStatisticsIcons';
import { ResetIcon } from '../../../assets/icons/ClientStatisticsIcons/Filters';
import { TotalAccountIcon } from '../../../assets/icons/OperationStatistics/OperationStatisticsIcons';
import CustomDatePickerForUndersection from '../../../components/Custom/CustomDatePickerForUndersection';
import Filter from '../../../components/Custom/Filter';
import { fetchClientStatistics } from '../../../services/queries/PartnerQueries';
import { useAppDispatch, useAppSelector } from '../../../services/redux/hooks';
import { resetDates, resetFilterItem, setApplied, setEndDate, setFilterIsOpen, setStartDate } from '../../../services/redux/Slices/clientStatistics';
import { setOperationStatistics } from '../../../services/redux/Slices/statistics';
import { Flex } from '../../../styles/BuildingBlocks';
import { SectionWrapper, UnderSectionButton, Text } from '../../../styles/CustomStyles';
import InlineFilters from './InlineFilters';
import SingleStatisticsItem from './SingleStatisticsItem';

interface IProps {
    filters: Object[]
}


const OperationsSection: React.FC<IProps> = ({ filters }) => {
    const { t } = useTranslation()
    const [open, setOpen] = useState(false);
    const statisticsState = useAppSelector(state => state.clientStatistics);
    const dispatch = useAppDispatch();
    const section = useAppSelector(state => state.statistics.currentSection);
    const operationStatistics: any = useAppSelector(state => state.statistics.operationStatistics)
    const [inlineFilterState, setInlineFilterState] = useState<any>();
    const [date, setDate] = useState(moment(Date.now()).format("YYYY/MM/DD"));
    const Icons: (() => JSX.Element)[] = [
        TotalAccountIcon,
        DiscountIcon,
        CashbackIcon,
        PaidIcon,
        BagIcon,
        ChequeIcon,
        CartIcon
    ]
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

    useEffect(() => {
        setInlineFilterState(statisticsState);
    }, [statisticsState]);
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
                dispatch(setOperationStatistics(readyData));

            }
            dispatch(setApplied(false));


        },
        enabled: !!statisticsState.applied || statisticsState.endDate !== null || statisticsState.startDate !== null,
        refetchOnWindowFocus: false,
    });

    const handleClose = (value: string) => {
        dispatch(resetFilterItem(value));
    }

    return (
        <>

            {operationStatistics.length > 0 && (
                <SectionWrapper>
                    <Flex justifyContent="space-between" alignItems="center" width="fit-content" margin="0px">
                        <UnderSectionButton onClick={() => { dispatch(setFilterIsOpen(!statisticsState.filterIsOpen)) }}>
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
                    {statisticsState.filterIsOpen && <Filter onApply={() => dispatch(setApplied(true))} filters={filters} />}

                    <Grid container spacing={9} lg={9} >
                        {operationStatistics?.map((item: any) => {

                            return <Grid item lg={4} spacing={0}>
                                <SingleStatisticsItem title={item.title} Icon={item.icon} quantity={item.quantity} />
                            </Grid>
                        })}
                    </Grid>
                </SectionWrapper>

            )}
        </>
    );
}

export default OperationsSection;
