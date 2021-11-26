import  { useMemo } from "react";
import { IconButton, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/styles'
import { useTable, useSortBy } from "react-table";
import { headers } from "./headers";
import { useTranslation } from "react-i18next";
import {
  Container,
  MTable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  UpIcon,
  TRow,
  AgeData,
  TitleData,
  DefaultImage,
  TimeData,
  ToolTipText,
  Text,
  ToolTipDescription,
  ToolTip,
} from "./style";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { setSelectedNews } from "services/redux/Slices/news";
interface Props {
  columns?: any;
  data?: any;
  header2?: any;
}

const Table = ({ data, header2 }: Props) => {
  const dispatch = useAppDispatch();
  const selectedNews = useAppSelector((state) => state.news.selectedNews);
  const { t } = useTranslation();
  let convertedData=data;
  const handleAddNewsByClick = (e: any, row: any) => {
    e.stopPropagation();
    dispatch(setSelectedNews(row.original));
    if (selectedNews?.fullData?.data?.id === row.original.fullData.data.id) {
      dispatch(setSelectedNews([]));
    }
  };
  const columns: any = useMemo(() => {
    return headers.map((header) => ({
      Header: t(header.value),
      accessor: t(header.label),
      
    }));
  }, []);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: columns, data:convertedData }, useSortBy);
  
     
   
    const LightToolTip = withStyles(() => ({
        
      tooltip: {
          backgroundColor: "#fff",
          color: "#223367",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.12)",
          fontSize: 18,
          padding: 15,
          borderRadius: 14,
    
      },
      arrow: {
          color: "#fff"
      }
  }))(Tooltip)

  return (
    <Container>
      <MTable  {...getTableProps()}>
        <Thead header2={header2 ? true : false}>
          {headerGroups.map((headerGroup: any) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
            
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  active={column.isSorted ? column.isSortedDesc:column.isSortedDesc}

                >
                  {column.render("Header")}
                  <UpIcon up={column.isSortedDesc} active={column.isSorted} />
                </Th>
                
              ))}
            </Tr>
          ))}
          {header2 ? header2 : null}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row: any) => {
            prepareRow(row);

            return (
              <TRow
                checked={
                  selectedNews?.fullData?.data?.id ==
                  row.index
                }
                onClick={(e) => handleAddNewsByClick(e, row)}
                {...row.getRowProps()}
              >
                {row.cells.map((cell: any) => {
                      console.log('cellcellcellcell',cell)
                  if (cell.column.Header === "Заголовок") {
                
                    let src = cell?.row?.original?.fullData?.data?.image;
                    let checktitle = cell?.row?.original?.fullData?.data?.title;
                    let title =
                      checktitle?.length > 20
                        ? <p style={{fontSize:'14px'}}>{checktitle.slice(0, 20) + "..."}</p>
                        : <p style={{fontSize:'14px'}}>{checktitle}</p>;
                    return (
                      <Td {...cell.getCellProps()}>
                        <TitleData>
                          
                          {src ? <img src={src} /> : <DefaultImage />}
                          {title ? title : ""}
                        </TitleData>
          
                      </Td>
                    );
                  }  else if (cell.column.Header === "Описание") {
                    let checkDescription = cell?.row?.original?.fullData?.data?.description;
             
                    let description =
                      checkDescription?.length > 78
                        ? checkDescription.slice(0, 78) + "..."
                        : checkDescription;

                    return (
                      <Td {...cell.getCellProps()}>
                           <AgeData>
                             <p style={{ width:'300px',whiteSpace: "pre-wrap"}}>{description}</p>
                       
                      </AgeData>
                      
                      </Td>
                    );
                  }
                  else if (cell.column.Header === "Пол") {
                    let genderType =
                      cell?.row?.original?.fullData?.data?.genderType === 1
                        ? <p style={{lineHeight:'21px',color:'#223367',fontSize: '14px',fontWeight:300}}>{"Для мужчин"}</p>
                        : cell?.row?.original?.fullData?.data?.genderType === 2
                        ? <p style={{lineHeight:'21px',color:'#223367',fontSize: '14px',fontWeight:300}}>{"Для женщины"}</p>
                        : <p style={{lineHeight:'21px',color:'#223367',fontSize: '14px',fontWeight:300}}>{"Для всех"}</p>;
                    return (
                      <Td {...cell.getCellProps()}>
                        {genderType}
                  
                      </Td>
                    );
                  } 
                  else if (cell.column.Header === "Срок публикации") {
                    let ageFrom = cell?.row?.original?.fullData?.data?.ageFrom;
                    let PushUp= cell?.row?.original?.fullData?.data?.pushUp;
                    let ageUnlimeted=cell?.row?.original?.fullData?.data?.ageUnlimited;
                    let stat=cell?.row?.original?.fullData?.data?.stat;
                    let date = cell?.row?.original?.fullData?.date;
               
                    return (
                      <Td {...cell.getCellProps()}>
                        <TimeData>
                          <p>{date}</p>
                          {ageUnlimeted ? '' :ageFrom>0 ? <h4>{ageFrom+ "+"}</h4>:''}
                          {     PushUp ? <LightToolTip arrow placement="left" title={<> 
                          <p style={{padding:'10px 0px',lineHeight:'21px',color:'#223367',fontSize: '18px',fontWeight:300}}>{`Уведомлений получили:${' '+stat?.get?.total+' '}чел.`}</p>  
                          <p style={{lineHeight:'21px',color:'#223367',fontSize: '18px',fontWeight:300}}>{`Уведомлений просмотрели:${' '+stat?.view?.total+' '}чел.`}  </p>
                          <span style={{color:'#606EEA',fontWeight:300,}}>{`${' '+stat?.view?.male+' '} Муж`}</span>
                          <span style={{color:'#FF56BB',fontWeight:300,}}>{`${' '+stat?.view?.female+' '} Жен`}</span>
                          <p style={{lineHeight:'21px',color:'#223367',fontSize: '18px',fontWeight:300}}>{`Произвели оплату:${' '+stat?.paid?.total+' '}чел.`} </p>
                          <span style={{color:'#606EEA',fontWeight:300}}>{`${' '+stat?.paid?.male+' '} Муж`}</span>
                          <span style={{color:'#FF56BB',fontWeight:300}}>{`${' '+stat?.paid?.female+' '} Жен`}</span>
                       
                          </>}>
                    <h3> Push-up</h3>
                </LightToolTip>:''}
                        </TimeData>
                 
                      </Td>
                    );
                  
                  }  else
                    return (
                      <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                    );
                })}
              </TRow>
            );
          })}
        </Tbody>
      </MTable>
    </Container>
  );
};

export default Table;
