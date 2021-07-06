import { Grid } from '@material-ui/core';
import moment from 'moment';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { QRIcon } from '../../../assets/icons/ClientsPageIcons/ClientIcons';
import { CalendarIcon, FilterIcon } from '../../../assets/icons/ClientStatisticsIcons/ClientStatisticsIcons';
import CustomDatePickerForUndersection from '../../../components/Custom/CustomDatePickerForUndersection';
import CustomInputLarge from '../../../components/Custom/CustomInputLarge';
import { useAppDispatch, useAppSelector } from '../../../services/redux/hooks';
import { setClientEndDate, setClientStartDate } from '../../../services/redux/Slices/clientSlice';
import { Flex, GridContainer } from '../../../styles/BuildingBlocks';
import { PageWrapper, SectionWrapper, Text, UnderSectionButton } from '../../../styles/CustomStyles';

const ClientsPage = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [filterOpen, setFilterOpen] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const clients = useAppSelector(state => state.clients);
    const [date, setDate] = useState(moment(Date.now()).format("YYYY/MM/DD"));
    // const [section, setSection] = useState();
    //const renderSection = 
    const handleDateChange = () => {
        if ((!clients.startDate && !clients.endDate) || (clients.startDate && clients.endDate)) {
            dispatch(setClientStartDate(date));
            dispatch(setClientEndDate(null));
            setOpen(false);
        }
        else if (clients.startDate && !clients.endDate) {
            dispatch(setClientEndDate(date));
            setOpen(false);
        }
    }
    return (
        <PageWrapper>
            <Text marginLeft="0px" marginRight="0px" fontSize="21px" >
                {t("clients")}
            </Text>
            <Grid container lg={12}>
                <Grid container lg={7}>
                    <CustomInputLarge />
                    <Flex justifyContent="space-between" alignItems="center" width="fit-content" margin="0px">
                        <UnderSectionButton onClick={() => { setFilterOpen(!filterOpen) }}>
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
                                    <Text fontSize="12px" color="silver" fontWeight={400}>{(clients.startDate ? moment(clients.startDate).locale("ru").format('ll') + "-" : "") + `${clients.endDate ? moment(clients.endDate).locale("ru").format("ll") : ""}`}</Text>
                                </div>

                            </div>

                            <CustomDatePickerForUndersection style={{ visibility: "hidden", position: "absolute" }} handleDateChange={handleDateChange} isOpen={open} top={300} left={190} date={date} />

                        </UnderSectionButton>
                        <UnderSectionButton>
                            <QRIcon />
                            <Text>{t("invite")}</Text>
                        </UnderSectionButton>
                    </Flex>
                </Grid>
            </Grid>

        </PageWrapper >
    );
}

export default ClientsPage;
