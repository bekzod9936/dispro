import React from 'react';
import { useTranslation } from 'react-i18next';

const ClientsPage = () => {
    const { t } = useTranslation();
    return (
        <div>
            Clients
            {t("Introduction")}
        </div>
    );
}

export default ClientsPage;
