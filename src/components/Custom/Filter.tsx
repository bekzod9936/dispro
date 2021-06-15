import zIndex from '@material-ui/core/styles/zIndex';
import React from 'react';
import CustomDropDown from './CustomDropDown';
interface IFilter {
    filters: Object[],
}
const Filter: React.FC<IFilter> = ({ filters }) => {

    return (
        <>
            <div style={{ position: "absolute", zIndex: 90 }}>
                {filters.map((item: any, index) => {
                    return <CustomDropDown title={item.title} index={index + 1} inputType={item.inputType}></CustomDropDown>
                })}
            </div>

        </>
    );
}

export default Filter;
