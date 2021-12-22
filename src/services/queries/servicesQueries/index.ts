import axios, {AxiosResponse} from 'axios'
import { STORAGE_URL } from "../../constants/config";
import { PARTNER } from "services/interceptors/partner_interceptor/types";
import { categoriesResponseType, sectionDtoType, sectionResponseType, uploadImageType } from './response.types';
import partnerApi from 'services/interceptors/partner_interceptor';
import { PostDtoType } from 'pages/CompanyPages/services/utils/types';


export const ApiServices = {
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

    //create service
    async createService(dto: PostDtoType)  {
        const { data } = await partnerApi.post<PostDtoType, any>('core/goods', dto);

        console.log(data)
    },



    //! todo: rewrite posting of sections name
    async createSection(dto: sectionDtoType) {
        const response = await partnerApi.post<sectionDtoType, AxiosResponse<{data: any}>>('/core/goods-section', {
            sections: [dto]
        })

        console.log(response.data);
        
    },

    async getCategories() {
        const {data} = await partnerApi.get<categoriesResponseType>('/directory/category')

        if (!data.success) {
            throw new Error('Error during fetching categories')
        }
        return data
    },

    async getSections() {
        const { data } = await partnerApi.get<sectionResponseType>('/core/goods-section/by-company')

        if (!data.success) {
            throw new Error('Error during fetching sections!')
        }

        return data
    }

}