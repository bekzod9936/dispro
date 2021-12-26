import React from 'react';
import Modal from 'components/Custom/Modal';
import ReactCrop from 'react-image-crop';
import Button from 'components/Custom/Buttons/Button';
import {
	CancelIcon,
	CloseIcon,
} from 'assets/icons/ClientsPageIcons/ClientIcons';
import { SaveIcon } from 'assets/icons/InfoPageIcons/InfoPageIcons';
import 'react-image-crop/dist/ReactCrop.css';
import { Header, Center, Wrapper, ErrorMessage } from './style';
import { useAppSelector } from 'services/redux/hooks';
import { RootState } from 'services/redux/store';
import { useTranslation } from 'react-i18next';
import useWindowWidth from 'services/hooks/useWindowWidth';
import { MobileUploadPhotoIcon } from 'assets/icons/proposals/ProposalsIcons';
interface IProps {
	open: boolean;
	src?: any;
	setIsCropVisible?: any;
	setFile?: any;
	handleUpload?: any;
	setIsLoading?: (arg: boolean) => void;
	isCoupon?: boolean;
	coupon?: boolean;
	setErrorImg?: (bool: boolean) => void;
}
const StaffCropCustomModal = ({
	open,
	src,
	setIsCropVisible,
	setFile,
	handleUpload,
	setIsLoading,
	setErrorImg,
}: IProps) => {
	const { logo, name } = useAppSelector(
		(state: RootState) => state.partner.companyInfo
	);
	const [srcUrl, setSrcUrl] = React.useState<any>(null);
	const [image, setImage] = React.useState<any>(null);
	const [imageUrl, setImageUrl] = React.useState<any>(null);
	const { t } = useTranslation();
	const { width } = useWindowWidth();
	const [crop, setCrop] = React.useState<any>({
		unit: '%',
		width: 20,
		aspect: 2 / 2,
	});

	React.useEffect(() => {
		setSrcUrl(URL.createObjectURL(src));
	}, [src]);

	const handleClose = () => {
		setIsCropVisible(false);
		setFile(null);
	};

	const handleSave = async () => {
		if (imageUrl) {
			if (setIsLoading) {
				setIsLoading(true);
			}
			setIsCropVisible(false);

			await handleUpload(imageUrl);
			setErrorImg && setErrorImg(false);
			if (setIsLoading) {
				setIsLoading(false);
			}
		}
	};

	const getCroppedImage = () => {
		if (image) {
			const canvas = document.createElement('canvas');
			const scaleX = image.naturalWidth / image.width;
			const scaleY = image.naturalHeight / image.height;
			canvas.width = crop.width;
			canvas.height = crop.height;
			const ctx = canvas.getContext('2d');

			const pixelRatio = window.devicePixelRatio;
			canvas.width = crop.width * pixelRatio;
			canvas.height = crop.height * pixelRatio;
			ctx?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
			if (ctx) {
				ctx.imageSmoothingQuality = 'high';
			}

			ctx?.drawImage(
				image,
				crop.x * scaleX,
				crop.y * scaleY,
				crop.width * scaleX,
				crop.height * scaleY,
				0,
				0,
				crop.width,
				crop.height
			);
			let base64 = canvas.toDataURL('image/png', 'high');
			setImageUrl(base64);
		}
	};

	return (
		<Modal open={open}>
			<Wrapper>
				<div style={{ marginBottom: '35px' }}>
					<Header>
						<h4>Выберите нужную область</h4>
						<CloseIcon onClick={handleClose} />
					</Header>
					<div style={{ display: 'flex' }}>
						<Center>
							<div className='cropBlock'>
								<ReactCrop
									maxWidth={400}
									src={srcUrl}
									crop={crop}
									onChange={(e) => setCrop(e)}
									onImageLoaded={(e) => setImage(e)}
									onComplete={() => getCroppedImage()}
								/>
							</div>
						</Center>
					</div>
				</div>
				{imageUrl?.length < 8 && (
					<ErrorMessage>
						<p>Выберите область картинки</p>
					</ErrorMessage>
				)}
				<div>
					<Button
						onClick={handleClose}
						startIcon={width > 329 && <CancelIcon />}
						margin={{ laptop: '0 25px 0 0', mobile: '0 8px 0 0' }}
						buttonStyle={{
							bgcolor: '#FFFFFF',
							color: '#223367',
							weight: '500',
						}}
					>
						Отмена
					</Button>
					<Button
						disabled={imageUrl?.length < 8}
						onClick={handleSave}
						startIcon={width > 600 ? <SaveIcon /> : <MobileUploadPhotoIcon />}
					>
						Сохранить
					</Button>
				</div>
			</Wrapper>
		</Modal>
	);
};
export default StaffCropCustomModal;
