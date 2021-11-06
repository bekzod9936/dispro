import { CancelIcon, CloseIcon, DoneIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import Button from 'components/Custom/Button'
import InputFormat from 'components/Custom/InputFormat'
import styled from 'styled-components'
interface IProps {
    name: string,
    status: string,
    value: number | string,
    handleClose: () => void
}
export const VipModal = ({ name = "Коплаков Александр", status, value, handleClose }: IProps) => {
    return (
        <Wrapper>
            <div className="header">
                <h3>Настройка индивидуального %</h3>
                <CloseIcon onClick={handleClose} />
            </div>
            <div className="content">
                <p>{name}<b>•</b><span>Статус: {status + " " + value}%</span></p>
            </div>
            <InputFormat
                margin={{ laptop: "0 0 30px 0" }}
                label="Поменяйте индивидуальный %"
                defaultValue={value}
                max="100" />
            <div className="buttons">
                <Button
                    buttonStyle={{ bgcolor: "#ffffff", color: "#223367" }}
                    margin={{ laptop: "0 25px 0 0" }}
                    startIcon={<CancelIcon />}>
                    Отменить
                </Button>
                <Button startIcon={<DoneIcon />}>
                    Готово
                </Button>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 30px 40px 25px 40px;
    width: 520px;
    div.header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 25px;
        h3 {
            font-size: 22px;
            line-height: 25.78px;
            color: #223367;

        }
        svg {
            cursor: pointer;
        }
    }
    div.content {
        margin-bottom: 25px;
        p {
            font-size: 18px;
            font-weight: 500;
            line-height: 21.09px;
            b {
                color: #C4C4C4;
                margin: 0 20px;
            }
            span {
                font-size: 14px;
                line-height: 16.41px;
                color: #C4C4C4;
            }
        }
    }
    div.buttons {
        display: flex;
        width: 100%;
        justify-content: flex-end;
    }
`