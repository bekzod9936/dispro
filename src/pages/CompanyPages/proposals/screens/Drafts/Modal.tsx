import { CloseIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import { Certificate, VaucherIcon } from 'assets/icons/proposals/ProposalsIcons'
import Modal from 'components/Custom/Modal'
import { useHistory, Link } from 'react-router-dom'
import styled from 'styled-components'
interface IProps {
    open: boolean,
    setOpen: any
}
export const MModal = ({open, setOpen}: IProps) => {
    const history = useHistory()
    const handleClose = () => {
        setOpen(false)
    }

    const handleCreate = () => {
        history.push("/proposals/create_coupon")
    }

    return (
        <Modal modalStyle={{bgcolor: "#F1F4F6"}} open={open}>
            <Wrapper>
                <CloseButton onClick={handleClose}>
                    <CloseIcon />
                </CloseButton>
                <h3>Выберите спецпредложение</h3>
                <p>Выберите спецпредложение которые хотите создать</p>
                <div>
                    <Link to="/proposals/create_coupon">
                        <Card>
                            <Icon>
                                <VaucherIcon /> 
                            </Icon>
                            <CardContent>
                                <h5>Купон</h5>
                                <span>Идейные соображения высшего порядка, а также реализация намеченных плановых заданий позволяет выполнять важные задания.</span>
                            </CardContent>
                        </Card>
                    </Link>
                    <Card>
                        <Icon>
                            <Certificate /> 
                        </Icon>
                        <CardContent>
                            <h5>Сертификат</h5>
                            <span>Идейные соображения высшего порядка, а также реализация намеченных плановых заданий позволяет выполнять важные задания.</span>
                        </CardContent>
                    </Card>
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
`
const CardContent = styled.div`

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
    &:not(:last-child) {
        margin-bottom: 15px;
    }
`
const Wrapper = styled.div`
    padding: 20px 25px;
    position: relative;
    text-decoration: none !important;
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
`

const CloseButton = styled.div`
    position: absolute;
    right: 25px;
    top: 25px;
    cursor: pointer;
`