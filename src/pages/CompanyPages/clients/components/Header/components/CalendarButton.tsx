import { CalendarIcon } from 'assets/icons/ClientStatisticsIcons/ClientStatisticsIcons'
import Button from 'components/Custom/Button'
import React from 'react'
import { useTranslation } from 'react-i18next'


export const CalendarButton = () => {
    const { t } = useTranslation()
    return (
          <Button
            buttonStyle={{
              shadow: '0px 4px 4px rgba(0, 0, 0, 0.04)',
              bgcolor: 'white',
              color: '#223367',
              weight: 500,
            }}
            startIcon={<CalendarIcon />}
            endIcon={
              <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.00095 0.998659C6.19986 0.998659 6.39063 1.07768 6.53128 1.21833C6.67193 1.35898 6.75095 1.54975 6.75095 1.74866V10.4382L9.96995 7.21766C10.0397 7.14793 10.1225 7.09261 10.2136 7.05487C10.3047 7.01714 10.4023 6.99771 10.5009 6.99771C10.5996 6.99771 10.6972 7.01714 10.7883 7.05487C10.8794 7.09261 10.9622 7.14793 11.0319 7.21766C11.1017 7.28739 11.157 7.37017 11.1947 7.46128C11.2325 7.55239 11.2519 7.65004 11.2519 7.74866C11.2519 7.84728 11.2325 7.94493 11.1947 8.03603C11.157 8.12714 11.1017 8.20993 11.0319 8.27966L6.53195 12.7797C6.46228 12.8495 6.37951 12.9049 6.2884 12.9427C6.19728 12.9805 6.0996 13 6.00095 13C5.9023 13 5.80461 12.9805 5.7135 12.9427C5.62238 12.9049 5.53962 12.8495 5.46995 12.7797L0.969948 8.27966C0.829118 8.13883 0.75 7.94782 0.75 7.74866C0.75 7.5495 0.829118 7.35849 0.969948 7.21766C1.11078 7.07683 1.30178 6.99771 1.50095 6.99771C1.70011 6.99771 1.89112 7.07683 2.03195 7.21766L5.25095 10.4382V1.74866C5.25095 1.54975 5.32997 1.35898 5.47062 1.21833C5.61127 1.07768 5.80203 0.998659 6.00095 0.998659Z" fill="#8F8F8F"/>
              </svg>}
          >
            {/* {t('Pick a date')} */}
            Выберите период
          </Button>
    )
}
