import Filter from 'components/Custom/Filter/index'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Radio from 'components/Custom/Radio' 
import Input from 'components/Custom/Input' 
import { Label, WrapCheck, WrapDate, WrapInputs, WrapPlaceHolder, WrapStatus } from '../../style'
import CheckBox from 'components/Custom/CheckBox'
import styled from 'styled-components'
import { device } from 'styles/device'

export const MFilter = ({dispatch, initialFilters, refetch}: any) => {
    const { t } = useTranslation()
    


  const handleChange = (payload: any) => {
    dispatch({type: "setFilters", payload})
  }



    const filterList = [
        {
            title: t("gender"),
            content: (
                <Radio
                    list={[
                        { value: '1', label: `${t('male')}` },
                        { value: '2', label: `${t('female')}` },
                    ]}
                    title={t('chose_gender')}
                    onChange={(v: any) => handleChange({key: "gender", value: v})}
                    value={initialFilters?.gender}
        />
            )
        },
        {
            title: t("registration_date"),
            content: (
                <WrapInputs>
          <Label>{t('chose_date')}</Label>
          <div>
            <Input
              type='date'
              width={{
                maxwidth: 200,
              }}
              IconStart={<WrapDate>{t('from')}</WrapDate>}
              inputStyle={{
                inpadding: '0 10px 0 0',
              }}
              value={initialFilters?.regDate?.regDateFrom}
              onChange={(e: any) => 
                handleChange({
                  key: "regDate",
                  value: {
                    ...initialFilters.regDate,
                    regDateFrom: e.target.value 
                  }})
                // setSFilters((prev: any) => ({
                //   ...prev,
                //   regDate: {
                //     ...prev["regDate"],
                //     "from": e.target.value
                //   }
                // }))
              
              }
            />
            <Input
              type='date'
              width={{
                maxwidth: 200,
              }}
              margin={{ laptop: '0 0 0 15px' }}
              IconStart={<WrapDate>{t('to')}</WrapDate>}
              inputStyle={{
                inpadding: '0 10px 0 0',
              }}
              value={initialFilters?.regDate?.regDateTo}
              onChange={(e: any) => { 
                // setSFilters((prev: any) => ({
                //   ...prev,
                //   regDate: {
                //     ...prev["regDate"],
                //     "to": e.target.value
                //   }
                // }))
                handleChange({
                  key: "regDate",
                  value: {
                    ...initialFilters.regDate,
                    regDateTo: e.target.value 
                  }})
              }}
            />
          </div>
        </WrapInputs>
            )
        },
        {
            title: t("purchuase_amount"),
            content: (
                <>
                <Input
                  label={t('enter_amount')}
                  IconStart={<WrapPlaceHolder>{t('from')}</WrapPlaceHolder>}
                  width={{
                    maxwidth: 200,
                  }}
                  inputStyle={{
                    inpadding: '0 10px',
                  }}
                  type='number'
                  value={initialFilters?.purchaseAmount?.purchaseCountFrom}
                  onChange={(e: any) => {
                    // setSFilters((prev: any) => ({
                    //     ...prev,
                    //     purchaseAmount: {
                    //       ...prev["purchaseAmount"],
                    //       "from": e.target.value + " sum"
                    //     }
                    // }))
                    // setFilters((prev: any) => ({ ...prev, purchaseAmount: {
                    //     ...prev["purchuase_amount"],
                    //     purchaseCountFrom: e.target.value
                    // } }))
                    handleChange({key: "purchaseAmount", value: {
                      ...initialFilters.purchaseAmount,
                      purchaseCountFrom: e.target.value 
                    }})
                  }}
                />
                <Input
                  label={t('enter_amount')}
                  margin={{ laptop: '0 0 0 15px' }}
                  IconStart={<WrapPlaceHolder>{t('to')}</WrapPlaceHolder>}
                  width={{
                    maxwidth: 200,
                  }}
                  inputStyle={{
                    inpadding: '0 10px',
                  }}
                  type='number'
                  value={initialFilters?.purchaseAmount?.purchaseCountTo}
                  onChange={(e: any) => {
                  //   setSFilters((prev: any) => ({
                  //     ...prev,
                  //     purchaseAmount: {
                  //       ...prev["purchaseAmount"],
                  //       "to": e.target.value + " sum"
                  //     }
                  // }))
                  //   setFilters((prev: any) => ({ ...prev, purchaseAmount: {
                  //       ...prev["purchuase_amount"],
                  //       purchaseCountTo: e.target.value
                  //   } }))
                  handleChange({key: "purchaseAmount", value: {
                    ...initialFilters.purchaseAmount,
                    purchaseCountTo: e.target.value 
                  }})
                  }}
                />
              </>
            )
        },
        {
            title: t("purchuase_cost"),
            content: (
                <Input
                    placeholder={t('notless')}
                    onChange={(e: any) => {
                      handleChange({key: "notless", value: e.target.value})
                      // setSFilters((prev: any) => ({...prev, "notless": e.target.value + " sum"}))
                      // setFilters((prev: any) => ({...prev, notless: e.target.value}))
                    }}
                    type='number'
                    label={t('enter_amount')}
                    value={initialFilters?.notless}
        />
            )
        },
        // {
        //     title: t('status'),
        //     content: (
        //       <WrapStatus>
        //         <Label>{t('chose_status')}</Label>
        //         <WrapCheck>
        //           {filters.status.map((v: any) => (
        //             <CheckBox
        //               key={v.label}
        //               label={v.label}
        //               checked={v.status}
        //               onChange={(e: any) => {
        //                 const arr = filters.status.map((i: any) => {
        //                   if (i.name === e.target.name) {
        //                     return { ...i, [e.target.name]: e.target.checked };
        //                   } else {
        //                     return i;
        //                   }
        //                 });
        //                 setFilters((prev: any) => ({...prev, status: arr}));
        //               }}
        //             />
        //           ))}
        //         </WrapCheck>
        //       </WrapStatus>
        //     )
        // },
        {
            title: t('traffic_provider'),
            content: (
                <Radio
                list={[
                    { value: '1', label: 'App' },
                    { value: '2', label: 'Mobile' },
                    { value: '3', label: 'Cashier' },
                ]}
                title={t('chose_trafic_provider')}
                onChange={(v: any) => {
                  handleChange({key: "trafficProvider", value: v, label: v === 1 ? "App" : v === 2 ? "Mobile" : v === "3" ? "Cashier" : ""})
                  // setSFilters((prev: any) => ({
                  //   ...prev,
                  //   "trafficProvider": v === "1" ? "App" : v === "2" ? "Mobile" : v === "3" ? "Cashier" : ""
                  // }))
                  // setFilters((prev: any) => ({...prev, trafficProvider: v}))
                }}
                value={initialFilters?.trafficProvider}
                />
            )
        }
    ]
    
    const handleSubmit = () => {
      dispatch({type: "setVisibleFilters", payload: true})
      refetch()
    }

    const handleReset = () => {
        dispatch({type: "resetFilters", payload: {
          gender: '',
          regDate: {
                  regDateFrom: '',
                  regDateTo: ''
              },
          purchaseAmount: {
                  purchaseCountFrom: '',
                  purchaseCountTo: ''
          },
          notless: '',
          status: [
              { Base: false, label: 'Base', name: 'Base' },
              { Silver: false, label: 'Silver', name: 'Silver' },
              { Gold: false, label: 'Gold', name: 'Gold' },
              { Platinum: false, label: 'Platinum', name: 'Platinum' },
            ],
          trafficProvider: ''
        }})
        dispatch({type: "setVisibleFilters", payload: false})
        refetch()
        
    }

    return (
        <Wrapper> 
            <Filter list={filterList} onSubmit={handleSubmit} onReset={handleReset}/>
        </Wrapper>
    )
}


export const Wrapper = styled.div`
  margin-right: 20px;
  @media (max-width: ${device.planshet}) {
    margin: 20px 0;
  }
`
