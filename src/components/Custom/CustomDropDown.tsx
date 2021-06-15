import { Radio } from '@material-ui/core';
import React from 'react';
import { ArrowDown } from '../../assets/icons/ClientStatisticsIcons/Filters';
import { Flex } from '../../styles/BuildingBlocks';
import { DropDownTitle } from '../../styles/CustomStyles';

interface ICustomDropDown {
    title?: string,
    inputType: string,
    index: number
}

const CustomDropDown: React.FC<ICustomDropDown> = ({ title, inputType, index }) => {


    const renderFields = () => {
        switch (inputType) {
            case "radio":
                return <Radio />
        }
    }

    return (
        <>
            <DropDownTitle index={index}>
                <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
                    <span>{title}</span>
                    <div><ArrowDown /></div>
                </Flex>

            </DropDownTitle>

        </>
    );
}

export default CustomDropDown;
