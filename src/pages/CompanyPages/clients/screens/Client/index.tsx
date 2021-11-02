import React from 'react'
import { useHistory } from 'react-router'
import { useAppSelector } from 'services/redux/hooks'

const Client = () => {
    const { selectedClients } = useAppSelector(state => state.clients)
    const client = selectedClients[0]
    const history = useHistory()

    React.useEffect(() => {
        if (!client) history.push("/clients")
    }, [])

    return (
        <div>
            {JSON.stringify(client, null, 2)}
        </div>
    )
}

export default Client
