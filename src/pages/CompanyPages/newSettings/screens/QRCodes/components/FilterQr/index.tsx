import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Filter from 'components/Custom/Filter/index';
import Radio from 'components/Custom/Radio';

const FilterQr = () => {
  const { t } = useTranslation();
  const [type, setType] = useState(null);
  const types = [
    { value: '1', label: `${t('forpayment')}` },
    { value: '2', label: `${t('formarketing')}` },
  ];

  const onReset = () => {
    setType(null);
  };

  const filterList = [
    {
      title: t('qrtype'),
      value:
        type !== null && type !== undefined
          ? Number(type) === 1
            ? t('forpayment')
            : Number(type) === 2
            ? t('formarketing')
            : undefined
          : undefined,
      content: (
        <Radio
          flexDirection='row'
          list={types}
          title={t('chose_gender')}
          onChange={(v: any) => setType(v)}
          value={type}
        />
      ),
    },
  ];
  return <Filter onReset={onReset} list={filterList} />;
};

export default FilterQr;
