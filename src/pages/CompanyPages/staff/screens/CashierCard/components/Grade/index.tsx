import { useTranslation } from 'react-i18next';

//styles
import {
	Container,
	Title,
	Wrapper,
	PercentDef,
	PercentWrap,
	PercentNum,
} from './style';

interface Props {
	rate?: number | string;
}

const Grade = ({ rate }: Props) => {
	const { t } = useTranslation();
	console.log(`rate`, rate);
	return (
		<Container>
			<Title>{t('totalgradecashier')}</Title>
			<Wrapper>
				<PercentWrap>
					<PercentNum> {rate ? rate : 0}</PercentNum>
					<PercentDef>/5</PercentDef>
				</PercentWrap>
			</Wrapper>
		</Container>
	);
};

export default Grade;
