import React, { useEffect, useState } from 'react'
import DisIcon from '../../../assets/icons/DisIcon'
import { Flex } from '../../../styles/BuildingBlocks'
import { LoginContent, LoginPanelWrapper } from './LoginPageStyles'
import { CustomButton, Text } from "../../../styles/CustomStyles"
import { useTranslation } from 'react-i18next'
import { Box, Button, Input, InputAdornment, InputLabel, MenuItem, Select } from '@material-ui/core'
import { classes } from 'istanbul-lib-coverage'
import { makeStyles } from '@material-ui/styles'
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios'
import { URL } from "../../../services/constants/config"
import { useQuery } from 'react-query'
import { logIn, signIn } from '../../../services/queries/LoginQueries'
import { useDispatch } from 'react-redux'
import { setLogIn } from '../../../services/redux/Slices/authSlice'
import { useAppDispatch } from '../../../services/redux/hooks'

const useStyles = makeStyles({
    select: {
        border: "1px solid #C2C2C2",
        width: "400px",
        height: "60px",
        outline: "none",
        borderRadius: "14px",
        padding: "0px",
        boxSizing: "border-box",
        fontWeight: 700

    },
    label: {
        margin: "10px"
    },
    input: {
        padding: "0px 15px",
        background: "white",
    },
    paper: {
        marginTop: "60px"
    },
    inputPhone: {
        width: "400px",
        height: "60px",
        boxSizing: "border-box",
        padding: "15px",
        outline: "none",
        border: "1px solid #c2c2c2",
        borderRadius: "14px",
        fontWeight: 700
    },
    button: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "35px",
        height: "60px",
        borderRadius: "14px",
        background: "#606EEA",
        boxShadow: "0px 19px 30px rgba(96, 110, 234, 0.35)",
        '&:hover': {
            background: "#606EEA"
        },


    },
    buttonBack: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "35px",
        height: "60px",
        borderRadius: "14px",
        background: "#FFFFFF",
        color: "#606EEA"
    },
    timer: {
        width: "30px",
        height: "30px",
        borderRadius: "8px",
        background: "rgba(96, 110, 234, 0.5)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
});

export const LoginPanel = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [role, setRole] = useState<any>(null);
    const [phoneNumber, setPhoneNumber] = useState<any>(null);
    const { control, handleSubmit } = useForm();
    const [fetch, setFetch] = useState(false);
    const [proceed, setProceed] = useState(false);
    const [time, setTime] = useState(60);
    const [enableTimer, setEnableTimer] = useState(false);
    const [further, setFurther] = useState(false);
    const [smsCode, setSMSCode] = useState<any>(null);
    const [enableSecond, setEnableSecond] = useState(false);
    const dispatch = useAppDispatch();
    const response = useQuery(["signUp"], () => signIn(role, phoneNumber), {
        retry: 0,
        refetchOnWindowFocus: false,
        enabled: !!fetch,
        refetchOnMount: false,
        onSuccess: (data) => {
            setEnableTimer(true);
            setProceed(true);
            setFetch(false);
            setTime(60);

        }

    });

    const responseTwo = useQuery(["login"], () => logIn(role, phoneNumber, smsCode), {
        retry: 0,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled: !!enableSecond,
        onSuccess: (data) => {
            setEnableTimer(false);
            setTime(60);
            setFurther(true);
            console.log(data.data.data);
            localStorage.setItem("partner_access_token", data.data.data.accessToken);
            localStorage.setItem("partner_refresh_token", data.data.data.refreshToken);
            dispatch(setLogIn(true));

        },
        onError: (err) => {
            console.log(err);

        }
    })

    const onFormSubmit = (data: any) => {
        console.log(data);
        setPhoneNumber(data.phoneNumber);
        setRole(data.role);
        setFetch(true);


    }
    const onFormSubmitSMS = (data: any) => {
        console.log(data);
        if (data.smsCode) {
            setSMSCode(data.smsCode);
            setEnableSecond(true);
        }

    }
    useEffect(() => {
        if (enableTimer) {
            const timer = setTimeout(() => {
                if (time > 0) {
                    setTime(time - 1);
                }

            }, 200)
        }
    }, [time, enableTimer])
    return (
        <LoginPanelWrapper>
            <div style={{ float: "right" }}>
                v1.0.1
            </div>
            <Flex justifyContent="center" alignItems="center" margin="40px 0px 0px 0px">
                <DisIcon />
                <Text fontSize="21px" fontWeight={700} marginLeft="17px"> DIS-COUNT </Text>
            </Flex>
            <LoginContent>
                <div>
                    <Text fontSize="22px" fontWeight={700}>{proceed ? t("enterAssertCode") : t("welcome")}</Text>
                </div>
                {!proceed && <div style={{ marginTop: "10px" }}>
                    <Text fontSize="16px" fontWeight={400}>
                        {t("enterData")}
                    </Text>
                </div>}
                <form onSubmit={!proceed ? handleSubmit(onFormSubmit) : handleSubmit(onFormSubmitSMS)}>

                    {!proceed ? (

                        <>
                            <div style={{ marginTop: "20px" }}>



                                <InputLabel className={classes.label} htmlFor="select">
                                    <Text color="#c2c2c2" fontSize="16px" marginLeft="0px" fontWeight={700}>
                                        {t("staffRole")}
                                    </Text>
                                </InputLabel>
                                <Controller
                                    name="role"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => {
                                        return (
                                            <Select
                                                id="select"
                                                disableUnderline
                                                {...field}
                                                className={classes.select}
                                                inputProps={{
                                                    className: classes.input
                                                }}
                                                MenuProps={{
                                                    PaperProps: {
                                                        className: classes.paper
                                                    }
                                                }}
                                            >
                                                <MenuItem value={2}> Администратор </MenuItem>
                                                <MenuItem value={5}> Администратор </MenuItem>
                                            </Select>
                                        )
                                    }}
                                />

                            </div>
                            <div style={{ marginTop: "20px" }}>
                                <InputLabel className={classes.label} htmlFor="phoneNumber">
                                    <Text color="#c2c2c2" fontSize="16px" marginLeft="0px" fontWeight={700}>
                                        {t("phoneNumber")}
                                    </Text>
                                </InputLabel>
                                <Controller
                                    name="phoneNumber"
                                    control={control}
                                    render={({ field }) => {
                                        return (
                                            <Input
                                                disableUnderline
                                                {...field}
                                                className={classes.inputPhone} />
                                        )
                                    }}
                                />

                            </div>
                        </>
                    )
                        : (

                            <div style={{ marginTop: "20px" }}>
                                <InputLabel className={classes.label} htmlFor="phoneNumber">
                                    <Text color="#c2c2c2" fontSize="16px" marginLeft="0px" fontWeight={700}>
                                        {t("assertCode")}
                                    </Text>
                                </InputLabel>
                                <Controller
                                    name="smsCode"
                                    control={control}
                                    render={({ field }) => {
                                        return (
                                            <Input
                                                disableUnderline
                                                {...field}
                                                className={classes.inputPhone}
                                                endAdornment={<InputAdornment position="end">
                                                    <Box component='div' className={classes.timer}>
                                                        {time}
                                                    </Box>
                                                </InputAdornment>}
                                            />
                                        )
                                    }}
                                />
                                <div style={{ marginTop: "10px" }}>
                                    <Text fontSize="16px" fontWeight={300} color="#C2C2C2">
                                        SMS выслан на номер: {phoneNumber}
                                    </Text>

                                </div>

                            </div>
                        )



                    }
                    <Button type="submit" className={classes.button}>
                        <Text color="white" fontSize="18px" fontWeight={700}>
                            {t("next")}
                        </Text>
                    </Button>
                    {proceed &&
                        <Button onClick={() => { setProceed(false); setTime(60); setEnableTimer(false) }} className={classes.buttonBack}>
                            <Text color="#606EEA" fontSize="18px" fontWeight={700}>
                                {t("back")}
                            </Text>
                        </Button>
                    }
                </form>
            </LoginContent>
        </LoginPanelWrapper>
    )
}
