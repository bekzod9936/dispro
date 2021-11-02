import { Wrapper, Content } from './style'
interface IProps {
    icon: JSX.Element,
    value: number | undefined | string,
    heading: string
}
export const StatsCard = ({ icon, value, heading }: IProps) => {
    return (
        <Wrapper>
            {icon}
            <Content>
                <h4>
                    {heading}
                </h4>
                <p>
                    {value || "-"}
                </p>
            </Content>
        </Wrapper>
    )
}
