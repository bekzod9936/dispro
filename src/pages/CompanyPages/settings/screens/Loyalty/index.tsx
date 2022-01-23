import React,{useState} from 'react'
import CheckBox from "components/Custom/CheckBox";
import CustomToggle from "components/Custom/CustomToggleSwitch";
import {Container,ToggleGroup,LeftSide,Toggle,ToggleInfo} from './style';
import { useTranslation } from 'react-i18next';


const LoyaltyProgramSection=()=>{

    const [discounts, setDiscount] = useState<any>(false)
    const [cashback, setCashback] = useState<any>(false)
    const [points, setPoints] = useState<any>(false)
    const { t } = useTranslation();
    const handleSwitchDiscount=(e:any)=>{
        if(cashback || points){
            setDiscount(false)
        }
        else {
            setDiscount(e.target.checked)
        }
    }
    const handleSwitchCashback=(e:any)=>{
        if(discounts || points){
            setCashback(false)
        }    
        else {
            setCashback(e.target.checked)
        }
      }
      const handleSwitchPoints=(e:any)=>{
        if(discounts || cashback){
        setPoints(false)
      }
      else {
        setPoints(e.target.checked)
      }
    }
    
    return (
        <Container>
            <LeftSide>
                <ToggleGroup>
                <Toggle>
           <CustomToggle
                checked={discounts}
                onChange={(e: any) => {
                    handleSwitchDiscount(e);
                }}
              />
              <ToggleInfo>
                <h5>
                {t('Предоставление скидки')}
                </h5>
                <p>
                {t('Клиент получает скидку при каждой покупке в размере определенного %')}  
                </p>
              </ToggleInfo>
              </Toggle>
              <Toggle>
           <CustomToggle
                checked={cashback}
                onChange={(e: any) => {
                    handleSwitchCashback(e);
                }}
              />
              <ToggleInfo>
                <h5>
                {t('Предоставление скидки')}
                </h5>
                <p>
                {t('Клиент получает скидку при каждой покупке в размере определенного %')}  
                </p>
              </ToggleInfo>
              </Toggle>
              <Toggle>
           <CustomToggle
                checked={points}
                onChange={(e: any) => {
                    handleSwitchPoints(e);
                }}
              />
              <ToggleInfo>
                <h5>
                {t('Предоставление скидки')}
                </h5>
                <p>
                {t('Клиент получает скидку при каждой покупке в размере определенного %')}  
                </p>
              </ToggleInfo>
              </Toggle>
              </ToggleGroup>
              </LeftSide>
        </Container>
    )
}

export default LoyaltyProgramSection;