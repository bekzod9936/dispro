import { CloseIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import { Certificate, VaucherIcon } from 'assets/icons/proposals/ProposalsIcons'
import Modal from 'components/Custom/Modal'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import useWindowWidth from 'services/hooks/useWindowWidth'
import styled from 'styled-components'
import { device } from 'styles/device'
interface IProps {
    open: boolean,
    setOpen: any
}
export const MModal = ({ open, setOpen }: IProps) => {
    const { width } = useWindowWidth()
    const { t } = useTranslation()
    const handleClose = () => {
        setOpen(false)
    }


    return (
        <Modal modalStyle={{ bgcolor: "#F1F4F6" }} open={open}>
            <Wrapper>
                <CloseButton onClick={handleClose}>
                    <CloseIcon />
                </CloseButton>
                <h3>Выберите спецпредложение</h3>
                <p>Выберите спецпредложение которое хотите создать</p>
                <div>
                    <Link to="/proposals/create_coupon">
                        <Card>
                            <Icon>
                                <VaucherIcon />
                            </Icon>
                            <CardContent>
                                <div className="iconContainer">
                                    {width <= 600 && <VaucherIcon style={{ height: 25, width: 30 }} />}
                                    <h5>{t("coupon")}</h5>
                                </div>
                                <span>Платное, разовое спецпредложение для клиента. Сумма чека клиента уменьшается на процент купона</span>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link to="/proposals/create_certificate">
                        <Card>
                            <Icon>
                                <Certificate />
                            </Icon>
                            <CardContent>
                                <div className="iconContainer">
                                    {width <= 600 && <Certificate style={{ height: 20, width: 20 }} />}
                                    <h5>{t("certificate")}</h5>
                                </div>
                                <span>Платное, разовое спецпредложение для клиента. Сумма чека клиента уменьшается на номинал сертификата</span>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </Wrapper>
        </Modal>
    )
}

const Icon = styled.div`
    padding: 14px;
    background: #F1F4F6;
    box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.04);
    border-radius: 14px;
    margin-right: 25px;
    @media (max-width: ${device.mobile}) {
        display: none;
    }
`
const CardContent = styled.div`
    .iconContainer {
        @media(max-width: ${device.mobile}) {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            h5 {
                margin-left: 10px;
                margin-bottom: 0;
            }
            svg {

            }
        }   
    }
    h5 {
        color: #223367;
        font-size: 16px;
        margin-bottom: 5px;
        line-height: 18px;
    }
    span {
        font-size: 14px;
        font-weight: 300;
        color: #223367;
        text-align: justify;
    }
`

const Card = styled.div`
    cursor: pointer;
    max-width: 465px;
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    border-radius: 14px;
    padding: 19px 25px;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    
`
const Wrapper = styled.div`
    padding: 20px 25px;
    position: relative;
    a {
        text-decoration: none;
    }
    h3 {
        font-size: 22px;
        line-height: 26px;
        margin-bottom: 10px;
        color: #223367;

    }
    p {
        font-size: 14px;
        font-weight: 300;
        color: #223367;
        margin-bottom: 25px;
    }
    @media (max-width: ${device.mobile}) {
        h3 {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 15px;
        }
        p {
            display: none;
        }
    }
`

const CloseButton = styled.div`
    position: absolute;
    right: 25px;
    top: 25px;
    cursor: pointer;
`