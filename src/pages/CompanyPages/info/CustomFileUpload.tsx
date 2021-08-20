import React from 'react';
import { useTranslation } from 'react-i18next';
import { CustomLabel } from './InfoPageStyes';
import { Text } from '../../../styles/CustomStyles';
import { UploadLogoIcon } from '../../../assets/icons/InfoPageIcons/InfoPageIcons';

interface IProps {
    onChange: any,
    label: string,
    aboveInput: string,
    aboveLabel: string
}

const CustomFileUpload: React.FC<IProps> = ({ onChange, label, aboveInput, aboveLabel }) => {
    const { t } = useTranslation()
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "start", width: "85%" }}>
            <div style={{ marginTop: '20px' }}><Text fontSize="16px" fontWeight={500}>{t(aboveInput)}</Text></div>
            <div style={{ marginTop: '15px', width: "90%" }}><Text fontSize="14px" fontWeight={400} color="#c4c4c4">{t(aboveLabel)}</Text></div>

            <CustomLabel htmlFor="logo">
                <Text fontSize="18px" fontWeight={500} color="rgba(96, 110, 234, 1)">{t(label)}</Text>
                <UploadLogoIcon />
            </CustomLabel>
            <input type="file" id="logo" onChange={onChange} style={{ opacity: 0, zIndex: -1, position: "absolute" }} />
        </div>
    );
}

export default CustomFileUpload;
