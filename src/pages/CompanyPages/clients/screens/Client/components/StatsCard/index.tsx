import { Wrapper, Content } from './style'
import { numberWith } from 'services/utils';

interface IProps {
    icon: JSX.Element,
    value: number | undefined | string,
    heading: string
}
export const StatsCard = ({ icon, value, heading }: IProps | any) => {
    return (
        <Wrapper>
            {icon}
            <Content>
                <h4>
                    {heading}
                </h4>
                <p>
                    {Number(value) ? numberWith(value, " ") : value}
                </p>
            </Content>
        </Wrapper>
    )
}
