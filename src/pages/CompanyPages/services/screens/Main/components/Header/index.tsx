//react
import { useState } from 'react';

//packages
import { useTranslation } from 'react-i18next'

//components
import Popover from "../../components/Popover"
import Input from "components/Custom/Input";
import { Flex } from 'pages/CompanyPages/services/style'
import Title from 'components/Custom/Title'

//style
import { Nav, SearchIcon, Wrapper } from './style'
import { SectionModal } from 'pages/CompanyPages/services/components/Modals/Section';

interface HeaderProps {

}

export const Header: React.FC<HeaderProps> = () => {
    const { t } = useTranslation()
    const [createSection, setCreateSection] = useState<boolean>(false)


    const handleToggle = (bool: boolean) => {
        return () => {
            setCreateSection(bool)
        }
    }

    return (
        <Wrapper>
            <Nav>
                <Title>
                    {t("services")}
                </Title>
                <p>
                    <b>•</b>
                    {t("youDontHaveProducts")}
                </p>
            </Nav>
            <Flex>
                <Popover onClick={handleToggle(true)} />
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
            <SectionModal isOpen={createSection} onClose={handleToggle(false)} />
        </Wrapper>
    )
}
