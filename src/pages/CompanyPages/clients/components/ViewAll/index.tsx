import { IconButton } from '@material-ui/core'
import { GoBackIcon, MiniCloseIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from 'services/redux/hooks'
import { setClient } from 'services/redux/Slices/clients'
import { Wrapper } from "./style"
interface IProps {
    totalCount: number,
    onClose: () => void
}
export const ViewAll: React.FC<IProps> = ({ totalCount, onClose }) => {
    const { t } = useTranslation()
    const { selectedClients } = useAppSelector(state => state.clients)
    const dispatch = useAppDispatch()

    const handleRemove = (id: number) => {
        dispatch(setClient(id))
    }

    return (
        <Wrapper>
            <div className="main">
                <div className="header">
                    <div className="left">
                        <IconButton onClick={onClose}>
                            <GoBackIcon />
                        </IconButton>
                        <h3>{t("checkSelected")}</h3>
                    </div>
                    <h4>{t("selectedClients")}: {totalCount}</h4>
                </div>
                <div className="content">
                    {selectedClients.map(client => (
                        <div className="client" key={client.id}>
                            <span>{client.firstName + " " + client.lastName}</span>
                            <MiniCloseIcon onClick={() => handleRemove(client.id)} />
                        </div>
                    ))}
                </div>
            </div>
        </Wrapper>
    )
}
