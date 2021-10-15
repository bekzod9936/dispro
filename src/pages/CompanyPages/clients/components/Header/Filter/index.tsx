import Filter from 'components/Custom/Filter/index'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Radio from 'components/Custom/Radio' 
import Input from 'components/Custom/Input' 
import { Label, WrapCheck, WrapDate, WrapInputs, WrapPlaceHolder, WrapStatus } from './style'
import CheckBox from 'components/Custom/CheckBox'
const initialFilters = {
    genderTypeId: '',
    regDate: {
            regDateFrom: '',
            regDateTo: ''
        },
    purchuase_amount: {
            purchaseCountFrom: '',
            purchaseCountTo: ''
    },
    purchase_cost: 0,
    status: [
        { Base: false, label: 'Base', name: 'Base' },
        { Silver: false, label: 'Silver', name: 'Silver' },
        { Gold: false, label: 'Gold', name: 'Gold' },
        { Platinum: false, label: 'Platinum', name: 'Platinum' },
      ],
    traffic_provider: ''
}
export const MFilter = ({dispatch}: any) => {
    const { t } = useTranslation()
    const [filters, setFilters] = React.useState(initialFilters)

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
                    onChange={(v: any) => setFilters(prev => ({
                        ...prev, 
                        genderTypeId: v
                    }))}
                    value={filters.genderTypeId}
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
              value={filters.regDate.regDateFrom}
              onChange={(e: any) =>
                setFilters(prev => ({ ...prev, regDate: {
                    ...prev["regDate"],
                    regDateFrom: e.target.value
                } }))
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
              value={filters.regDate.regDateTo}
              onChange={(e: any) =>
                setFilters(prev => ({ ...prev, regDate: {
                    ...prev["regDate"],
                    regDateTo: e.target.value
                } }))
              }
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
                  value={filters.purchuase_amount.purchaseCountFrom}
                  onChange={(e: any) =>
                    setFilters(prev => ({ ...prev, purchuase_amount: {
                        ...prev["purchuase_amount"],
                        purchaseCountFrom: e.target.value
                    } }))
                  }
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
                  value={filters.purchuase_amount.purchaseCountTo}
                  onChange={(e: any) =>
                    setFilters(prev => ({ ...prev, purchuase_amount: {
                        ...prev["purchuase_amount"],
                        purchaseCountTo: e.target.value
                    } }))
                  }
                />
              </>
            )
        },
        {
            title: t("purchuase_cost"),
            content: (
                <Input
          placeholder={t('notless')}
          onChange={(e: any) => setFilters(prev => ({...prev, purchase_cost: e.target.value}))}
          type='number'
          label={t('enter_amount')}
          value={filters.purchase_cost}
        />
            )
        },
        {
            title: t('status'),
            content: (
              <WrapStatus>
                <Label>{t('chose_status')}</Label>
                <WrapCheck>
                  {filters.status.map((v: any) => (
                    <CheckBox
                      key={v.label}
                      label={v.label}
                      checked={v.status}
                      onChange={(e: any) => {
                        const arr = filters.status.map((i: any) => {
                          if (i.name === e.target.name) {
                            return { ...i, [e.target.name]: e.target.checked };
                          } else {
                            return i;
                          }
                        });
                        setFilters(prev => ({...prev, status: arr}));
                      }}
                    />
                  ))}
                </WrapCheck>
              </WrapStatus>
            )
        },
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
                onChange={(v: any) => setFilters(prev => ({...prev, traffic_provider: v}))}
                value={filters.traffic_provider}
                />
            )
        }
    ]


    const handleFilters = () => {
        dispatch({type: "setFilters", payload: filters})
    }

    const handleReset = () => {
        dispatch({type: "resetFilters"})
        setFilters(initialFilters)
    }

    return (
        <div>
            <Filter list={filterList} onSubmit={handleFilters} onReset={handleReset}/>
        </div>
    )
}
