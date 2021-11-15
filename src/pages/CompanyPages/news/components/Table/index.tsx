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
                        ? checktitle.slice(0, 20) + "..."
                        : checktitle;
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
                        ? checkDescription.slice(0, 20) + "..."
                        : checkDescription;

                    return (
                      <Td {...cell.getCellProps()}>
                        {description}
                        {cell.render("Cell")}
                      </Td>
                    );
                  } else if (cell.column.Header === "Пол") {
                    let genderType =
                      cell?.row?.original?.fullData?.data?.genderType === 1
                        ? "Мужчина"
                        : cell?.row?.original?.fullData?.data?.genderType === 2
                        ? "Женщины"
                        : "Для всех";
                    return (
                      <Td {...cell.getCellProps()}>
                        {genderType}
                        {cell.render("Cell")}
                      </Td>
                    );
                  } else if (cell.column.Header === "Срок публикации") {
                    let ageFrom = cell?.row?.original?.fullData?.data?.ageFrom;
                    let date = cell?.row?.original?.fullData?.date;
                    return (
                      <Td {...cell.getCellProps()}>
                        <AgeData>
                          {date}
                          <h4>{ageFrom + "+"}</h4>
                        </AgeData>
                        {cell.render("Cell")}
                      </Td>
                    );
                  } else
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
