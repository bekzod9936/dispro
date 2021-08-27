import React, { useEffect, useState } from 'react';
import { Flex } from '../../../styles/BuildingBlocks';
import noPending from "../../../assets/images/nopending.png"
import { COLORS, FONT_SIZE } from '../../../services/Types/enums';
import { CustomButton, Text } from "../../../styles/CustomStyles"
import { useTranslation } from 'react-i18next';
import { CreateNewsIcon, ExpandIcon, ResetIcon } from '../../../assets/icons/NewsIcons/NewsIcons';
import { useQuery } from 'react-query';
import { fetchPendingNews } from '../../../services/queries/NewsPageQueries';
import NoNews from './NoNews';
import { Avatar, Tooltip } from '@material-ui/core';
import "moment/locale/ru"
import moment from 'moment';
import CustomTable from '../../../components/Custom/CustomTable';
import { makeStyles } from '@material-ui/styles';
import { m } from 'framer-motion';
import CustomReusableTable from '../../../components/Custom/CustomReusableTable';
import { RightSideDrawer } from '../../../styles/Elements';
import { XIcon } from '../../../assets/icons/ClientStatisticsIcons/Filters';
import { CloseIcon } from '../../../assets/icons/ClientsPageIcons/ClientIcons';
import NewsCard from './NewsCard';
import InfoComponent from './InfoComponent';
import { DeleteIconWhite } from '../../../assets/icons/SettingsIcons/SettingsPageIcon';
import AssertModalNews from './AssertModalNews';
import partnerApi from '../../../services/interceptors/companyInterceptor';
import Spinner from '../../../components/Helpers/Spinner';
interface IProps {
    setStatus?: any,
    section: string,
    selectedSingleNews: any,
    setSelectedSingleNews: any,
    setIsModalVisible: any,
    isModalVisible: boolean
}
const useStyles = makeStyles({
    tooltip: {
        background: "white",
        fontSize: "18px",
        textAlign: "center",
        width: "320px",
        borderRadius: "14px",
        fontWeight: 300,
        padding: "17px",
        boxSizing: "border-box",
        boxShadow: "2px 2px 2px #cccc",
        color: "black"

    },
    arrow: {
        color: "white",
        "&:before": {
            //   border: "2px solid #ccc"
            boxShadow: "2px 2px 2px #cccc",
        },

    }
})


const InPendingSection: React.FC<IProps> = ({ setIsModalVisible, isModalVisible, setStatus, section, setSelectedSingleNews, selectedSingleNews }) => {
    const { t } = useTranslation();
    const [tableData, setTableData] = useState<any>();
    const classes = useStyles();
    const [selectedNew, setSelectedNews] = useState<number>(0);
    const [news, setNews] = useState<any>(null);
    //  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [process, setProcessModal] = useState<string>("");
    const [modalText, setModalText] = useState<string>("deleteNewsText");
    const [modalTitle, setModalTitle] = useState<string>("deleteNewsTitle");
    const [refetch, setRefetch] = useState(0);

    const headers = [
        t("columnTitle"),
        t("hookText"),
        t("gender"),
        t("publishDate"),
        " "
    ]
    const handleProceedClick = async () => {
        console.log("proceed");
        try {
            await partnerApi.delete("/core/news", {
                data: {
                    ids: [selectedNew]
                }

            })
            setSelectedSingleNews(null);
            setSelectedNews(0);
            setIsModalVisible(false);
            setRefetch(refetch + 1);
        }
        catch (err) {
            console.log(err);

        }
    }
    useEffect(() => {
        if (news) {
            let newsFind = [...news].find((item: any) => item.id === selectedNew);
            if (newsFind) {
                setSelectedSingleNews(newsFind);
            }
        }
    }, [selectedNew, news])
    const response = useQuery(["news", section, refetch], () => fetchPendingNews(section), {
        refetchOnWindowFocus: false,
        retry: 0,
        onSuccess: (data) => {
            if (data.data.data.length === 0) {
                setTableData([]);
            }
            let formated = data?.data?.data.map((item: any) => {
                return {
                    columnTitle: <div style={{ display: "flex", alignItems: "center" }}><Avatar
                        src={item.image}
                        style={{
                            width: "40px",
                            borderRadius: "14px", height: "40px"
                        }} /> <Text marginLeft="10px" fontSize={FONT_SIZE.smallPlus}
                            fontWeight={400}
                        >{`${item.title}`}</Text></div>,
                    hookText: item.description,
                    gender: item.genderType === 0 ? t("male") : t("female"),
                    publishDate: `${moment(item.cretedAt).locale("ru").format("DD MMM YYYY")} - ${moment(item.endLifeTime).locale("ru").format("DD  MMM YYYY")}`,
                    lastColumn: <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row-reverse" }}>
                        {item.pushUp ?
                            <Tooltip title={"Тут будет находится статистика поpush-уведомлениям"}
                                arrow
                                placement="left" color="white" classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
                            >
                                <div
                                    style={{

                                        padding: "5px 12px", borderRadius: "14px",
                                        background: "linear-gradient(65deg, #C7EEFF, #FCA9EA)"
                                    }}
                                > Push-up </div>

                            </Tooltip>
                            : null}
                        <div style={{
                            padding: "5px 12px", borderRadius: "14px",
                            background: "linear-gradient(65deg, #8BDD59, #DCF089)"
                        }}> {item.ageFrom}+</div>


                    </div>,
                    id: item.id
                }
            })
            setNews(data.data.data)
            setTableData(formated);
        }
    });
    if (response.isLoading) {
        return <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
            <Spinner />
        </div>
    }
    return (
        <div style={{ width: "100%", height: "100%" }}>
            {!tableData?.length ? <NoNews setStatus={setStatus} /> : <>

                <CustomReusableTable selectedRow={selectedNew} handleRowClick={(id: number) => setSelectedNews(id)} rowsFontSize={14} rows={tableData} headers={headers} />

            </>}
            {selectedSingleNews && <RightSideDrawer style={{ padding: "15px 25px", width: "400px", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", height: "calc(100vh - 80px)" }}>
                <div>


                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                        <div>
                            <Text fontSize={FONT_SIZE.large} fontWeight={700}>
                                {t("News")}

                            </Text>

                        </div>
                        <div onClick={() => { setSelectedSingleNews(null); setSelectedNews(0); }}>
                            <CloseIcon />
                        </div>
                    </div>
                    <NewsCard date={moment(selectedSingleNews.createdAt).format("DD.MM.YYYY")} src={selectedSingleNews.image} title={selectedSingleNews.title} text={selectedSingleNews.description} />
                    <InfoComponent
                        ageLimit={selectedSingleNews.ageFrom}
                        gender={selectedSingleNews.genderType === 0 ? "forMales" : "forFemale"}
                        publishDate={`${moment(selectedSingleNews.createdAt).locale("ru").format("DD MMM")} - ${moment(selectedSingleNews.endLifeTime).locale("ru").format("DD  MMM YYYY")}`} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {section !== "archives" ? <>
                        <div>
                            <CustomButton onClick={() => setStatus("view_full")}>
                                <ExpandIcon />
                                <Text color="white" marginLeft="10px">{t("seeFull")}</Text>
                            </CustomButton>

                        </div>
                        <div style={{ marginTop: "15px" }}>
                            <CustomButton onClick={(e) => { e.stopPropagation(); setProcessModal("deleteNews"); setIsModalVisible(true) }} background={COLORS.red}>
                                <DeleteIconWhite />
                                <Text color="white" marginLeft="10px">{t("deleteNews")}</Text>
                            </CustomButton>

                        </div>
                    </> : <div>

                        <CustomButton onClick={() => setStatus("reset_news")}>
                            <ResetIcon />
                            <Text marginLeft="15px" color="white">
                                {t("resetNews")}
                            </Text>
                        </CustomButton>

                    </div>}

                    <AssertModalNews modalText={t(modalText)} modalTitle={t(modalTitle)} isModalVisible={isModalVisible} onCancelClick={() => { setProcessModal(""); setIsModalVisible(false) }}
                        onProceedClick={handleProceedClick}
                    />

                </div>
            </RightSideDrawer>}
        </div>
    );
}

export default InPendingSection;



