import React, { Suspense } from 'react'
import { useAppDispatch, useAppSelector } from 'services/redux/hooks'
import { IDeferred } from 'services/redux/Slices/proposals/types'
import { RootState } from 'services/redux/store'
import { CouponCard } from '../../components/CouponCard'
import { Wrapper } from './style'
import { useDeferred } from './useDeferred'
import Input from "components/Custom/Input"
import { SearchIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import { useDebounce } from 'use-debounce/lib'
import Spinner from 'components/Helpers/Spinner'

const Deferred = () => {
    const dispatch = useAppDispatch()
    const { deferred } = useAppSelector((state: RootState) => state.proposals)
    const [value, setValue] = React.useState<string>("")
    const [debouncedQuery] = useDebounce(value, 300)
    const { isLoading } = useDeferred({dispatch, query: debouncedQuery})
    
    
    return (
        <Wrapper>
            <Input 
                value={value}
                onChange={(e) => setValue(e.target.value)}
                IconStart={<SearchIcon style={{marginLeft: "35px"}}/>} 
                placeholder="Поиск..." 
                margin={{laptop: "0 0 20px 0"}} 
                inputStyle={{border: "none"}} 
                width={{maxwidth: 500, width: "100%"}}/>
            {isLoading ? <Spinner /> : deferred.map((el: IDeferred) => (
                <CouponCard 
                    img={el.image}
                    title={el.title}
                    ageFrom={el.ageFrom}
                    type={el.type}
                    categoryIds={el.categoryIds}
                    description={el.description}
                    price={el.price}
                    value={el.value}
                    count={el.count}
                />
            ))}
        </Wrapper>
    )
}


export default Deferred