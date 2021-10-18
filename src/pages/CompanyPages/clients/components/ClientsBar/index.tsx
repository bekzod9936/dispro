import { MButton } from './components/Button'
import Button from 'components/Custom/Button'
import moment from 'moment'
import styled from 'styled-components'
import { CloseIcon, CoinsIcon, CrownIcon, MinusCoinsIcon, ProfileIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import { CancelButton } from '../QrCodeBar/style'
interface IProps {
    selectedClients: any[],
    dispatch: any,
}
export const ClientsBar = ({selectedClients, dispatch}: IProps) => {
    const client = selectedClients[0]
    


    const handleRemoveAll = () => {
        dispatch({type: "removeAll"})
    }
    const handleAddAll = () => {
        dispatch({type: "selectAll", payload: true})
    }

    const handleClose = () => {
        dispatch({type: "removeAll"})
    }

    return (
        <Wrapper>
            <CancelButton onClick={handleClose}>
                <CloseIcon />
            </CancelButton>
            {selectedClients.length === 1 ? 
            <WrapperContent>
                <div>
                    <Content>
                        {client.image ? <img src={client.image} alt="clientAvatar"/> : <DefaultImage />}
                        <ContentInfo>
                            <p>{client.firstName} {client.lastName}</p>
                            <span>Статус: {client.addInfo.status} {client.personalLoyaltyInfo.percent}%</span>
                        </ContentInfo>
                    </Content>
                    <SubContent>
                        <p>Последняя покупка: {client.addInfo.lastPurchaseDate ? moment(client.addInfo.lastPurchaseDate).format("DD.MM.YYYY") : "-"}</p>
                        <Buttons>
                            <MButton>
                                Начислить баллы
                                <CoinsIcon style={{marginLeft: 10}} />
                            </MButton>
                            <MButton>
                                Списать баллы
                                <MinusCoinsIcon style={{marginLeft: 10}} />
                            </MButton>
                            <MButton>
                                VIP %
                                <CrownIcon style={{marginLeft: 10}} />
                            </MButton>
                            
                        </Buttons>
                        <AddInfo>
                            <div>
                                <p>Общая сумма покупок</p>
                                <span>{client.addInfo.amountOperation}</span>
                            </div>
                            <div>
                                <p>Количество посещений</p>
                                <span>{client.addInfo.countOperation}</span>
                            </div>
                        </AddInfo>
                    </SubContent>
                </div>
                <Button startIcon={<ProfileIcon />}>
                    Карточка клиента
                </Button>
            </WrapperContent> : selectedClients.length > 1 ? 
            <div>
                <Text>Выбрано: {selectedClients.length}</Text>
                <Buttons>
                    <MButton>
                        Начислить баллы
                        <CoinsIcon style={{marginLeft: 10}} />
                    </MButton>
                    <MButton>
                        Списать баллы
                        <MinusCoinsIcon style={{marginLeft: 10}} />
                    </MButton>
                    <MButton>
                        Изменить Статус %
                        <CrownIcon style={{marginLeft: 10}} />
                    </MButton>
                </Buttons>
                <SelectButtons>
                    <button onClick={handleAddAll}>
                        Выбрать всех клиентов
                    </button>
                    <button onClick={handleRemoveAll}>
                        Снять выделение
                    </button>
                </SelectButtons>
            </div> : null}
        </Wrapper>
    )
}
export const Text = styled.p`
    font-size: 18px;
    line-height: 21px;
    margin-bottom: 25px;
    color: #223367;
`
export const WrapperContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
`
export const Wrapper = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    padding: 25px;

`
export const SelectButtons = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
        outline: none;
        border: none;
        color:#3492FF;
        font-size: 18px;
        font-family: "Roboto", sans-serif;
        line-height: 21px;
        margin-bottom: 21px;
        background-color: transparent;
        cursor: pointer;
    }
`
export const AddInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 30px;
        p {
            font-weight: 700;
            color:#C7C7C7;
            font-size: 18px;
            margin-bottom: 15px;
        }
        span {
            font-size: 18px;
            color: #223367;
            font-weight: 700;
            line-height: 21px;
        }
    }
`
export const Content = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    img {
        width: 62px;
        height: 62px;
        border-radius: 14px;
        margin-right: 30px;
        
    }
`
export const DefaultImage = styled.div`
    background: linear-gradient(215.2deg, #C7EEFF -12.1%, #FCA9EA 101.51%);
    height: 62px;
    width: 62px;
    border-radius: 14px;
    margin-right: 30px;
    display: block;
`

export const ContentInfo = styled.div`
    p {
        font-size: 18px;
        font-weight: 700;
        color: #223367;
        line-height: 25px;
        margin-bottom: 10px;
    }
    span {
        color: #223367;
        font-size: 16px;
        font-weight: 300;
        line-height: 18px;

    }
`
export const SubContent = styled.div`
    p {
        font-size: 14px;
        color: #223367;
        font-weight: 300;
        line-height: 16px;
        margin-bottom: 20px;

    }
`

const Buttons = styled.div`
    margin-bottom: 50px;
`

