import { Checkbox, FormControl, Input, InputAdornment, makeStyles, MenuItem, Select, Switch } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Flex } from '../../../styles/BuildingBlocks';
import { LargePanel, LeftLoyalty, RightLoyalty } from './SettingStyles';
import { CustomButton, ModalComponent, Text } from '../../../styles/CustomStyles';
import { width } from '@material-ui/system';
import CustomInput from '../../../components/Custom/CustomInput';
import { AddIconSettings } from '../../../assets/icons/SettingsIcons/SettingsPageIcon';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { AddIcon, SaveIcon } from '../../../assets/icons/InfoPageIcons/InfoPageIcons';
import partnerApi from '../../../services/interceptors/companyInterceptor';
import { useQuery } from 'react-query';
import { fetchBonusPoints, fetchCashback, fetchDiscount } from '../../../services/queries/PartnerQueries';
import { copyResponse } from 'workbox-core';
import { COLORS, FONT_SIZE, FONT_WEIGHT } from '../../../services/Types/enums';
import { StyledSwitch } from '../../../components/Custom/CustomSwitch';
import { createMuiTheme } from "@material-ui/core"
import { purple } from '@material-ui/core/colors';
import CustomModal from '../../../components/Custom/CustomModal';
import { SyncIcon } from '../../../assets/icons/FeedBackIcons.tsx/FeedbackIcons';
import { CancelIcon } from '../../../assets/icons/ClientsPageIcons/ClientIcons';
interface IFields {
    id: number,
    name: string,
    percent: number | "",
    requirements: {
        amount: any,
        condition: any,
        type: number,
        unit: any,
        id: number,
    }[]

}
const theme = createMuiTheme({
    palette: {
        primary: purple
    }
})
const useStyles = makeStyles({
    select: {
        '& .MuiInput-underline:after': {
            borderBottom: "2px solid " + COLORS.purple, // Semi-transparent underline
        },
        '& .MuiInput-underline': {
            color: COLORS.purple
        }
    }
});

const LoyaltyProgramSection = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const initialFields: any = [
        {
            id: 0,
            name: "",
            percent: 0,
            requirements: [{ type: 1, amount: "", unit: "UZS", condition: "", id: 0 }]
        }
    ]
    const { control, handleSubmit, setValue } = useForm({
        mode: "onChange"
    });

    const rightLoyalty = document.getElementById("rightLoyalty");
    const largePanel = document.getElementById("largePanel");
    const [errorAmount, setErrorAmout] = useState([{ upperLevel: [{ errMessage: "" }] }]);
    const [swithcState, setSwitchState] = useState('');
    const [fieldErrorsRequired, setFieldErrorsRequired] = useState([{ main: false, percent: false }]);
    const [refetchCashback, setRefetchCashback] = useState(0);
    const [refetchDiscount, setRefetchDiscount] = useState(0);
    const [refetchBonusPoints, setRefetchBonusPoints] = useState(0);
    const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
    //const [mainError, setMainError] = useState("");
    const [active, setActive] = useState<"discount" | "cashback" | "bonusPoints" | "">("");
    const [switchChange, setSwitchChange] = useState(0);
    const [assertModalVisible, setAssertModalVisible] = useState<boolean>(false);
    const responseCashback = useQuery(["cashback", refetchCashback], fetchCashback, {
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: (data: any) => {
            if (data?.data?.data?.isActive) {
                setActive("cashback");
                setValue("max_percent", data.data.data.maxAmount);
                setValue("give_cashback_after", data.data.data.cashbackReturnedDay);
                let copy = [...initialFields];
                copy[0].id = 0;
                copy[0].name = data?.data?.data.name;
                copy[0].percent = data?.data?.data.percent;
                copy[0].requirements = [{ type: 1, amount: 0, unit: "UZS", condition: "", id: 0 }];
                copy = [...copy, ...data.data.data.levels];
                setFileds(copy);

            }
        }
    })
    const responseDiscount = useQuery(["Discount", refetchDiscount], fetchDiscount, {
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: (data: any) => {
            if (data?.data?.data?.isActive) {
                setActive("discount");
                setValue("max_percent", data.data.data.maxAmount);
                let copy = [...initialFields];
                copy[0].id = 0;
                copy[0].name = data?.data?.data.name;
                copy[0].percent = data?.data?.data.percent;
                copy[0].requirements = [{ type: 1, amount: 0, unit: "UZS", condition: "", id: 0 }];
                copy = [...copy, ...data.data.data.levels];
                setFileds(copy);
            }
        }
    })
    const responseBonusPoints = useQuery(["Bonus", refetchBonusPoints], fetchBonusPoints, {
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: (data: any) => {
            if (data?.data?.data?.isActive) {
                setActive("bonusPoints");
                setValue("max_percent", data.data.data.maxAmount);
                let copy = [...initialFields];
                copy[0].id = 0;
                copy[0].name = data?.data?.data.name;
                copy[0].percent = data?.data?.data.percent;
                copy[0].requirements = [{ type: 1, amount: 0, unit: "UZS", condition: "", id: 1 }];
                copy = [...copy, ...data.data.data.levels];
                setFileds(copy);
            }
        }
    })

    const onFormSubmit = async (data: any) => {
        console.log(data);
        console.log("I'm here!");

        console.log(fields, "Fields");
        let copy = [...fields];
        copy.splice(0, 1);
        try {
            if (active === "discount") {
                console.log("cashback");

                const res = await partnerApi.put('/bonus/discounts', {
                    cashbackReturnedDay: 0,
                    description: "",
                    isActive: true,
                    levels: copy,
                    maxAmount: data.max_percent,
                    name: fields[0].name,
                    percent: fields[0].percent,
                })
            }
            else if (active === "cashback") {
                console.log("cashback");

                const res = await partnerApi.put('/bonus/cashbacks', {
                    cashbackReturnedDay: data.give_cashback_after || 0,
                    description: "",
                    isActive: true,
                    levels: copy,
                    maxAmount: data.max_percent,
                    name: fields[0].name,
                    percent: fields[0].percent,
                })
            }
            else if (active === "bonusPoints") {
                console.log("bonusPoint");

                const res = await partnerApi.put('/bonus/bonuspoints', {
                    cashbackReturnedDay: 0,
                    description: "",
                    isActive: true,
                    levels: copy,
                    maxAmount: data.max_percent,
                    name: fields[0].name,
                    percent: fields[0].percent,
                })
            }
            //alert("Goood");
        }
        catch (err) {
            alert(err);
        }



    }

    useEffect(() => {
        let copy = [...errorAmount];
        let check = JSON.stringify(copy).includes("requiredF");
        if (check) {
            setDisableSubmit(true);
        }
        else {
            setDisableSubmit(false);
        }


    }, [errorAmount])

    useEffect(() => {
        if (active === "cashback") {
            setRefetchCashback(refetchCashback + 1);
        }
        else if (active === "discount") {
            setRefetchDiscount(refetchDiscount + 1);


        }
        else if (active === "bonusPoints") {
            setRefetchBonusPoints(refetchBonusPoints + 1);

        }
    }, [active])
    const onPercentChange = (e: any, item: any) => {
        console.log(e.target.value);
        let copy = [...fields];
        let errorCopy = [...fieldErrorsRequired]
        if (!e.target.value) {
            copy[item.id].percent = "";
            setFileds(copy);
            errorCopy[item.id].percent = true;
            setFieldErrorsRequired(errorCopy);
        }
        else {
            errorCopy[item.id].percent = false;
            setFieldErrorsRequired(errorCopy);

        }
        if (e.target.value) {
            copy[item.id].percent = Number(e.target.value);
            setFileds(copy);
        }

    }
    const handleAddClick = (item: any, index: number) => {
        let errorCopy = [...fieldErrorsRequired];
        let errorA = [...errorAmount];
        if (item.id === 0) {
            console.log("here I am!");

            let copy = [...fields];
            let newObj = {
                id: copy.length,
                name: "",
                percent: 0,
                requirements: [{ type: 1, amount: 0, unit: "UZS", condition: "", id: 1 }]
            }
            copy.push(newObj);
            errorA.push({ upperLevel: [{ errMessage: "" }] })
            errorCopy.push({ main: false, percent: false });
            setErrorAmout(errorA);
            setFileds(copy)
            setFieldErrorsRequired(errorCopy);
        }
        else if (item.id > 0) {
            console.log("Here I am as well");
            let existing = fields?.find(value => item.id === value.id);
            console.log(existing, "Existing : ", item?.requirements?.id);

            if (existing) {
                let copy = [...fields];
                console.log("Inner check!");

                let newObj = {
                    type: 1,
                    amount: 0,
                    unit: "UZS",
                    condition: "and",
                    id: +item?.requirements[item.requirements.length - 1].id + 1
                }
                existing?.requirements.push(newObj);
                errorA[item.id].upperLevel.push({ errMessage: "" });
                copy.splice(item.id, 1, existing);
                setErrorAmout(errorA);
                setFileds(copy);
            }


        }
    }
    const handleSwitchChange = (checked: boolean, key: any) => {
        if (checked) {
            setActive(key);
            setSwitchChange(switchChange + 1);
        }
        else if (!checked) {
            setSwitchState('');
        }
    }

    const handleSelectChange = (e: any, item: any, value: any) => {
        let copy = [...fields];
        console.log(copy[item.id]?.requirements[value.id]);
        console.log(copy);
        console.log(item.id);
        console.log(value.id);



        if (copy[item.id]?.requirements[value.id - 1]) {
            copy[item.id].requirements[value.id - 1].type = e.target.value;
            setFileds(copy);
        }
    }
    const handleDeleteClick = (item: any, index: number) => {
        let finding = fields[item.id];
        let copy = [...fields];
        let errorCopy = [...fieldErrorsRequired];
        let errorA = [...errorAmount];
        if (item.id === 0) {
            if (copy.length > 1) {
                copy.pop();
                errorCopy.pop();
                errorA.pop();
                setErrorAmout(errorA);
                setFieldErrorsRequired(errorCopy);
                setFileds(copy);
            }

        }
        else if (item.id > 0) {
            let reqs = copy[item.id].requirements;
            if (reqs.length > 1) {

                copy[item.id].requirements.pop();
                errorA[item.id].upperLevel.pop();
                setErrorAmout(errorA);
                setFileds(copy);
            }
        }


    }
    const handleConditionChange = (e: any, item: any, value: any) => {
        // if (isNaN(e.target.value)) {
        //     return;
        // }
        let copy = [...fields];
        console.log("here");
        console.log(fields);
        console.log(item.id);
        console.log(value.id);


        if (copy[item.id]?.requirements[value.id - 1]) {
            console.log(e.target.value);
            console.log("here2");

            copy[item.id].requirements[value.id - 1].condition = e.target.value;
            setFileds(copy);
        }
    }
    const handleChange = (e: any, item: any) => {
        let copy = [...fields];
        let errorCopy = [...fieldErrorsRequired];
        if (!e.target.value) {
            errorCopy[item.id].main = true;
            setFieldErrorsRequired(errorCopy);

        }
        else {
            errorCopy[item.id].main = false;
            setFieldErrorsRequired(errorCopy);

        }
        if (copy[item.id]) {
            copy[item.id].name = e.target.value;
            setFileds(copy);
        }
    }
    const handleAmountChange = (e: any, item: any, value: any, index: number, smallIndex: number) => {
        let copy = [...fields];
        let errCopy = [...errorAmount];
        if (copy[index]?.requirements[smallIndex]) {
            console.log("here");
            if (e.target.value) {
                copy[index].requirements[smallIndex].amount = +e.target.value;
                errCopy[index].upperLevel[smallIndex].errMessage = "";
                setErrorAmout(errCopy)
            }
            else {
                copy[index].requirements[smallIndex].amount = "";
                errCopy[index].upperLevel[smallIndex].errMessage = "requiredF";
                setErrorAmout(errCopy);


            }
            setFileds(copy);
        }

    }
    useEffect(() => {
        if (switchChange > 0) {
            setFileds(initialFields);
            setValue("max_percent", "");
        }
    }, [switchChange])
    const switchItems = [{
        title: "Предоставление скидки",
        text: "Клиент получает скидку при каждой покупке в размере определенного %",
        key: "discount",

    },
    {
        title: "Предоставление кешбэка",
        text: "Клиент получает кешбэк в виде реальных денег после каждой покупки",
        key: "cashback",


    },
    {
        title: "Предоставление баллов",
        text: "Клиент получает баллы после каждой покупки которые может потратить только у вас в компании",
        key: "bonusPoints",

    },
    ]
    const [fields, setFileds] = useState<IFields[]>(initialFields);

    const handleSaveClick = () => {
        setAssertModalVisible(true);
    }
    const handleChangeClick = async () => {

        setAssertModalVisible(false);
        handleSubmit(onFormSubmit)();
    }

    return (

        <Flex justifyContent="start" flexGrow="1" margin="0px">

            <LeftLoyalty >
                <Flex flexDirection="column" justifyContent="start" margin="0px" alignItems="flex-start">
                    {switchItems.map((item) => {
                        return <Flex width="70%" justifyContent="start" margin="0px 0px 35px 0px" alignItems="flex-start">
                            <StyledSwitch checked={item.key === active} onChange={(e: any, checked: any) => handleSwitchChange(checked, item.key)}
                                color="primary" />
                            <Flex flexDirection="column" alignItems="flex-start">
                                <div style={{}}>
                                    <Text fontSize="18px" fontWeight={500}>
                                        {item.title}
                                    </Text>
                                </div>
                                <div style={{ marginTop: "5px", width: "290px" }}>
                                    <Text fontSize="14px" fontWeight={300}>
                                        {item.text}
                                    </Text>
                                </div>

                            </Flex>
                        </Flex>
                    })}
                </Flex>
            </LeftLoyalty>

            <RightLoyalty id="rightLoyalty">
                <LargePanel id="largePanel" style={{ marginTop: fields.length > 2 ? `${fields.length * (fields.length * 25)}px` : `20px` }}>
                    <form>
                        <div >
                            {fields?.map((item, index: number) => {
                                return (
                                    <>
                                        <Controller
                                            name="main"
                                            control={control}
                                            render={({ field }) => {
                                                return <CustomInput
                                                    onChange={(e: any) => handleChange(e, item)}
                                                    value={item.name}
                                                    inputError={fieldErrorsRequired[item.id].main}
                                                    percentError={fieldErrorsRequired[item.id].percent}
                                                    valuePercent={item.percent}
                                                    handleAddClick={() => handleAddClick(item, index)}
                                                    onPercentChange={(e: any) => onPercentChange(e, item)}
                                                    handleDeleteClick={() => handleDeleteClick(item, index)}
                                                    style={{ width: '95%' }}
                                                    withPercent label="status_name"
                                                    aboveInput={item.id === 0 ? "client_statuses" : undefined}
                                                    aboveLabel={item.id === 0 ? "create_status" : undefined}

                                                />
                                            }}

                                        />
                                        {item.requirements.map((value, smallIndex) => {
                                            return (<div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "baseline" }}>

                                                <Select
                                                    //  color={COLORS.purple}
                                                    className={classes.select}

                                                    style={{ marginLeft: "15px", borderColor: COLORS.purple }}
                                                    value={fields[index]?.requirements[smallIndex]?.condition}
                                                    onChange={(e) => handleConditionChange(e, item, value)}>
                                                    <MenuItem value="and">{t("and")}</MenuItem>
                                                    <MenuItem value="or">{t("or")}</MenuItem>
                                                    <MenuItem value="">{t("")}</MenuItem>
                                                </Select>
                                                <Select
                                                    style={{ marginLeft: "15px", width: "140px", borderColor: COLORS.purple }}
                                                    className={classes.select}
                                                    value={fields[index]?.requirements[smallIndex]?.type}
                                                    onChange={(e) => handleSelectChange(e, item, value)}
                                                >
                                                    <MenuItem value={1}>{t("purchaseSum")}</MenuItem>
                                                    <MenuItem value={2}>{t("companyVisits")}</MenuItem>
                                                    <MenuItem value={3}>{t("recomendations")}</MenuItem>


                                                </Select>
                                                <div>{t("more")}</div>
                                                <div>
                                                    <Input
                                                        type="number"
                                                        error={errorAmount[index].upperLevel[smallIndex].errMessage ? true : false}
                                                        value={fields[index]?.requirements[smallIndex]?.amount}
                                                        className={classes.select}
                                                        onChange={(e) => handleAmountChange(e, item, value, index, smallIndex)}
                                                        style={{ width: "140px", marginLeft: "15px", borderColor: COLORS.purple }} renderSuffix={() => <span></span>} />
                                                    <div><Text fontSize="10pt" marginLeft="20px" fontWeight={300} color="red">{t(errorAmount[index].upperLevel[smallIndex].errMessage)}</Text></div>
                                                </div>


                                            </div>)
                                        })}





                                    </>
                                )
                            })}


                        </div>
                        {/* <div >
                            <Controller
                                name="additional"
                                control={control}
                                render={({ field }) => {
                                    return <CustomInput field={field} style={{ width: '95%' }} withPercent label="status_name"
                                    />
                                }}

                            />
                        </div> */}


                        <div>
                            <Controller
                                name="max_percent"
                                control={control}
                                render={({ field }) => {
                                    return <CustomInput field={field} label="max_percent" style={{ width: "80%" }} />

                                }}
                            />
                            {active === "cashback" && <div>
                                <div>
                                    <Controller
                                        name="give_cashback_after"
                                        control={control}
                                        render={({ field }) => {
                                            return <CustomInput field={field} label="give_cashback_after" style={{ width: "80%" }} />

                                        }}
                                    />
                                </div>
                                <div style={{ marginTop: "20px" }}>

                                    <div>
                                        <Text marginLeft="5px">{t("p2p")}</Text>
                                    </div>
                                    <div>
                                        <Checkbox /> <Text marginLeft="15px" fontSize="16px" fontWeight={400}>{t("useLoyaltyProgram")}</Text>
                                    </div>
                                    <div>
                                        <Checkbox />
                                        <Text marginLeft="15px" fontSize="16px" fontWeight={400}>{t("substractingPoints")}</Text>
                                    </div>

                                </div>


                            </div>}
                        </div>

                    </form>
                    <div style={{ marginTop: "20px" }}>
                        <CustomButton
                            disabled={disableSubmit}
                            type="button" onClick={handleSaveClick}>
                            <SaveIcon />
                            <Text marginLeft="10px" color="white">
                                {t("save")}
                            </Text>
                        </CustomButton>
                    </div>

                </LargePanel>
                <CustomModal open={assertModalVisible}>
                    <ModalComponent>
                        <div style={{ maxWidth: "370px" }}>
                            <Text fontSize={FONT_SIZE.modalTitle} fontWeight={FONT_WEIGHT.modalTitle}>
                                Вы действительно хотите поменять
                                программу лояльности?
                            </Text>

                        </div>
                        <div style={{ maxWidth: "370px" }}>
                            <Text fontSize={FONT_SIZE.modalText} fontWeight={FONT_WEIGHT.modalText}>
                                При изменении программы лояльности статусы
                                ваших клиентов обнулятся, что может привести
                                к негативной реакции.
                            </Text>
                        </div>
                        <div style={{ display: "flex", marginTop: "20px", justifyContent: "flex-end", width: "100%", alignItems: "center" }}>
                            <CustomButton background="white" onClick={() => setAssertModalVisible(false)}>
                                <CancelIcon />
                                <Text>
                                    {t("cancel")}
                                </Text>
                            </CustomButton>

                            <CustomButton type="button">
                                <SyncIcon />
                                <Text color="white" onClick={handleChangeClick}>
                                    {t("change")}
                                </Text>
                            </CustomButton>
                        </div>
                    </ModalComponent>
                </CustomModal>

            </RightLoyalty>

        </Flex>
    );
}

export default LoyaltyProgramSection;

