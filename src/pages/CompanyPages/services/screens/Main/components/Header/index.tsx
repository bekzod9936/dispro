//packages
import { useTranslation } from 'react-i18next'

//style
import { Wrapper } from './style'
import Title from 'components/Custom/Title'

export const Header = () => {
    const { t } = useTranslation()

    return (
        <Wrapper>
            <Title>
                {t("services")}
            </Title>
            <p>
                <b>•</b>
                {t("youDontHaveProducts")}
            </p>
        </Wrapper>
    )
}
