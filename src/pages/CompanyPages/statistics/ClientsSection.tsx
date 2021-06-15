import { Grid } from '@material-ui/core';
import React from 'react';
import { useQuery } from 'react-query';
import { fetchClientStatistics } from '../../../services/queries/PartnerQueries';
import { IClientStatistics } from '../../../services/Types/api';
import SingleStatisticsItem from './SingleStatisticsItem';
import { AgeIcon, AllClientsIcon, BagIcon, CartIcon, CashbackIcon, ChequeIcon, ClientPoints, CouponIcon, DiscountIcon, FemaleIcon, MaleIcon, PaidIcon, PurchuasesIcon, QuestionIcon, SerteficatesIcon } from "../../../assets/icons/ClientStatisticsIcons/ClientStatisticsIcons"
import { useAppDispatch, useAppSelector } from '../../../services/redux/hooks';
import { setStatistics } from '../../../services/redux/Slices/statistics';
import { useTranslation } from 'react-i18next';
import Filter from '../../../components/Custom/Filter';
const ClientsSection = () => {
    const { t } = useTranslation();
    const clientStatistics = useAppSelector(state => state.statistics.clientStatistics);
    const dispatch = useAppDispatch();
    const Icons: (() => JSX.Element)[] = [
        AgeIcon,
        AllClientsIcon,
        BagIcon,
        CartIcon,
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
    const filters = [
        {
            title: "gender",
            inputType: "radio",
            request: "Chose a gender",
            number: 2,
        },
        {
            title: "registration_date",
            inputType: "radio",
            request: "Chose a gender",
        },
        {
            title: "Purchuase_amount",
            inputType: "radio",
            request: "Chose a gender",
        },
        {
            title: "Purchuase_cost",
            inputType: "radio",
            request: "Chose a gender",
        },
        {
            title: "status",
            inputType: "radio",
            request: "Chose a gender",
        },
        {
            title: "traffic_provider",
            inputType: "radio",
            request: "Chose a gender",
        }
    ]
    const response = useQuery(["clientStatistics"], () => fetchClientStatistics(), {
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


        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    return (
        clientStatistics && (
            <div >
                <Filter filters={filters} />
                <Grid container spacing={8}>
                    {clientStatistics.map((item: any) => {

                        return <Grid item lg={3}>
                            <SingleStatisticsItem title={item.title} Icon={item.icon} quantity={item.quantity} />
                        </Grid>
                    })}
                </Grid>
            </div>
        )

    );
}

export default ClientsSection;
