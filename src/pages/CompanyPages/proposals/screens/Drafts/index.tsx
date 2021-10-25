import { SearchIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import { AddIcon } from 'assets/icons/InfoPageIcons/InfoPageIcons'
import Button from 'components/Custom/Button'
import Input from 'components/Custom/Input'
import Spinner from 'components/Helpers/Spinner'
import { SideBar } from 'pages/CompanyPages/clients/components/SideBar'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { deleteCoupon } from 'services/queries/ProposalsQueries'
import { useAppDispatch, useAppSelector } from 'services/redux/hooks'
import { resetCurrentCoupon, setSelectedCoupon } from 'services/redux/Slices/proposals/proposals'
import { IDeferred } from 'services/redux/Slices/proposals/types'
import { RootState } from 'services/redux/store'
import { Flex } from 'styles/BuildingBlocks'
import { useDebounce } from 'use-debounce/lib'
import { CouponCard } from '../../components/CouponCard'
import { CouponBar } from '../../components/CouponSideBar'
import { EmptyPage } from './components/EmptyPage'
import { MModal } from './components/Modal'
import { Container, Nav, Wrapper } from './style'
import { useDrafts } from './useDrafts'

const Drafts = () => {
    const { t } = useTranslation()
    const [isOpen, setOpen] = React.useState<boolean>(false)
    const [query, setQuery] = React.useState<string>("")
    const [debounced] = useDebounce(query, 300)
    const dispatch = useAppDispatch()
    const { isLoading, refetch } = useDrafts({dispatch, query: debounced})
    const [isSideBarOpen, setSideBarOpen] = React.useState<boolean>(false)
    const { currentCoupon, drafts } = useAppSelector((state: RootState) => state.proposals)
    const handleOpen = () => {
        setOpen(true)
    }

    const handleSideBarOpen = (id: number) => {
        dispatch(setSelectedCoupon(id))
        setSideBarOpen(true)
    }

    const handleReset = () => {
        dispatch(resetCurrentCoupon())
    }

    return (
        <Wrapper>
            <SideBar maxWidth="370px" isOpen={isSideBarOpen}>
                <CouponBar
                    refetch={refetch}
                    resetCoupon={handleReset} 
                    currentCoupon={currentCoupon} 
                    onClose={setSideBarOpen}/>
            </SideBar>
            <div style={{display: "flex", margin: "0 0 20px 0"}}>
                <Button 
                    onClick={handleOpen} 
                    buttonStyle={{bgcolor: "#FFFFFF", color: "#223367", weight: 500, height: {desktop: 60}}} 
                    margin={{desktop: "0 25px 0 0", laptop: "0 25px 0 0", planshet: "0 0 20px 0"}} 
                    startIcon={<AddIcon />}>
                    {t("create")}
                </Button>
                <Input
                    placeholder="Поиск..."
                    onChange={(e) => setQuery(e.target.value)}
                    inputStyle={{border: "none", height: {laptop: 45, planshet: 40}}}
                    width={{maxwidth: 500, width: "100%"}}
                    IconStart={<SearchIcon style={{marginLeft: 30}}/>} 
                    />
            </div>
            <Container>
                {isLoading ? <Spinner /> : drafts.map((el: IDeferred) => (
                    <CouponCard
                        isSelected={currentCoupon.id === el.id}
                        onClick={() => handleSideBarOpen(el.id)}
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
                {!drafts.length && <EmptyPage />}
            </Container>
            <MModal setOpen={setOpen} open={isOpen}/>
        </Wrapper>
    )
}


export default Drafts


                   


