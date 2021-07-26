import { Avatar, Grid } from '@material-ui/core';
import React from 'react'
import { useQuery } from 'react-query';
import { PlusIcon } from '../../../assets/icons/LoginPage/LoginPageIcons';
import { fetchCompanies } from '../../../services/queries/AdminQueries';
import { fetchPartnerCompanies } from '../../../services/queries/PartnerQueries';
import { useAppSelector } from '../../../services/redux/hooks';
import { CompanyItem, DashedCircle } from './LoginPageStyles';
import { Text } from '../../../styles/CustomStyles';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
const CompanyList = () => {
    const login = useAppSelector(state => state.auth.partnerLogin)
    const history = useHistory();
    const { t } = useTranslation();
    const response = useQuery(["companies"], () => fetchPartnerCompanies(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false
    })
    return (
        <Grid container style={{ width: "65%" }}>
            <Grid item lg={6} md={6} sm={6}>
                <CompanyItem>
                    <DashedCircle>
                        <PlusIcon />

                    </DashedCircle>
                    <div style={{ maxWidth: "60%", textAlign: "center" }}>
                        <Text fontSize="24px" fontWeight={500} color="#606EEA" >{t("addCompany")}</Text>
                    </div>
                </CompanyItem>
            </Grid>
            {response?.data?.data?.data.map((item: any) => {
                return (<Grid item lg={6}>
                    <CompanyItem>
                        <Avatar src={item.company.logo} style={{ width: "115px", height: "115px" }} />
                        <div style={{ maxWidth: "60%", textAlign: "center" }}>
                            <Text fontSize="24px" fontWeight={500} color="#223367" >{item.company.name}</Text>
                        </div>
                    </CompanyItem>

                </Grid>)
            })
            }
        </Grid>
    )
}

export default CompanyList;

