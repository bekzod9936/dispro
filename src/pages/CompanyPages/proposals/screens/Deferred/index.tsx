import React from 'react'
import { useAppDispatch, useAppSelector } from 'services/redux/hooks'
import { IDeferred } from 'services/redux/Slices/proposals/types'
import { RootState } from 'services/redux/store'
import { Wrapper } from './style'
import { useDeferred } from './useDeferred'
import Input from "components/Custom/Input"
import { SearchIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import { useDebounce } from 'use-debounce/lib'
import Spinner from 'components/Helpers/Spinner'
import { CouponCard } from '../../components/CouponCard'
import { resetCurrentCoupon, setSelectedCoupon } from 'services/redux/Slices/proposals/proposals'
import { SideBar } from 'pages/CompanyPages/clients/components/SideBar'
import { CouponBar } from '../../components/CouponSideBar'

const Deferred = () => {
    const dispatch = useAppDispatch()
    const { deferred, currentCoupon } = useAppSelector((state: RootState) => state.proposals)
    const [open, setOpen] = React.useState<boolean>(false)
    const [value, setValue] = React.useState<string>("")
    const [debouncedQuery] = useDebounce(value, 300)
    const { isFetching, refetch } = useDeferred({dispatch, query: debouncedQuery})
    
    const handleOpen = (id: number) => {
        dispatch(setSelectedCoupon(id))
        setOpen(true)
    }
    
    const handleReset = () => {
        dispatch(resetCurrentCoupon())
    }

    React.useEffect(() => {
        dispatch(resetCurrentCoupon())
    }, [])

    return (
        <Wrapper>
            <SideBar maxWidth="370px" isOpen={open}>
                <CouponBar refetch={refetch} resetCoupon={handleReset} currentCoupon={currentCoupon} onClose={setOpen}/>
            </SideBar>
            <Input 
                value={value}
                onChange={(e) => setValue(e.target.value)}
                IconStart={<SearchIcon style={{marginLeft: "35px"}}/>} 
                placeholder="Поиск..." 
                margin={{laptop: "0 0 20px 0"}} 
                inputStyle={{border: "none"}} 
                width={{maxwidth: 500, width: "100%"}}/>
            {isFetching ? <Spinner /> : deferred.map((el: IDeferred) => (
                <CouponCard
                    isSelected={currentCoupon.id === el.id}
                    onClick={() => handleOpen(el.id)}
                    key={el.id} 
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