import React, { useState, useMemo } from "react";
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
  ToolTipText,
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
    useTable({ columns: columns, data }, useSortBy);

  return (
    <Container>
      <MTable {...getTableProps()}>
        <Thead header2={header2 ? true : false}>
          {headerGroups.map((headerGroup: any) => (
           
            <Tr {...headerGroup.getHeaderGroupProps()}>
              
              {headerGroup.headers.map((column: any) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  active={column.isSorted}
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
                  row.original.fullData.data?.id
                }
                onClick={(e) => handleAddNewsByClick(e, row)}
                {...row.getRowProps()}
              >
                {row.cells.map((cell: any) => {
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
                        {cell.render("Cell")}
                      </Td>
                    );
                  } else if (cell.column.Header === "Зазывающий текст") {
                    let checkDescription = cell?.row?.original?.fullData?.data?.description;
                    let description =
                      checkDescription?.length > 20
                        ? <p style={{fontSize:'14px'}}>{checkDescription.slice(0, 20) + "..."}</p>
                        : <p style={{fontSize:'14px'}}>{checkDescription}</p>;

                    return (
                      <Td {...cell.getCellProps()}>
                        {description}
                        {cell.render("Cell")}
                      </Td>
                    );
                  } else if (cell.column.Header === "Пол") {
                    let genderType =
                      cell?.row?.original?.fullData?.data?.genderType === 1
                        ? <p style={{fontSize:'14px'}}>{"Мужчина"}</p>
                        : cell?.row?.original?.fullData?.data?.genderType === 2
                        ? <p style={{fontSize:'14px'}}>{"Женщины"}</p>
                        : <p style={{fontSize:'14px'}}>{"Для всех"}</p>;
                    return (
                      <Td {...cell.getCellProps()}>
                        {genderType}
                        {cell.render("Cell")}
                      </Td>
                    );
                  } else if (cell.column.Header === "Срок публикации") {
               
                    let date = cell?.row?.original?.fullData?.date;
                    return (
                      <Td {...cell.getCellProps()}>
                        <AgeData>
                          <p>{date}</p>
                     
                        </AgeData>
                        {cell.render("Cell")}
                      </Td>
                    );
                  }
                  else if (cell.column.Header === "Возрастное ограничение") {
                    let ageFrom = cell?.row?.original?.fullData?.data?.ageFrom;
                    let PushUp= cell?.row?.original?.fullData?.data?.pushUp;
                    let ageUnlimeted=cell?.row?.original?.fullData?.data?.ageUnlimited;
                    let stat=cell?.row?.original?.fullData?.data?.stat;
                    console.log("stat",stat);
                    return (
                      <Td  {...cell.getCellProps()}>
                      <AgeData>
                          {ageUnlimeted ?'' :<h4>{ageFrom + "+"}</h4>}
                          {PushUp ?<h3><ToolTip>{'Push-up'}<ToolTipText><p style={{lineHeight:'21px',color:'#223367',fontSize: '18px',fontWeight:300}}>{`Уведомлений получили:${' '+stat?.get?.total+' '}чел.`}</p>
                          <p style={{lineHeight:'21px',color:'#223367',fontSize: '18px',fontWeight:300,padding:'5px'}}>{`Уведомлений просмотрели:${' '+stat?.view?.total+' '}чел.`}
                          <br/><span style={{color:'#606EEA',padding:'20px'}}>{`${' '+stat?.view?.male+' '} Муж`}</span>
                          <span style={{color:'#FF56BB'}}>{`${' '+stat?.view?.female+' '} Жен`}</span>
                          </p>
                          <p style={{lineHeight:'21px',color:'#223367',fontSize: '18px',fontWeight:300}}>{`Произвели оплату:${' '+stat?.paid?.total+' '}чел.`}
                          <br/>
                          <span style={{color:'#606EEA',padding:'20px'}}>{`${' '+stat?.paid?.male+' '} Муж`}</span>
                          <span style={{color:'#FF56BB'}}>{`${' '+stat?.paid?.female+' '} Жен`}</span>
                          </p>
                          </ToolTipText></ToolTip></h3>:''}
                        </AgeData>
                        {cell.render("Cell")}
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
