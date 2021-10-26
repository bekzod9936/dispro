import { CancelIconRed } from 'assets/icons/ClientsPageIcons/ClientIcons'
import React from 'react'
import { Header, ListItem, Wrapper } from './style'
import Checkbox from "components/Custom/CheckBox"
interface IProps {
    list: {
        image?: string,
        name: string,
        value?: string | number
    }[]

}
export const CustomList = ({ list }: IProps) => {

    const [chooseItems, setChooseItems] = React.useState<boolean>(false)

    const handleCancelChoose = () => {
        setChooseItems(false)
    }

    return (
        <Wrapper>
            <Header>
                {chooseItems ?
                    <div>
                        <p>Выберите нескольких</p>
                        <CancelIconRed onClick={handleCancelChoose} />
                    </div> :
                    <button onClick={() => setChooseItems(true)}>
                        Выбрать нескольких
                    </button>}
            </Header>
            {list.map(el =>
                <ListItem>
                    {chooseItems &&
                        <Checkbox />}
                    {el.image ? <img src={el.image} alt="listImage" /> : <div className="fakeImage"></div>}
                    <p>{el.name}</p>
                    {el.value && <span>{el.value}</span>}
                </ListItem>)}
        </Wrapper>
    )
}
