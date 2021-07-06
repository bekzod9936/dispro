import moment from 'moment';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { CalendarIcon } from '../../../assets/icons/ClientStatisticsIcons/ClientStatisticsIcons';
import { ResetIcon } from '../../../assets/icons/ClientStatisticsIcons/Filters';
import CustomDatePickerForUndersection from '../../../components/Custom/CustomDatePickerForUndersection';
import CustomTable from '../../../components/Custom/CustomTable';
import { fetchClientStatistics } from '../../../services/queries/PartnerQueries';
import { useAppDispatch, useAppSelector } from '../../../services/redux/hooks';
import { resetDates, setEndDate, setStartDate } from '../../../services/redux/Slices/clientStatistics';
import { Flex } from '../../../styles/BuildingBlocks';
import { SectionWrapper, UnderSectionButton, Text } from '../../../styles/CustomStyles';

const ProposalsSection = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false);
    const [date, setDate] = useState(moment(Date.now()).format('YYYY-DD-MM'));
    const [headers, setHeaders] = useState<any>([]);
    const [rows, setRows] = useState<any>();
    const section = useAppSelector(state => state.statistics.currentSection)
    const startDate = useAppSelector(state => state.clientStatistics.startDate);
    const endDate = useAppSelector(state => state.clientStatistics.endDate);

    const response = useQuery(["proposals"], () => fetchClientStatistics(section, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, startDate, endDate), {
        retry: 0,
        onSuccess: (data) => {
            let rowsArray: any[] = ["coupons"];
            let finalRows: any = [];
            const headersFormated = ["title", ...Object.keys(data?.data?.data)];
            Object.values(data.data.data).forEach(item => {
                rowsArray.push(item);
            })
            finalRows.push(rowsArray);
            setHeaders(headersFormated);
            setRows(finalRows);
        }
    })

    const handleDateChangeClientStatistics = (date: Date, index: number) => {
        if ((startDate && endDate) || (!startDate && !endDate)) {
            dispatch(setStartDate(date));
            dispatch(setEndDate(null));
            setOpen(false);
        }
        else if (startDate && !endDate) {
            dispatch(setEndDate(date));
            setOpen(false);
        }
    }


    return (<>
        <SectionWrapper>
            <Flex justifyContent="space-between" alignItems="center" width="fit-content" margin="0px">
                <UnderSectionButton>
                    <span style={{ zIndex: 5000 }} onClick={() => setOpen(!open)}>
                        <CalendarIcon />
                    </span>
                    <div>
                        <div>
                            <Text>{t("datePicker")}</Text>
                        </div>

                        <div>
                            <Text fontSize="12px" color="silver" fontWeight={400}>{(startDate ? moment(startDate).locale("ru").format('ll') + "-" : "") + `${endDate ? moment(endDate).locale("ru").format("ll") : ""}`}</Text>
                        </div>

                    </div>

                    <CustomDatePickerForUndersection style={{ visibility: "hidden", position: "absolute" }} handleDateChange={handleDateChangeClientStatistics} isOpen={open} top={300} left={190} date={date} />

                </UnderSectionButton>
                {(startDate || endDate)
                    &&
                    <div onClick={() => { dispatch(resetDates()) }} style={{ cursor: "pointer" }}>
                        <ResetIcon />
                    </div>
                }


            </Flex>
            {(rows?.length > 0 && headers.length > 0) ?
                <CustomTable headers={headers} rows={rows} /> : null
            }


        </SectionWrapper>
    </>
    );
}

export default ProposalsSection;
