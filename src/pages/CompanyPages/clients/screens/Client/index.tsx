import React from 'react'
import { useHistory } from 'react-router'
import { useAppSelector } from 'services/redux/hooks'
import { ClientBlock } from './components/ClientBlock'
import { InfoBlock } from './components/InfoBlock'
import { Recommendation } from './components/Recommendations'
import { UpSide, Wrapper } from "./style"
const Client = () => {
    const { selectedClients } = useAppSelector(state => state.clients)
    const client = selectedClients[0]
    const history = useHistory()

    React.useEffect(() => {
        if (!client) history.push("/clients")
    }, [])

    return (
        <Wrapper>
            <UpSide>
                <ClientBlock {...client} />
                <InfoBlock {...client} />
                <Recommendation />
            </UpSide>
        </Wrapper>
    )
}

export default Client
