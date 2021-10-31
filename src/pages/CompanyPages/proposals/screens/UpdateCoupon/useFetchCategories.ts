import { useQuery } from "react-query"
import { fetchCategories } from "services/queries/InfoQueries"
import { getDefaultCategories } from "../../utils/getValidDate"
export const useFetchCategories = (setCategories: (arg: any) => void, currentCategories: number[]) => {

    const _ = useQuery("fetchCategories", () => fetchCategories(), {
        refetchOnWindowFocus: false,
        retry: 0,
        onSuccess: (data: any) => {
            const arr = data.data.data.map((el: any) => ({ id: el.id, value: el.code, label: el.name }))
            const defaults = getDefaultCategories(arr, currentCategories)
            setCategories({
                defaults,
                categories: defaults
            })
        }
    })
}