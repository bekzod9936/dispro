import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import dayjs from 'dayjs';
import { useHistory, useLocation } from 'react-router';

//helpers
import { IconButton } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { setChosenClientChat } from 'services/redux/Slices/feedback';
import { setCashierId } from 'services/redux/Slices/staffs';
import { usePermissions } from 'services/hooks/usePermissions';

//components
import Button from 'components/Custom/Buttons/Button';
import Modal from 'components/Custom/Modal';

//styles
import {
	Container,
	Header,
	LeftHeader,
	WrapText,
	UserName,
	Status,
	Date,
	Title,
	StarIcon,
	WrapStars,
	Context,
	Casher,
	Content,
	ModelContent,
	ModalWrap,
	CloseIcon,
	ModalContext,
	WrapClose,
	MessageIcon,
	ModalText,
	Wrapper,
	WrapFillial,
	MoneyIcon,
	WrapMoney,
	Avatar,
} from './style';

//icons
import defuserman from 'assets/icons/defuserman.png';
import defuserwoman from 'assets/icons/defuserwoman.png';
import { useGetRatings } from '../../hooks/useCashierCard';
import { CashierRatingResponse } from 'services/queries/staffQuery';
import { numberWithNew } from 'services/utils';

interface Props {
	ratingInfo: CashierRatingResponse;
}

const User = ({ ratingInfo }: Props) => {
	const { t } = useTranslation();
	const history = useHistory();
	const dispatch = useAppDispatch();
	const location = useLocation();
	const isEditable = usePermissions('staff');
	const status = {
		levelName: ratingInfo.obtainProgramLoyalty.levelName,
		percent: ratingInfo.obtainProgramLoyalty.percent,
	};

	const [open, setOpen] = useState<boolean>(false);
	const image =
		ratingInfo.clientImage ||
		(ratingInfo.clientGenderTypeId === 1 ? defuserman : defuserwoman);

	return (
		<>
			<Container onClick={() => setOpen(true)}>
				<Header>
					<LeftHeader>
						<Avatar>
							<LazyLoadImage
								alt='clientImage'
								height={40}
								src={image}
								width={40}
								effect='blur'
								style={{ objectFit: 'cover' }}
							/>
						</Avatar>
						<WrapText>
							<UserName>
								{ratingInfo.clientFirstName} {ratingInfo.clientLastName}
							</UserName>
							<Status>
								{t('status')}: {status.levelName} {status.percent}%
							</Status>
						</WrapText>
					</LeftHeader>
					<Date margin='5px 0 0 20px'>
						{dayjs(ratingInfo.createdAt).format('DD.MM.YYYY HH:MM')}
					</Date>
				</Header>
				<WrapStars>
					{[1, 2, 3, 4, 5].map((v: any) => (
						<StarIcon bgcolor={ratingInfo.rating >= v} />
					))}
				</WrapStars>
				<Context>
					{ratingInfo.review ? (
						<>
							<Title>{t('review')}:</Title>
							<Content>{ratingInfo.review}</Content>{' '}
						</>
					) : null}
				</Context>
			</Container>
			<Modal onClose={(v: boolean) => setOpen(v)} open={open}>
				<ModelContent>
					<ModalWrap>
						<Header>
							<LeftHeader>
								<Avatar>
									<LazyLoadImage
										alt='clientImage'
										height={62}
										src={image}
										width={62}
										effect='blur'
										style={{ objectFit: 'cover' }}
									/>
								</Avatar>
								<WrapText>
									<UserName>
										{ratingInfo.clientFirstName} {ratingInfo.clientLastName}
									</UserName>
									<Status>
										{t('status')}: {status.levelName} {status.percent}%
									</Status>
								</WrapText>
							</LeftHeader>
							<WrapClose>
								<Date margin='10px 10px 0 20px'>
									{dayjs(ratingInfo.createdAt).format('DD.MM.YYYY HH:MM')}
								</Date>
								<IconButton onClick={() => setOpen(false)}>
									<CloseIcon />
								</IconButton>
							</WrapClose>
						</Header>
						<WrapStars>
							{[1, 2, 3, 4, 5].map((v: any) => (
								<StarIcon bgcolor={ratingInfo.rating >= v} />
							))}
						</WrapStars>
						<Context>
							{ratingInfo.review && (
								<>
									<Title>{t('review')}:</Title>
									<ModalContext>{ratingInfo.review}</ModalContext>
								</>
							)}
							<WrapFillial>
								<Wrapper>
									<Title>{t('cashier')}:</Title>
									<ModalText>
										{ratingInfo.firstName} {ratingInfo.lastName}
									</ModalText>
								</Wrapper>
								<Wrapper>
									<Title>{t('filial')}:</Title>
									<ModalText>{ratingInfo.storeName}</ModalText>
								</Wrapper>
							</WrapFillial>

							<WrapMoney>
								<MoneyIcon />
								<Wrapper>
									<ModalText>
										Операция от {dayjs(ratingInfo.payDate).format('DD.MM.YYYY')}
									</ModalText>
									<ModalText>
										{t('totalsum')}:{' '}
										{numberWithNew({
											number: ratingInfo.totalAmount,
											replaceValue: ' ',
										})}{' '}
										сум
									</ModalText>
									<WrapMoney>
										{Boolean(ratingInfo.amountReturned) && (
											<ModalText>
												{t('sale')}:{' '}
												{numberWithNew({
													number: ratingInfo.amountReturned,
													replaceValue: ' ',
												})}{' '}
												сум
											</ModalText>
										)}
										{Boolean(ratingInfo.usedPointAmount) && (
											<ModalText>
												{t('paidwithpoints')}:{' '}
												{numberWithNew({
													number: ratingInfo.usedPointAmount,
													replaceValue: ' ',
												})}
											</ModalText>
										)}
									</WrapMoney>
								</Wrapper>
							</WrapMoney>

							<Button
								disabled={!isEditable}
								margin={{ laptop: '20px 0 0 0' }}
								startIcon={<MessageIcon />}
								onClick={() => {
									dispatch(
										setChosenClientChat({ data: ratingInfo, choose: true })
									);
									history.push('/feedback/posts');
								}}
							>
								{t('writemessage')}
							</Button>
						</Context>
					</ModalWrap>
				</ModelContent>
			</Modal>
		</>
	);
};

export default User;
