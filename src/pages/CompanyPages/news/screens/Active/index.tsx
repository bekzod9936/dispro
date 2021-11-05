import { useMemo, useState } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Spinner from 'components/Custom/Spinner';
import Table from '../../components/Table';
import NoNews from '../../components/NoNews';
import { setQuery } from 'services/redux/Slices/staffs';
import { useAppSelector, useAppDispatch } from "services/redux/hooks";
import moment from 'moment';
import {
    Container,
    Wrap,
   
} from './style'

import useActive from './useActive'


const Active =()=>{
  const location = useLocation();
  const dispatch = useAppDispatch();

  const history = useHistory();
  const query = useAppSelector((state) => state.staffs.query);
    const { t } = useTranslation();
    const handleOpenSetting = () => {
      history.push({
        pathname: '/staff/setting',
        state: { prevPage: location.pathname },
      });
      dispatch(setQuery(''));
    };

    const {response,data}=useActive()
    {console.log("data,",data)}
const list=data?.map((v:any)=>{
    const startDate = moment(v?.startLifeTime).format('DD.MM.YYYY');
    const endDate=moment(v?.endLifeTime).format('DD.MM.YYYY')
    const genderType=v?.genderType===0 ? 'girl':'boy' 
    return {
        col1:v?.title,
        col2:v?.description,
        col3:genderType,
        col4:startDate+'---'+endDate
    }
})

console.log('list',list)
console.log('response',response)
const columns: any = useMemo(
    () => [
      {
        Header: t('Заголовок'),
        accessor: 'col1',
      },
      {
        Header: t('Зазывающий текст'),
        accessor: 'col2',  
      },
      {
        Header: t('Пол'),
        accessor: 'col3', 
      },
      {
        Header: t('Срок публикации'),
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
 
          {list.length>0 ?   <Table columns={columns} data={list} />:
          <div style={{paddingRight:'20%',paddingTop:'10%'}}>
            <NoNews handleOpenSetting={handleOpenSetting}/></div>}
    
          </>
        )}
                </Wrap>
        </Container>
    )
}


export default Active;