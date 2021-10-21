import React from 'react'
import Modal from 'components/Custom/Modal'
import styled from 'styled-components'
import cropbackground from 'assets/images/CropRename.png';
import ReactCrop from 'react-image-crop';
import Button from 'components/Custom/Button'
import { CancelIcon } from 'assets/icons/ClientsPageIcons/ClientIcons';
import { SaveIcon } from 'assets/icons/InfoPageIcons/InfoPageIcons';
import 'react-image-crop/dist/ReactCrop.css';

interface IProps {
    open: boolean,
    src?: any,
    setIsCropVisible?: any,
    setFile?: any,
    handleUpload?: any
}
const CropCustomModal = ({open, src, setIsCropVisible, setFile, handleUpload}: IProps) => {
    const [srcUrl, setSrcUrl] = React.useState<any>(null)
    const [image, setImage] = React.useState<any>(null)
    const [imageUrl, setImageUrl] = React.useState<any>(null)
    const [crop, setCrop] = React.useState<any>({
        unit: '%',
        width: 30,
        aspect: 16 / 9,
      });

    React.useEffect(() => {
        setSrcUrl(URL.createObjectURL(src))
    }, [src])
  
   
    const handleClose = () => {
        setIsCropVisible(false)
        setFile(null)
    }

    const handleSave = async() => {
        if(imageUrl) {
            handleUpload(imageUrl)
            setIsCropVisible(false)

        }
    }

    console.log(imageUrl);
    console.log(src);
    
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
            let base64 = canvas.toDataURL("image/png", "high")
            setImageUrl(base64)
        }
    }

    return (
        <Modal open={open}>
            <Wrapper>
                <div style={{display: "flex", marginBottom: "35px"}}>
                    <Right>
                        <div style={{width: "400px", height: "400px", objectFit: "contain", display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <ReactCrop
                                maxWidth={400}
                                src={srcUrl} 
                                crop={crop} 
                                onChange={(e) => setCrop(e)}
                                onImageLoaded={(e) => setImage(e)}
                                onComplete={() => getCroppedImage()}
                                />
                        </div>
                    </Right>
                    <Left>
                        <Preview>
                            {imageUrl?.length > 6 && <img src={imageUrl} alt="preview"/>}
                            <Colka>
                            </Colka>
                            <Bottom></Bottom>
                        </Preview>
                    </Left>
                </div>
                <div>
                    <Button
                        onClick={handleClose}
                        startIcon={<CancelIcon />}
                        margin={{laptop: "0 25px 0 0"}}
                        buttonStyle={{bgcolor: "#FFFFFF", color: "#223367", weight: "500"}}>
                        
                        Отмена
                    </Button>
                    <Button
                        onClick={handleSave}
                        startIcon={<SaveIcon />}>
                        Сохранить
                    </Button>
                </div>
            </Wrapper>
        </Modal>
    )
}
export default CropCustomModal

const Wrapper = styled.div`
    padding: 35px 45px 30px 45px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    z-index: 100;
`


const Right = styled.div`
    width: 565px;
    border-radius: 14px;
    overflow: hidden;
    height: 375px;
    display: flex;
    justify-content: center;
    align-items: center;
    object-fit: contain;
    background-image: url(${cropbackground});
    margin-right: 50px;

`
const Colka = styled.div`
    width: 150px;
    height: 20px;
    background-color: #f4f0ec;
    border-radius: 0 0 14px 14px;
    position: relative;
    z-index: 20;
`

const Left = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    `

const Preview = styled.div`
    position: relative;
    overflow: hidden;
 
    img {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 280px;
        z-index: 1;
    }
    width: 300px;
    height: 335px;
    border-radius: 45px 45px 0 0;
    border: 10px solid #f4f0ec;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(96, 110, 234, 0.3);
    box-shadow: 0px -1px 5px rgba(96, 110, 234, 0.25);;
    
`


const Bottom = styled.div`
    width: 100%;
    height: 180px;
    border-radius: 14px 14px 0 0;
    background-color: #ffffff;
    z-index: 20;
    position: relative;
`