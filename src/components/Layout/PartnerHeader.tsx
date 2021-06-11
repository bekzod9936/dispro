import React from 'react';
import { CustomSearchInput, Header } from '../../styles/CustomStyles';
import DepositIcon from '../../assets/icons/DepositIcon';
import ShieldIcon from '../../assets/icons/ShieldIcon';
import SectionItem, { ISectionItem } from './Section';
import LanguageSelectComponent from './LanguageSelectComponent';
import BellIcon from '../../assets/icons/BellIcon';
import CompanySelect from './CompanySelect';
import { Grid } from '@material-ui/core';
const PartnerHeader = () => {

    const SectionItems: ISectionItem[] = [
        {
            Icon: DepositIcon,
            title: "Депозит:",
            extra: `3750000UZS`,
        },
        {
            Icon: ShieldIcon,
            title: "Лимит:",
            extra: `100000UZS`,
        },
    ]

    return (
        <Header>
            <Grid container alignItems='center'>
                <Grid item lg={3}>
                    <CustomSearchInput style={{ background: "#F4F4F4" }} type="text" placeholder="Поиск" />
                </Grid>
                <Grid container lg={3}>
                    {SectionItems.map((item: ISectionItem) => {
                        return <Grid item lg={6}> <SectionItem {...item} /> </Grid>
                    })}
                </Grid>
                <Grid container lg={2}>
                    <Grid item lg={2}>

                    </Grid>
                    <Grid item lg={10}>
                        <BellIcon />
                    </Grid>
                </Grid>

                <Grid item lg={2}>
                    <LanguageSelectComponent />
                </Grid>
                <Grid item lg={2}>
                    <CompanySelect />
                </Grid>

            </Grid>

        </Header>
    );
}

export default PartnerHeader;
