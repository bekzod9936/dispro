import { SearchIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import { AddIcon } from 'assets/icons/InfoPageIcons/InfoPageIcons'
import Button from 'components/Custom/Button'
import Input from 'components/Custom/Input'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { device } from 'styles/device'
import { EmptyPage } from './components/EmptyPage'
import { MModal } from './components/Modal'

const Drafts = () => {
    const { t } = useTranslation()
    const [isOpen, setOpen] = React.useState<boolean>(false)

    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <div style={{marginLeft: 35, display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}}>
            <Nav>
                <Button 
                    onClick={handleOpen} 
                    buttonStyle={{bgcolor: "#FFFFFF", color: "#223367", weight: 500, height: {desktop: 60}}} 
                    margin={{desktop: "0 25px 0 0", laptop: "0 25px 0 0", planshet: "0 0 20px 0"}} 
                    startIcon={<AddIcon />}>
                        {t("create")}
                </Button>
                <Input
                    inputStyle={{border: "none", height: {laptop: 45, planshet: 40}}}
                    width={{maxwidth: 500, width: "100%"}}
                    IconStart={<SearchIcon style={{marginLeft: 30}}/>} 
                    />
            </Nav>
            <div>
                <EmptyPage />
            </div>
            <MModal setOpen={setOpen} open={isOpen}/>
        </div>
    )
}


export default Drafts


const Nav = styled.div`
    display: flex;
    margin-bottom: 115px;
    align-self: flex-start;
    width: 100%;
    padding-right: 15px;
    input {
        max-width: 500px;
        width: 100%;
    };
    @media (max-width: ${device.planshet}) {
        flex-direction: column;
    }
`