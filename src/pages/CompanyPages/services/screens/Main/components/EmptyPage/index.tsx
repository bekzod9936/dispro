//packages
import { useTranslation } from 'react-i18next'

//style
import { Wrapper } from "./style"

//other
import emptyBoxImg from 'assets/images/emptyBox.png'
import Button from 'components/Custom/Button'


interface EmptyPageProps {

}

export const EmptyPage: React.FC<EmptyPageProps> = () => {
    const { t } = useTranslation()
    return (
        <Wrapper>
            <img src={emptyBoxImg} alt="emptyBoxImage" />
            <p>{t("youDontHaveProductsYet")}</p>
            <Button>
                {t("add")}
            </Button>
        </Wrapper>
    )
}
