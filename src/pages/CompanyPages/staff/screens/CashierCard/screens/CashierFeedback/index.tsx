import feedDef from 'assets/images/feedback.png';
import User from '../../components/User';
import Grade from '../../components/Grade';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'services/redux/hooks';
import {
	WrapDefPhoto,
	Img,
	Content,
	WrapDef,
	Wrapper,
	Left,
	Right,
	Rate,
	WrapStars,
	WrapIconStart,
	StarIcon,
	WrapStartT,
	RateText,
} from './style';
interface IRatings {
	rating: number;
	percentage: number;
	amount: number;
}

const CashierFeedback = () => {
	const { t } = useTranslation();

	const staffData = useAppSelector(
		(state) => state.staffs.staffData.ratingAndReviews
	);
	const avgRating = useAppSelector(
		(state) => state.staffs.staffData.rating.avgRating
	);

	const ratings = useAppSelector(
		(state) => state.staffs.staffData.rating.ratings
	);

	const helper = (arr: IRatings[]) => {
		let init = [5, 4, 3, 2, 1];

		let forgottenItems = init.filter((el) => !arr.some((e) => e.rating === el));

		return [
			...arr,
			...forgottenItems.map((e) => ({
				rating: e,
				percentage: 0,
				amount: 0,
			})),
		].sort((a, b) => b.rating - a.rating);
	};
	console.log('ratings', helper(ratings));

	return (
		<Wrapper>
			<Left>
				{staffData?.length === 0 ? (
					<WrapDefPhoto>
						<Img src={feedDef} alt='feedback' />
						{t('feeddef')}
					</WrapDefPhoto>
				) : (
					<Content>
						<WrapDef>
							{staffData?.map((v: any) => (
								<User value={v} />
							))}
						</WrapDef>
					</Content>
				)}
			</Left>
			<Right>
				<div>
					<div>
						<Grade rate={avgRating} />
						<Rate>{t('rate')}</Rate>
						{helper(ratings).map((el) => (
							<WrapStars>
								<WrapIconStart>
									{Array(el.rating)
										.fill(null)
										.map((e) => (
											<StarIcon />
										))}
								</WrapIconStart>
								<WrapStartT>
									<RateText>{el.percentage}%</RateText>
									<RateText>{el.amount}</RateText>
									<RateText>{t('evaluations')}</RateText>
								</WrapStartT>
							</WrapStars>
						))}
					</div>
				</div>
			</Right>
		</Wrapper>
	);
};

export default CashierFeedback;

// {[5, 4, 3, 2, 1].map((v: any, i: number) => {
// 	return (
// 		<WrapStars>
// 			<WrapIconStart>
// 				{Array(v)
// 					.fill(1)
// 					.map(() => (
// 						<StarIcon />
// 					))}
// 			</WrapIconStart>
// 			<WrapStartT>
// 				<RateText>
// 					&middot;
// 					{ratings?.length === i + 1
// 						? `${ratings[i]?.percentage}%`
// 						: '0%'}
// 				</RateText>
// 				<RateText>
// 					{ratings?.length === i + 1
// 						? `${ratings[i]?.amount} `
// 						: '0 '}
// 				</RateText>
// 				<RateText>{t('evaluations')}</RateText>
// 			</WrapStartT>
// 		</WrapStars>
// 	);
// })}
