import { useQuery } from "react-query"
import { fetchCategories } from "services/queries/InfoQueries"

export const useFetchCategories = (setCategories: (arg: any) => void) => {
    const _ = useQuery("fetchCategories", () => fetchCategories(), {
        refetchOnWindowFocus: false,
        retry: 0,
        onSuccess: (data) => {
            const validData = data.data.data.map((el: any) => ({ id: el.id, label: el.name, value: el.code }))
            setCategories(validData)
        }
    })
}