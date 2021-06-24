import zIndex from '@material-ui/core/styles/zIndex';
import Item from 'antd/lib/list/Item';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TickIcon } from '../../assets/icons/ClientStatisticsIcons/Filters';
import { CustomButton, UnderFilter, Text } from '../../styles/CustomStyles';
import CustomDropDown from './CustomDropDown';
interface IFilter {
    filters: Object[],
    onApply: () => void,
}
const Filter: React.FC<IFilter> = ({ filters, onApply }) => {
    const { t } = useTranslation();
    return (
        <>
            <div style={{ marginBottom: "10px", position: "absolute", zIndex: 90, display: "flex", flexDirection: "column", borderRadius: "12px", flexWrap: "wrap", overflow: 'auto' }}>
                <CustomDropDown handleInputChange={() => { console.log("change") }}
                    request=""
                    numOfInputs={["FILTERS"]}
                    title="Фильтр"
                    inputType="header"
                    index={0}

                    headerButtonText={t("reset")} />
                {filters.map((item: any, index) => {
                    return <CustomDropDown
                        checked={item.checked}
                        dateFrom={item.dateFrom} dateTo={item.dateTo} handleInputChange={item.inputHandler} request={item.request} numOfInputs={item.numOfInputs} title={item.title} index={index + 1} inputType={item.inputType}>

                    </CustomDropDown>
                })}
                <UnderFilter>
                    <CustomButton onClick={onApply}>
                        <TickIcon />
                        <Text fontSize="14px" color="white" marginLeft="10px">{t("apply")}</Text>
                    </CustomButton></UnderFilter>
            </div>

        </>
    );
}

export default Filter;
