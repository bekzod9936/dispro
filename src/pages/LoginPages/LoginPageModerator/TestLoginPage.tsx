import React, { useState } from 'react'
import { LeftSide, RightSide, WholePageWrapper } from '../../../styles/CustomStyles'
import { ImageWrapper, LeftWrapper } from './LoginPageStyles'
import jackMa from "../../../assets/images/JackMa.png"
import { Flex } from '../../../styles/BuildingBlocks'
import { Text } from "../../../styles/CustomStyles"
import { useTranslation } from 'react-i18next'
import { LoginPanel } from './LoginPanel'
import { MenuItem, NativeSelect, Select } from '@material-ui/core'
import { classicNameResolver } from 'typescript'
import { makeStyles } from "@material-ui/core"
import { borderRadius } from '@material-ui/system'
import { RuFlagIcons } from '../../../assets/icons/LoginPage/LoginPageIcons'
const useStyles = makeStyles({
    select: {
        border: "1px solid #223367",
        borderRadius: "46px",
        width: "130px",
        height: "40px",
    },
    paper: {
        width: "fit-content",
        marginTop: "40px"
    },
    input: {
        zIndex: 2303,

    }
})

const TestLoginPage = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [selectState, setSelectState] = useState("russian");
    return (
        <>
            <div style={{ position: "absolute", top: "20px", left: "90%", width: "fit-content", height: "fit-content", zIndex: 200 }}>
                <Select value={selectState} className={classes.select}
                    disableUnderline
                    inputProps={{
                        className: classes.input
                    }
                    }
                    MenuProps={{
                        PaperProps: {
                            className: classes.paper
                        }
                    }}>
                    <MenuItem>Russian</MenuItem>
                </Select>
            </div>
            <WholePageWrapper>

                <LeftSide>
                    <LeftWrapper>
                        <ImageWrapper>
                            <img src={jackMa} alt="" />
                        </ImageWrapper>
                        <Flex margin="70px 0px 40px 0px" alignItems="center" justifyContent="center">
                            <Text fontSize="24px" fontWeight={400} color="white">{t("JackMaWords")}</Text>
                        </Flex>
                        <Flex justifyContent="space-between" width="100%" margin="0px">
                            <div>
                                <Text fontSize="18px" fontWeight={700} color="white">
                                    {t("JackMa")}
                                </Text>
                            </div>
                            <div style={{ maxWidth: "400px", display: "flex", alignItems: "flex-start" }}>
                                <Text fontSize="15px" fontWeight={300} color="white">
                                    {t("JackMaInfo")}
                                </Text>
                            </div>
                        </Flex>

                    </LeftWrapper>

                </LeftSide>
                <RightSide>

                    <LoginPanel />
                </RightSide>
            </WholePageWrapper>
        </>
    )
}

export default TestLoginPage;