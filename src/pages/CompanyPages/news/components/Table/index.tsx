import { useMemo } from "react";
//libraries
import { useTranslation } from "react-i18next";
import { Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { useTable, useSortBy } from "react-table";
//components
import { headers } from "./headers";
//icons
import defaultImage from "assets/images/staff_default.png";
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
  Description,
  TitleData,
  DefaultImage,
  TimeData,
  GenderStyle,
  TooltipGetAll,
  TooltipGet,
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
      color: "#fff",
    },
  }))(Tooltip);

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
                checked={selectedNews?.fullData?.data?.id == row.index}
                onClick={(e) => handleAddNewsByClick(e, row)}
                {...row.getRowProps()}
              >
                {row.cells.map((cell: any) => {
                  if (cell.column.Header === "Заголовок") {
                    let src = cell?.row?.original?.fullData?.data?.image;
                    let checktitle = cell?.row?.original?.fullData?.data?.title;
                    let title =
                      checktitle?.length > 20 ? (
                        <p style={{ fontSize: "14px" }}>
                          {checktitle.charAt(0).toUpperCase() +
                            checktitle.slice(1, 20) +
                            "..."}
                        </p>
                      ) : (
                        <p style={{ fontSize: "14px" }}>
                          {checktitle.charAt(0).toUpperCase() +
                            checktitle.slice(1)}
                        </p>
                      );
                    return (
                      <Td {...cell.getCellProps()}>
                        <TitleData>
                          {src ? (
                            <img
                              src={src}
                              onError={(e: any) => {
                                e.target.onerror = null;
                                e.target.src = defaultImage;
                              }}
                            />
                          ) : (
                            <DefaultImage />
                          )}

                          {title}
                        </TitleData>
                      </Td>
                    );
                  } else if (cell.column.Header === "Описание") {
                    let checkDescription =
                      cell?.row?.original?.fullData?.data?.description;
                    let description =
                      checkDescription?.length > 70
                        ? checkDescription.charAt(0).toUpperCase() +
                          checkDescription.slice(1, 70) +
                          "..."
                        : checkDescription.charAt(0).toUpperCase() +
                          checkDescription.slice(1);

                    return (
                      <Td {...cell.getCellProps()}>
                        <Description>
                          <p>{description}</p>
                        </Description>
                      </Td>
                    );
                  } else if (cell.column.Header === "Пол") {
                    let genderType =
                      cell?.row?.original?.fullData?.data?.genderType === 1 ? (
                        <GenderStyle>{t("Для мужчин")}</GenderStyle>
                      ) : cell?.row?.original?.fullData?.data?.genderType ===
                        2 ? (
                        <GenderStyle>{t("Для женщины")}</GenderStyle>
                      ) : (
                        <GenderStyle>{t("Для всех")}</GenderStyle>
                      );
                    return <Td {...cell.getCellProps()}>{genderType}</Td>;
                  } else if (cell.column.Header === "Срок публикации") {
                    let ageFrom = cell?.row?.original?.fullData?.data?.ageFrom;
                    let PushUp = cell?.row?.original?.fullData?.data?.pushUp;
                    let ageUnlimeted =
                      cell?.row?.original?.fullData?.data?.ageUnlimited;
                    let stat = cell?.row?.original?.fullData?.data?.stat;
                    let date = cell?.row?.original?.fullData?.date;

                    return (
                      <Td {...cell.getCellProps()}>
                        <TimeData>
                          <p style={{ paddingRight: "2px" }}>{date}</p>
                          {ageUnlimeted ? (
                            ""
                          ) : ageFrom > 0 ? (
                            <h4>{ageFrom + "+"}</h4>
                          ) : (
                            ""
                          )}
                          {PushUp ? (
                            <LightToolTip
                              arrow
                              placement="left"
                              title={
                                <>
                                  <TooltipGetAll>{`Уведомлений получили:${
                                    " " + stat?.get?.total + " "
                                  }чел.`}</TooltipGetAll>
                                  <TooltipGet>
                                    {`Уведомлений просмотрели:${
                                      " " + stat?.view?.total + " "
                                    }чел.`}{" "}
                                  </TooltipGet>
                                  <span
                                    style={{
                                      color: "#606EEA",
                                      fontWeight: 300,
                                    }}
                                  >{`${
                                    " " + stat?.view?.male + " "
                                  } Муж`}</span>
                                  <span
                                    style={{
                                      color: "#FF56BB",
                                      fontWeight: 300,
                                    }}
                                  >{`${
                                    " " + stat?.view?.female + " "
                                  } Жен`}</span>
                                  <TooltipGet>
                                    {`Произвели оплату:${
                                      " " + stat?.paid?.total + " "
                                    }чел.`}{" "}
                                  </TooltipGet>
                                  <span
                                    style={{
                                      color: "#606EEA",
                                      fontWeight: 300,
                                    }}
                                  >{`${
                                    " " + stat?.paid?.male + " "
                                  } Муж`}</span>
                                  <span
                                    style={{
                                      color: "#FF56BB",
                                      fontWeight: 300,
                                    }}
                                  >{`${
                                    " " + stat?.paid?.female + " "
                                  } Жен`}</span>
                                </>
                              }
                            >
                              <h3>{t("Push-up")}</h3>
                            </LightToolTip>
                          ) : (
                            ""
                          )}
                        </TimeData>
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
