import Button from 'components/Custom/Buttons/Button';
import Input from 'components/Custom/Input';
import { useTranslation } from 'react-i18next';
import {
  SquarePlusIcon,
  DownIcon,
  SearchIcon,
  DotsIcon,
} from 'newassets/icons/icons';
import { Container, Header } from './style';

const QrCodes = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Header>
        <Button
          startIcon={<SquarePlusIcon />}
          endIcon={<DownIcon style={{ marginLeft: '40px' }} />}
          buttonStyle={{
            bgcolor: 'white',
            color: '#223367',
            weight: 500,
            shadow: '0px 4px 4px rgba(0, 0, 0, 0.04)',
            height: {
              desktop: 60,
              laptop: 50,
            },
          }}
        >
          {t('create')}
        </Button>
        <Input
          IconStart={<SearchIcon />}
          inputStyle={{
            shadow: '0px 4px 4px rgba(0, 0, 0, 0.04)',
            border: 'none',
            outpadding: '0 0 0 20px',
          }}
          type='search'
          placeholder={t('searchbyqrcode')}
          margin={{ laptop: '0 0 0 20px', mobile: '0 20px' }}
          width={{ maxwidth: 500 }}
        />
      </Header>
    </Container>
  );
};
export default QrCodes;
