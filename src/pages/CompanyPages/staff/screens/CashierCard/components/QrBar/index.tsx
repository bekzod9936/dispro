import Button from 'components/Custom/Button';
import QRCode from 'qrcode.react';
import { useTranslation } from 'react-i18next';

//components
import { QrDiv, UpSide, DownSide, QrRow, QrText, CodeText } from './style';
import { IconButton } from '@material-ui/core';

//styles
import { Break } from '../../style';

//icons
import { DownloadIcon } from 'assets/icons/SettingsIcons/SettingsPageIcon';
import { ReactComponent as ExitIcon } from 'assets/icons/exit.svg';
interface IProps {
	qrLink: { link: string; code: string };
	closeQr: any;
}

const QrBar = ({ qrLink, closeQr }: IProps) => {
	console.log(`qrLink`, qrLink?.code);
	const { t } = useTranslation();
	const downloadQR = () => {
		const canvas = document.getElementById(
			`referral-qr-code`
		) as HTMLCanvasElement;
		const pngUrl = canvas
			?.toDataURL('image/png')
			.replace('image/png', 'image/octet-stream');
		let downloadLink = document.createElement('a');
		downloadLink.href = pngUrl;
		downloadLink.download = 'qr-code.png';
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	};

	return (
		<QrDiv>
			<UpSide>
				<QrRow>
					<QrText>Код приглашения</QrText>
					<IconButton onClick={closeQr}>
						<ExitIcon />
					</IconButton>
				</QrRow>
				<Break height={70} />

				<QRCode
					id={`referral-qr-code`}
					value={qrLink?.link || ''}
					size={200}
					bgColor='#FFFFFF'
					fgColor='#000000'
					level={'H'}
				/>

				<CodeText>{qrLink?.code}</CodeText>
			</UpSide>

			{/* Down Side  */}
			<DownSide>
				<Break height={10} />
				<Button onClick={() => downloadQR()} startIcon={<DownloadIcon />}>
					{t('downloadPNG')}
				</Button>
			</DownSide>
		</QrDiv>
	);
};

export default QrBar;
