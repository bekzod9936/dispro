import React, { useState } from 'react'
import DisIcon from '../../../assets/icons/DisIcon'
import { Flex } from '../../../styles/BuildingBlocks'
import { LoginPanelWrapper } from './LoginPageStyles'
import { Text } from '../../../styles/CustomStyles'
import { Button, Checkbox, Input, InputLabel, MenuItem, Select, Step, StepLabel, Stepper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { classes } from 'istanbul-lib-coverage'
import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { stat } from 'fs'
import { useQuery } from 'react-query'
import { createCompany } from '../../../services/queries/PartnerQueries'
import { useAppSelector } from '../../../services/redux/hooks'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
    stepper: {
        width: "70%",

    },
    select: {
        border: "1px solid #C2C2C2",
        width: "100%",
        height: "60px",
        outline: "none",
        borderRadius: "14px",
        padding: "0px",
        boxSizing: "border-box",
        fontWeight: 700
    },
    paper: {
        marginTop: "60px"
    },
    label: {
        margin: "10px"
    },
    input: {
        width: "100%",
        marginTop: "10px",
        border: "1px solid #c2c2c2",
        borderRadius: "14px",
        fontSize: "16px",
        fontWeight: 500,
        boxSizing: "border-box",
        padding: "12px 25px",
    },
    inputTwo: {
        padding: "0px 15px",
        background: "white",
    },
    button: {
        width: "80%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "35px",
        height: "60px",
        borderRadius: "14px",
        background: "#606EEA",

    }

})

const RegistrationPanel = () => {
    const classes = useStyles();
    const history = useHistory();
    const [step, setStep] = useState(0);
    const { t } = useTranslation();
    const { control, handleSubmit, formState: { errors } } = useForm<any>();
    const [companyName, setCompanyName] = useState<string>("");
    const [companyType, setCompanyType] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const company: any = useAppSelector(state => state.auth.partnerLogin);

    const { control: control2, handleSubmit: handleSubmit2 } = useForm();
    const response = useQuery([""], () => createCompany(
        company.companyId,
        companyName,
        companyType,
        1,
        email,
        firstName,
        lastName

    ), {
        retry: 0,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled: step === 2,
        onSuccess: (data) => {
            localStorage.setItem("companyId", data.data.data.accessToken);
            history.push("/infoPage");
        }
    });
    const fieldsStep1 = ["your_name", "your_lastName", "email"];
    const checkboxes = ["readPolice", "applicationOnConditions"];
    const onFormSubmit = (data: any) => {
        console.log(data);
        let status = "OK";

        for (let item of fieldsStep1) {
            if (data.item === undefined) {
                status = "no";
            }
        }
        if (status = "OK") {
            setFirstName(data.your_name);
            setLastName(data.your_lastName);
            setEmail(data.email)
            setStep(1);

        }

    }

    const onFormSubmitSecond = (data: any) => {
        console.log(data);
        setCompanyName(data.companyName);
        setCompanyType(data.companyType);
        setStep(2);
    }
    return (
        <LoginPanelWrapper width="58%">
            <form onSubmit={step === 0 ? handleSubmit(onFormSubmit) : step === 1 ? handleSubmit2(onFormSubmitSecond) : undefined}>
                <Flex width="100%" justifyContent="space-evenly" alignItems="center" flexDirection="column">
                    <div>
                        <DisIcon />
                        <Text fontSize="21px" fontWeight={700} marginLeft="28px"> DIS-admin </Text>
                    </div>
                    <Stepper activeStep={step} className={classes.stepper}>
                        <Step style={{ padding: "0px", paddingRight: "0px" }}>
                            <StepLabel style={{ padding: "0px" }}></StepLabel>
                        </Step>
                        <Step style={{ padding: "0px" }}>
                            <StepLabel style={{ padding: "0px" }}></StepLabel>
                        </Step>
                    </Stepper>

                    <div style={{ marginTop: "15px" }}>
                        <Text fontSize="21px" fontWeight={700}>{t("registration")}</Text>
                    </div>
                    <div style={{ marginTop: "15px" }}>
                        <Text fontSize="16px" fontWeight={400}>{t("fillAllPlease")}</Text>
                    </div>

                    {step === 0 ?
                        <>
                            {fieldsStep1.map((item: string) => {
                                return <div style={{ marginTop: "20px", width: "85%" }}>
                                    <InputLabel htmlFor={item}>
                                        <Text color="#c2c2c2" fontSize="16px" marginLeft="0px" fontWeight={700}>
                                            {t(item)}
                                        </Text>
                                    </InputLabel>
                                    <Controller
                                        name={item}
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => {
                                            return <Input
                                                {...field}
                                                id={item}
                                                disableUnderline
                                                className={classes.input} />
                                        }} />
                                    <span style={{ color: "red", fontSize: "11pt" }}>{errors[item] ? t("requiredField") : ""}</span>
                                </div>
                            })}
                            {checkboxes.map((item: string) => {
                                return <Flex justifyContent="start" alignItems="center" width="85%" margin="20px 0px 0px 0px" >
                                    <Controller
                                        name={item}
                                        control={control}
                                        render={({ field }) => {
                                            return <Checkbox {...field} color="primary" />
                                        }}
                                    />
                                    <Flex margin="0px 0px 0px 20px" alignItems="flex-start" width="80%" >
                                        <Text fontSize="16px" fontWeight={400}>{t(item)}</Text>
                                    </Flex>

                                </Flex>
                            })}
                        </>
                        :
                        (<>
                            <div style={{ marginTop: "20px", width: "85%" }}>
                                <InputLabel htmlFor="companyName">
                                    <Text color="#c2c2c2" fontSize="16px" marginLeft="0px" fontWeight={700}>
                                        {t("companyName")}
                                    </Text>
                                </InputLabel>
                                <Controller
                                    name="companyName"
                                    control={control2}
                                    render={({ field }) => {
                                        return <Input
                                            {...field}
                                            id="comanyName"
                                            disableUnderline
                                            className={classes.input}
                                        />
                                    }}
                                />
                            </div>
                            <div style={{ marginTop: "20px", width: "85%" }}>



                                <InputLabel className={classes.label} htmlFor="selectRole">
                                    <Text color="#c2c2c2" fontSize="16px" marginLeft="0px" fontWeight={700}>
                                        {t("staffRole")}
                                    </Text>
                                </InputLabel>
                                <Controller
                                    name="companyType"
                                    control={control2}
                                    rules={{ required: true }}
                                    render={({ field }) => {
                                        return (
                                            <Select
                                                id="selectRole"
                                                disableUnderline
                                                defaultValue={1}
                                                {...field}
                                                className={classes.select}
                                                inputProps={{
                                                    className: classes.inputTwo
                                                }}
                                                MenuProps={{
                                                    PaperProps: {
                                                        className: classes.paper
                                                    }
                                                }}
                                            >
                                                <MenuItem value={1}> Другие </MenuItem>
                                                <MenuItem value={2}> Администратор </MenuItem>
                                            </Select>
                                        )
                                    }}
                                />

                            </div>
                            <div style={{ width: "85%", margin: "20px 0px" }}>
                                <InputLabel htmlFor='country'>
                                    <Text color="#c2c2c2" fontSize="16px" marginLeft="0px" fontWeight={700}>
                                        {t("arrivalCountry")}
                                    </Text>
                                </InputLabel>
                                <div id="country" style={{ width: "90%", padding: "20px 20px", marginTop: "10px", borderRadius: "14px", background: "lightgrey" }}>
                                    <Text fontSize="16px" fontWeight={500} color="black">{t("Uzbekistan")}</Text>
                                </div>

                            </div>


                        </>)
                    }

                    <Button type="submit" className={classes.button}>
                        <Text color="white" fontSize="18px" fontWeight={700}>
                            {t("next")}
                        </Text>
                    </Button>
                </Flex>
            </form>
        </LoginPanelWrapper>
    )
}
export default RegistrationPanel;