import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Spinner from 'components/Custom/Spinner';
import Table from '../../components/Table';
import moment from 'moment';
import {
    Container,
    Wrap,
    WrapPag,
    Info,
} from './style'
import useActive from './useActive'
const Active =()=>{
    const { t } = useTranslation();
    const {response,data}=useActive()
    {console.log("data,",data)}
// const list=
const list=data?.map((v:any)=>{
    const startDate = moment(v?.startLifeTime).format('DD.MM.YYYY');
    const endDate=moment(v?.endLifeTime).format('DD.MM.YYYY')
    return {
        col1:v?.title,
        col2:v?.description,
        col3:v?.genderType,
        col4:startDate+'---'+endDate
    }
})

console.log('list',list)
console.log('response',response)
const columns: any = useMemo(
    () => [
      {
        Header: t('title'),
        accessor: 'col1',
      },
      {
        Header: t('description'),
        accessor: 'col2',  
      },
      {
        Header: t('genderType'),
        accessor: 'col3', 
      },
      {
        Header: t('date'),
        accessor: 'col4', 
      }
    ],
    []
  );

    return (
        <Container>
            <Wrap>
            {response.isLoading || response.isFetching ? (
          <Spinner />
        ) : (
          <>
        <Table columns={columns} data={list} />
          </>
        )}
                </Wrap>
        </Container>
    )
}


export default Active;