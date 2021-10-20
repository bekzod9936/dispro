import React from 'react'
import ReactCrop from 'react-image-crop'
interface IProps {
    src: string
}
export const CropImg = ({src}: IProps) => {
    const [crop, setCrop] = React.useState({
        aspect: 16 / 9
    })
    return (
        <ReactCrop crop={crop} src={src} onChange={(e: any) => setCrop(e)}/>
    )
}
