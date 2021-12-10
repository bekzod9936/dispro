//react
import { useState } from "react"

//packages
import { useTranslation } from "react-i18next";

//components
import { Header } from "./components/Header";
import Popover from "./components/Popover"
import Input from "components/Custom/Input";
import { SectionModal } from "../../components/Modals/Section";
import { EmptyPage } from "./components/EmptyPage";


//style
import { Wrapper, SearchIcon, Container } from "./style"
import { Flex } from "../../style";


interface MainProps {

}

const Main: React.FC<MainProps> = () => {
    const [createSection, setCreateSection] = useState<boolean>(false)

    const { t } = useTranslation()

    const handleOpen = () => {
        setCreateSection(true)
    }

    const handleClose = () => {
        setCreateSection(false)
    }

    return (
        <Wrapper>
            <Header />
            <Flex>
                <Popover onClick={handleOpen} />
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
            <SectionModal isOpen={createSection} onClose={handleClose} />
        </Wrapper>
    )
}

export default Main;