import React, { useEffect, useState } from 'react';
import { Flex } from '../../../styles/BuildingBlocks';

import { LeftLoyalty, Levels, ReferalScroll, RightLoyalty, SettingsWrapper, SmallPanel } from './SettingStyles';
import { CustomButton, Text } from '../../../styles/CustomStyles';
import { Switch } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import CustomInput from '../../../components/Custom/CustomInput';
import TwoUsers from './TwoUsers';
import { SaveIcon } from '../../../assets/icons/InfoPageIcons/InfoPageIcons';
import { AddIconSettings, XIcon } from '../../../assets/icons/SettingsIcons/SettingsPageIcon';
import partnerApi from '../../../services/interceptors/companyInterceptor';
import { useQuery } from 'react-query';
import { fetchBonusReferals } from '../../../services/queries/PartnerQueries';
import { ThreeHeadIcon } from '../../../assets/icons/ClientsPageIcons/ClientIcons';
import { COLORS, FONT_SIZE } from '../../../services/Types/enums';
import { CONNREFUSED } from 'dns';
import { StyledSwitch } from '../../../components/Custom/CustomSwitch';


export interface ILeftLoyalitiy { width?: string, flexDirection?: "column" | "row" }
export interface IRightLoyalitiy { width?: string }

interface ILevels {
    name: string,
    number: number,
    percent: number | string
}

//<CustomInput specialCase label={`level`} style={{ width: "120px" }} field={field} />

// <Controller
// name={`level`}
// control={control}
// render={({ field }) => {
//     return <div>
//         <CustomInput specialCase label={`level`} style={{ width: "120px" }} field={field} />
//     </div>

// }}
// />

const ReferalProgrammSection = () => {
    const forMap = new Array(10).fill(250);
    const { t } = useTranslation();
    const { control, handleSubmit, setValue } = useForm();
    const [level, setLevels] = useState<ILevels[] | [] | any>([]);
    const companyId = localStorage.getItem("companyId");
    const [refetch, setRefetch] = useState(0);
    const [newState, setNewState] = useState<string>("old");
    const [checkedState, setCheckedState] = useState<boolean>(false);

    const response = useQuery(["bonusreferals", refetch], () => fetchBonusReferals(), {
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: (data: any) => {

            setLevels(data?.data?.data?.levels)
            data.data.data.levels.forEach((item: any) => {
                console.log(item.name);

                setValue(item.name, item.percent);
            })
            if (data?.data?.data === null) {
                setNewState("new");
            }
            else if (data?.data?.data?.levels.length > 0) {
                setCheckedState(true);
            }

        }
    })




    const handleChange = (e: any, item: any, index: any) => {
        const existing = level?.find((value: any) => value.number === item.number)
        console.log(existing);

        if (existing && e.target.value) {
            let updated = { ...existing, percent: +e.target.value }
            console.log(updated);

            let newState = [...level]
            newState.splice(index, 1, updated);
            console.log(newState);

            setLevels(newState);
        }
    }
    const handleAddClick = (item: any) => {
        let newObj = {
            name: `${+item.name + 1}`,
            number: item.number + 1,
            percent: ""
        }
        setLevels([...level, newObj])
    }
    const handleSave = async () => {
        let block = level.find((value: any) => value.percent === "");
        if (block) {
            return;
        }
        else {
            if (newState === "new") {
                await partnerApi.post('/bonus/bonusreferals', {
                    companyId: companyId,
                    levels: level
                })
            }
            else {
                await partnerApi.put('/bonus/bonusreferals', {
                    companyId: companyId,
                    levels: level
                })
            }
            setRefetch(refetch + 1)
        }
    }
    const handleXClick = () => {
        const copy = [...level];
        copy.pop();
        setLevels(copy);
    }
    const handleSwitch = (checked: boolean) => {
        console.log(checked);

        if (checked && (!level || level?.length === 0)) {
            console.log('here it is ');

            setLevels([{ name: "1", number: 1, percent: 0 }])
        }
        else if (!checked && level?.length > 0) {
            console.log('here as well');
            setLevels([]);
        }
    }
    return (
        <>
            <Flex flexGrow="1" justifyContent="start" alignItems="flex-start" margin="0px">

                <LeftLoyalty
                    width="60%"
                    flexDirection="column"
                >
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "start", marginBottom: "25px" }}>
                        <div>
                            <div>
                                <Text fontWeight={500} fontSize="18px">
                                    Реферальная система
                                </Text>
                            </div>
                            <div style={{ maxWidth: "370px" }}>
                                <Text fontWeight={300} fontSize="14px">
                                    Начисление баллов рекомендателю в размере процента
                                    от суммы счета приглашенных друзей
                                </Text>
                            </div>


                        </div>
                        <div style={{ margin: "10px 0px 10px 20px" }}>
                            <StyledSwitch checked={checkedState} onChange={(e: any, checked: any) => handleSwitch(checked)} />
                        </div>
                    </div>
                    <ReferalScroll>
                        <div>
                            {level?.map((item: any, index: number) => {
                                return (
                                    <div style={{ display: "flex", alignItems: "center" }}>

                                        <SmallPanel>
                                            <form>
                                                <div>
                                                    <Controller name={item.name} control={control}
                                                        render={({ field }) => {
                                                            return <CustomInput
                                                                specialCase
                                                                label={`Уровень${index + 1}`}
                                                                field={field}
                                                                style={{ width: "120px" }}
                                                                onChange={(e: any) => handleChange(e, item, index)} />
                                                        }}

                                                    />

                                                </div>
                                            </form>
                                            <TwoUsers name1="Саша" name2="Егор" name3={(item.number === 2) ? "Петя" : item.number > 2 ? `${item.number - 1} people` : null} />
                                            <div style={{ width: "140px", textAlign: "start" }}>
                                                <Text fontSize="14px" fontWeight={300}>
                                                    1 клиент получает
                                                    {" " + item.percent}% с каждой покупки
                                                    {" " + +(item.number + 1)} Клиентa
                                                </Text>

                                            </div>
                                        </SmallPanel>
                                        {index === level.length - 2 && <span onClick={() => handleXClick()} style={{ marginRight: "10px", marginLeft: "5px", padding: "8px" }}>
                                            <XIcon />
                                        </span>}
                                        {index === level.length - 1 && <span onClick={() => handleAddClick(item)} style={{ marginRight: "10px", marginLeft: "5px", padding: "8px" }}>
                                            <AddIconSettings />
                                        </span>}
                                    </div>
                                )
                            })}
                        </div>
                    </ReferalScroll>
                    <div style={{ position: "fixed", bottom: "20px", width: "100%" }}>
                        <CustomButton onClick={handleSave}>
                            <SaveIcon />
                            <Text marginLeft="15px" color="white">{t("save")}</Text>
                        </CustomButton>

                    </div>
                </LeftLoyalty>
                <RightLoyalty>
                    <Levels>
                        <div style={{ display: "flex", alignItems: "center", margin: "10px 0px" }}>

                            <ThreeHeadIcon />
                            <div>
                                <Text marginLeft="15px" fontSize={FONT_SIZE.mediumPlus}>
                                    Клиентов по уровням
                                </Text>

                            </div>

                        </div>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
                            {forMap.map((item, index) => {
                                return (
                                    <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center", marginTop: "15px" }}>
                                        <div>
                                            <Text fontSize={FONT_SIZE.smallPlus} fontWeight={400}>
                                                {index + 1 + " "} {t("level")}
                                            </Text>
                                        </div>
                                        <div>
                                            <Text color={COLORS.purple} fontSize={FONT_SIZE.smallPlus}>{item}</Text>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>

                    </Levels>
                </RightLoyalty>

            </Flex>
        </>
    );
}

export default ReferalProgrammSection;
