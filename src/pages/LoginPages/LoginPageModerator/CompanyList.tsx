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
import adminInterceptor from '../../../services/interceptors/adminInterceptor';
import { URL } from '../../../services/constants/config';
const CompanyList = () => {
    let accessToken = localStorage.getItem("partner_moderator_token");
    const login = useAppSelector(state => state.auth.partnerLogin)
    const history = useHistory();
    const { t } = useTranslation();
    const response = useQuery(["companies"], () => fetchPartnerCompanies(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false
    })
    const handleAddCompany = () => {
        //  adminInterceptor.post()
        history.push('/info');
    }
    const handleCompanyClick = async (company: any) => {
        const response = await adminInterceptor.put("/auth/update-token", {
            companyId: company.id,
            companyType: company.type
        },
            {
                baseURL: URL
            });
        localStorage.setItem('companyId', company.id);
        localStorage.setItem('companyToken', response.data.data.accessToken);
        history.push('/info');
    }
    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "23vh", height: "70vh", overflowY: "scroll", alignSelf: "center" }}>
            <Grid container style={{ width: "65%" }}>
                <Grid item lg={6} md={6} sm={6}>
                    <CompanyItem onClick={handleAddCompany}>
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
                        <CompanyItem onClick={() => handleCompanyClick(item.company)}>
                            <Avatar src={item.company.logo} style={{ width: "115px", height: "115px" }} />
                            <div style={{ maxWidth: "60%", textAlign: "center" }}>
                                <Text fontSize="24px" fontWeight={500} color="#223367" >{item.company.name}</Text>
                            </div>
                        </CompanyItem>

                    </Grid>)
                })
                }
            </Grid>

        </div>

    )
}

export default CompanyList;

