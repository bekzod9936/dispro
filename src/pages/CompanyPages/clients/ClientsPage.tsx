import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from 'services/redux/hooks'
import { useFetchClients } from './hooks/clientsHooks'
import { Header } from './components/Header/Header'
import { Container } from './style/style'
import { setPage } from 'services/redux/Slices/clientSlice'
import { Table } from './components/Table/Table'
import Spinner from 'components/Helpers/Spinner'
import Pagination from 'components/Custom/Pagination'
import { Footer } from './components/Footer/Footer'


const ClientsPage = () => {
  const { page, totalPages } = useAppSelector(state => state.clients)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  
  const { data, isLoading } = useFetchClients(page, dispatch) 

  return (
    <Container>
      <Header />
      {isLoading ? <Spinner /> : <Table />}
      <Footer />
    </Container>
  )
}

export default ClientsPage
