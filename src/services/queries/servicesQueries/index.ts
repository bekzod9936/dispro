import axios, {AxiosResponse} from 'axios'
import { STORAGE_URL } from "../../constants/config";
import { PARTNER } from "services/interceptors/partner_interceptor/types";
import { uploadImageType } from './response.types';


export const Api = {
    async uploadImage(formData: FormData) {
        const token = localStorage.getItem(PARTNER.COMPANY_TOKEN)

        const { data } = await axios.post<FormData, AxiosResponse<uploadImageType>>(`${STORAGE_URL}/company/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
                langId: 1,
              },
        })
        
        if (!(data.success)) {
            throw new Error('response error, services page')
        }

        return data 
    },

    async deleteImage(link: string){
        const token = localStorage.getItem(PARTNER.COMPANY_TOKEN);

        const { data } = await axios.delete(`${STORAGE_URL}/company`, {
            data: {
              links: [link],
            },
            headers: {
              authorization: `Bearer ${token}`,
              langId: 1,
            },
        })

        return data
    },

}