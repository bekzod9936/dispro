import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'services/redux/hooks';
import { Container, Data, FullName, Title, Amount, Wrapper } from './style';
import FullModal from '../FullModal';
const MobileTable = () => {
  const { t } = useTranslation();
  const data = useAppSelector((state) => state.finance.suggestionFinance.data);

  return (
    <Container>
      {data.map((v: any) => {
        return (
          <>
            <Data>
              <FullName>{`${v?.firstName}  ${v?.lastName}`}</FullName>
              <Wrapper>
                <Title>{t('amountofpurchase')}:</Title>
                <Amount> {` ${v?.amount}`}</Amount>
              </Wrapper>
            </Data>
            <FullModal>ssss</FullModal>
          </>
        );
      })}
    </Container>
  );
};

export default MobileTable;
