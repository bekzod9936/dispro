import { useMutation } from "react-query"
import { ApiServices } from "services/queries/servicesQueries"
import { PostDtoType } from "../../utils/types"

export const useCreateService = () => {
    return useMutation((dto: PostDtoType) => ApiServices.createService(dto))
}