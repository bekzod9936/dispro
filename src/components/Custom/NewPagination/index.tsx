import { useTranslation } from 'react-i18next'
import { PButton, Wrapper, Icon, PInput } from './style'
import { useState, useRef, useEffect } from "react"

interface IProps {
    totalCount: number,
    currentPage: number,
    onChange: (int: number) => void
}
export const NewPagination: React.FC<IProps> = ({ totalCount, currentPage, onChange }) => {
    const { t } = useTranslation()
    const [localPage, setLocalPage] = useState<number | string>(currentPage);

    let timeoutId: any = useRef<any | null>(null)

    const handleChange = (e: any) => {
        let value = e.target.value
        if (value)
            if (value !== "" && value < 1 || value > totalCount) return;

        setLocalPage(value)

        if (value) {
            timeoutId = setTimeout(() => {
                onChange(value)
            }, 1000)

        }
    }

    useEffect(() => {
        return () => {
            clearTimeout(timeoutId)
        }
    }, [])

    const nexPage = () => {
        setLocalPage(Number(localPage) + 1)
        onChange(Number(localPage) + 1)
    }

    const prevPage = () => {
        setLocalPage(Number(localPage) - 1)
        onChange(Number(localPage) - 1)
    }

    return (
        <Wrapper>
            <span className="text">{t("page")}</span>
            <PInput
                onFocus={() => {
                    setLocalPage("")
                }}
                onBlur={() => {
                    if (!localPage) {
                        setLocalPage(currentPage)
                    }
                }}
                type="number"
                onChange={handleChange}
                value={localPage} />
            <span className="text">из {totalCount}</span>
            <PButton onClick={prevPage} disabled={currentPage == 1}>
                <Icon />
            </PButton>
            <PButton onClick={nexPage} last disabled={currentPage == totalCount}>
                <Icon rotated />
            </PButton>
        </Wrapper>
    )
}
