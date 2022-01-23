import axios, { AxiosResponse } from 'axios'
import { STORAGE_URL } from "../../constants/config";
import { PARTNER } from "services/interceptors/partner_interceptor/types";
import { 
    categoriesResponseType, 
    editAmountPutType, 
    editServicePostType, 
    goodResponseType, 
    goodsResponseType, 
    sectionDtoType, 
    sectionResponseType, 
    uploadImageType 
} from './response.types';
import partnerApi from 'services/interceptors/partner_interceptor';
import { PostDtoType, sectionEditNameType } from 'pages/CompanyPages/services/utils/types';


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

    },


    //! todo: return data.data not data
    async createSection(dto: sectionDtoType[]) {
        await partnerApi.post<sectionDtoType[], sectionResponseType>('/core/goods-section', {
            sections: dto
        })
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
    },

    async getItems(query?: string) {
        const url = `core/goods/by-company${query ? '?key=' + query : ''}`
        const { data } = await partnerApi.get<goodsResponseType>(url)

        if (!data.success) {
            throw new Error('Error during fetching goods!')
        }

        return data.data
    },

    async getItemById(id: number) {
        const { data } = await partnerApi.get<goodResponseType>(`core/goods/${id}`)
        
        if(!data.success) {
            throw new Error('Error during fetching item by id!')
        }

        return data.data
    },

    async getItemsBySectionId(id: number | undefined, query?: string) {
        //! add search feature
        const url = `core/goods/by-section/${id}`
        const { data } = await partnerApi.get<goodsResponseType>(url)

        if (!data.success) {
            throw new Error('Error during fetching goods!')
        }

        return data.data
    },

    async deleteSection(id: number) {
        const _ = await partnerApi.delete(`core/goods-section/${id}`)
    },

    async moveSection(id: number, parentId: number) {
        const _ = await partnerApi.put(`core/goods-section/move/${id}`, {
            parentId
        })
    },

    async hideSection(id: number, action: boolean) {
        const _ = await partnerApi.put(`core/goods-section/hide/${id}`, {
            hideInMobile: action
        })
    },

    async editSection(id: number, section: sectionEditNameType) {
        const _ = await partnerApi.put(`core/goods-section/name/${id}`, {
            goodsSectionTranslates: [section]
        })
    },

    async deleteItem(id: number) {
        const _ = await partnerApi.delete(`core/goods/${id}`)
    },

    async hideItem(id: number, action: boolean) {
        const _ = await partnerApi.put(`core/goods/hide/${id}`, {
            hideInMobile: action
        }) 
    },

    async editService({id, dto}: editServicePostType) {
        const _ = await partnerApi.put(`core/goods/${id}`, dto)
    },

    async editAmount({id, dto}: editAmountPutType) {
        await partnerApi.put(`core/goods/count/${id}`, dto)
    }
}