import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'services/redux/hooks';
import Grade from '../Grade';
import {
  Container,
  Rate,
  WrapStars,
  WrapIconStart,
  StarIcon,
  WrapStartT,
  RateText,
} from './style';

const Stars = () => {
  const { t } = useTranslation();
  const ratings = useAppSelector((state) => state.feedbackPost.ratings);
  const rate = useAppSelector((state) => state.feedbackPost.averageRating);
  const total = useAppSelector((state) => state.feedbackPost.totalRating);

  return (
    <Container>
      <div>
        <Grade title={t('overallscore')} rate={rate} />
        <Grade title={t('totalratings')} total={total} />
        <Rate>{t('rate')}</Rate>
        {[5, 4, 3, 2, 1].map((v: any, i: number) => {
          return (
            <WrapStars>
              <WrapIconStart>
                {Array(v)
                  .fill(1)
                  .map(() => (
                    <StarIcon />
                  ))}
              </WrapIconStart>
              <WrapStartT>
                <RateText>
                  &middot;
                  {ratings?.length ? `${ratings[i]?.percentage}%` : '0%'}
                </RateText>
                <RateText>
                  {ratings?.length ? `${ratings[i]?.amount} ` : '0 '}
                </RateText>
                <RateText>{t('evaluations')}</RateText>
              </WrapStartT>
            </WrapStars>
          );
        })}
      </div>
    </Container>
  );
};

export default Stars;
