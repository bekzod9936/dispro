import { IconButton } from "@material-ui/core"
import Title from "components/Custom/Title"
import { Flex } from "pages/CompanyPages/services/style"
import { useTranslation } from "react-i18next"
import { useHistory } from "react-router-dom"
import { GoBackIcon } from "./style"



export const Header = () => {
    const { t } = useTranslation()
    const history = useHistory()

    const handleGoBack = () => {
        history.goBack()
    }

    return (
        <Flex style={{marginBottom: 25}}>
            <IconButton style={{marginRight: 15}} onClick={handleGoBack}>
                <GoBackIcon />
            </IconButton>
            <Title>
                {t('newItem')}
            </Title>
        </Flex>
    )
}
