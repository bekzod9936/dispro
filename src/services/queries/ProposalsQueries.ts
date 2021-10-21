import axios from "axios"


export const uploadImg = async(data: any) => {
    const response = await axios.post("https://storage.uat.dis-count.app/coupon/upload", data)
    return response
}