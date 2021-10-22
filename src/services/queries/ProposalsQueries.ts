import axios from "axios"
import { ICoupon } from "pages/CompanyPages/proposals/screens/Coupons"
import partnerApi from "services/interceptors/companyInterceptor"


export const uploadImg = async(data: any) => {
    const response = await axios.post("https://storage.uat.dis-count.app/coupon/upload", data)
    return response
}


export const fetchDeferred = async(query: any) => {
    if (query) {
        const response = await partnerApi(`/bonus/coupons/type/2/search/by?key=${query}`)
        return response
    } else {
        const response = await partnerApi("/bonus/coupons/type/2/by/company/situation/1")
        return response
    }
}


export const postCoupon = async(data: ICoupon) => {
    const response = await partnerApi.post("/bonus/coupons/", data)
    return response
}

export const putCoupon = async(id: number, data: any) => {
    const response = await partnerApi.put(`/bonus/coupons/${id}/publish`, data)
}

