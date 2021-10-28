import { SideBar } from "pages/CompanyPages/clients/components/SideBar"
import React from "react"
import { useAppDispatch, useAppSelector } from "services/redux/hooks"
import { resetCurrentCoupon, setCurrentCoupon } from "services/redux/Slices/proposals/proposals"
import { CouponBar } from "../../components/CouponSideBar"
import { Wrapper } from "./style"
import { useArchive } from "./useArchive"
import Input from "components/Custom/Input"
import { useDebounce } from "use-debounce/lib"
import { SearchIcon } from "assets/icons/ClientsPageIcons/ClientIcons"
import Spinner from "components/Helpers/Spinner"
import { RootState } from "services/redux/store"
import { IDeferred } from "services/redux/Slices/proposals/types"
import { CouponCard } from "../../components/CouponCard"
import { EmptyPage } from "../Drafts/components/EmptyPage"
import { Container } from "../Drafts/style"

const Archive = () => {
    const [open, setOpen] = React.useState(false)
    const [query, setQuery] = React.useState("")
    const [debounced] = useDebounce(query, 300)
    const dispatch = useAppDispatch()
    const { archive, currentCoupon } = useAppSelector((state: RootState) => state.proposals)
    const { refetch, isFetching } = useArchive({ dispatch, query: debounced })

    const handleOpen = (id: number) => {
        dispatch(setCurrentCoupon({ id, location: "archive" }))
        setOpen(true)
    }

    React.useEffect(() => {
        dispatch(resetCurrentCoupon())

    }, [])

    return (
        <Wrapper>
            <SideBar maxWidth="370px" isOpen={open}>
                <CouponBar
                    canceled
                    refetch={refetch}
                    resetCoupon={() => dispatch(resetCurrentCoupon())}
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
            <Container>
                {isFetching ? <Spinner /> : archive.map((el: IDeferred) => (
                    <CouponCard
                        stats={el.stat}
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
                {!archive.length && <EmptyPage />}
            </Container>
        </Wrapper>
    )
}


export default Archive
