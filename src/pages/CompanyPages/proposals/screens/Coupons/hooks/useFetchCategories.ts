import { useQuery } from "react-query"
import { fetchCategories } from "services/queries/InfoQueries"
import { useAppSelector } from "services/redux/hooks"
import { RootState } from "services/redux/store"

export const useFetchCategories = (setCategories: (arg: any) => void) => {
    const arr = useAppSelector((state: RootState) => state.info.data?.categories)
    const _ = useQuery(["fetchCategories", arr], () => fetchCategories(), {
        refetchOnWindowFocus: false,
        retry: 0,
        onSuccess: (data) => {
            const validData = data.data.data.map((el: any) => ({ id: el.id, label: el.name, value: el.code }))
            let res = validData.filter((el: any) => arr?.includes(el.id))
            setCategories(res)
        }
    })
}