//react
import { useState } from "react"

//packages
import { useTranslation } from "react-i18next";

//components
import Title from "components/Custom/Title";
import Popover from "./components/Popover"
import Input from "components/Custom/Input";


//style
import { Wrapper, Header, SearchIcon, Container } from "./style"
import { Flex } from "../../style";
import { EmptyPage } from "./components/EmptyPage";
import { SectionModal } from "../../components/Modals/Section";


interface MainProps {

}

const Main: React.FC<MainProps> = () => {
    const [createSection, setCreateSection] = useState<boolean>(false)
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
                <Popover onClick={() => setCreateSection(true)} />
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
            <SectionModal isOpen={createSection} onClose={() => setCreateSection(false)} />
        </Wrapper>
    )
}

export default Main;