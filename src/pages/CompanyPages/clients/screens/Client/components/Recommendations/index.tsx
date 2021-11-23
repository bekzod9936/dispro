import { PersonsIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import Spinner from 'components/Helpers/Spinner'
import { useTranslation } from 'react-i18next'
import { DownSide, Level, UpSide, Wrapper } from './style'
export interface IProps {
    maxWidth?: string
    referLevels: {
        levelNumber: number,
        count: number
    }[]
}
export const Recommendation = ({ maxWidth, referLevels }: IProps) => {
    const { t } = useTranslation()
    const array = referLevels?.length > 10 ? referLevels?.slice(0, 10) : referLevels
    return (
        <Wrapper maxWidth={maxWidth}>
            <UpSide>
                <PersonsIcon />
                <h5>{t("recommendationLevels")}</h5>
            </UpSide>
            <DownSide>
                {referLevels ? array.map(el => (
                    <Level key={el.levelNumber}>
                        {el.levelNumber}.
                        <span>{el.count}</span>
                    </Level>
                )) : <Spinner />}
            </DownSide>
        </Wrapper>
    )
}
