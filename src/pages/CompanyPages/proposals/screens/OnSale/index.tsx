import { SideBar } from 'pages/CompanyPages/clients/components/SideBar'
import React from 'react'
import { useAppDispatch, useAppSelector } from 'services/redux/hooks'
import { RootState } from 'services/redux/store'
import { useDebounce } from 'use-debounce/lib'
import { CouponBar } from '../../components/CouponSideBar'
import { Wrapper } from './style'
import { useOnSale } from './useOnSale'
import Input from "components/Custom/Input"
import { SearchIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import Spinner from 'components/Helpers/Spinner'
import { IDeferred } from 'services/redux/Slices/proposals/types'
import { CouponCard } from '../../components/CouponCard'
import { resetCurrentCoupon, setCurrentOnSaleCoupon } from 'services/redux/Slices/proposals/proposals'


const OnSale = () => {
    const { onSale, currentCoupon } = useAppSelector((state: RootState) => state.proposals)
    const [query, setQuery] = React.useState<string>("")
    const [open, setOpen] = React.useState<boolean>(false)
    const [debounced] = useDebounce(query, 300)
    const dispatch = useAppDispatch()
    const { isLoading, refetch } = useOnSale({ dispatch, query: debounced })

    const handleOpen = (id: number) => {
        dispatch(setCurrentOnSaleCoupon(id))
        setOpen(true)
    }

    const handleResetCoupon = () => {
        dispatch(resetCurrentCoupon())
    }

    React.useEffect(() => {
        dispatch(resetCurrentCoupon())
    }, [])

    return (
        <Wrapper>
            <SideBar maxWidth="370px" isOpen={open}>
                <CouponBar
                    refetch={refetch}
                    resetCoupon={handleResetCoupon}
                    disableUpdate={true}
                    currentCoupon={currentCoupon}
                    onClose={setOpen} />
            </SideBar>
            <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                IconStart={<SearchIcon style={{ marginLeft: "35px" }} />}
                placeholder="Поиск..."
                margin={{ laptop: "0 0 20px 0" }}
                inputStyle={{ border: "none" }}
                width={{ maxwidth: 500, width: "100%" }} />
            {isLoading ? <Spinner /> : onSale.map((el: IDeferred) => (
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


export default OnSale