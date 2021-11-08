import React from 'react'
import { BreakLine, Wrapper } from './style'
interface IProps {
    array: any[]
}
const Information = ({ array }: IProps) => {
    return (
        <Wrapper>
            {array.map((el, index) => (
                <div>
                    <span>{el.heading}</span>
                    <p>
                        {el.value}
                    </p>
                    {index !== array.length - 1 && <BreakLine />}
                </div>
            ))}
        </Wrapper>
    )
}

export default Information