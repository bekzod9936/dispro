//react
import { useState } from "react"

//packages
import { useTranslation } from "react-i18next";

//custom components
import Title from "components/Custom/Title";
import Button from "components/Custom/Button";
import Input from "components/Custom/Input";
import Popover from "components/Custom/Popover"

//style
import { Wrapper, Header, CreateIcon, ArrowDownIcon, SearchIcon, Container, PopoverList, PopoverItem } from "./style"
import { Flex } from "../../style";
import { EmptyPage } from "./components/EmptyPage";


interface MainProps {

}

const Main: React.FC<MainProps> = () => {

    const { t } = useTranslation()
    return (
        <Wrapper>
            <Header>
                <Title>
                    {t("services")}
                </Title>
                <p>
                    <b>•</b>
                    {t("youDontHaveProducts")}
                </p>
            </Header>
            <Flex>
                <Popover
                    click={
                        <Button
                            startIcon={<CreateIcon />}
                            buttonStyle={{
                                height: {
                                    desktop: 60
                                },
                                fontSize: {
                                    desktop: 18
                                },
                                weight: 500,
                                color: "#223367",
                                bgcolor: "#fff",
                                shadow: "0px 4px 4px rgba(0, 0, 0, 0.04)"
                            }}
                            endIcon={<ArrowDownIcon />}>
                            {t("create")}
                        </Button>
                    }
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                    popoverStyle={{ marginTop: '20px' }}>
                    <PopoverList>
                        <PopoverItem>{t("section")}</PopoverItem>
                        <PopoverItem>{t("item")}</PopoverItem>
                    </PopoverList>
                </Popover>
                <Input
                    margin={{
                        desktop: "0 0 0 24px"
                    }}
                    inputStyle={{
                        border: "none",
                        shadow: "0px 4px 4px rgba(0, 0, 0, 0.04)"
                    }}
                    IconStart={<SearchIcon />}
                    width={{
                        maxwidth: 500
                    }}
                    placeholder={t('search')}
                />
            </Flex>
            <Container>
                <EmptyPage />
            </Container>
        </Wrapper>
    )
}

export default Main;