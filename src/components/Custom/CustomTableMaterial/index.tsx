import React from 'react';
import { Container, StyledPagination, Wrapper, Info, Wrap } from './style';
import { DataGrid } from '@material-ui/data-grid';

interface Props {
  header: any[];
  body: any[];
  onChange: (p: any) => void;
  page: number;
  total: number;
  disabled: boolean;
  visable: number;
  headerHeight?: number;
  twoheader?: boolean;
}

const CustomTableMaterial = ({
  header,
  body,
  onChange,
  page,
  total,
  disabled,
  visable,
  headerHeight,
  twoheader,
}: Props) => {
  return (
    <Wrap>
      <Container twoheader={twoheader}>
        <DataGrid
          headerHeight={headerHeight || 64}
          rowHeight={60}
          rows={body}
          columns={header}
          disableSelectionOnClick
          hideFooterPagination={true}
          hideFooter={true}
          hideFooterRowCount={true}
          hideFooterSelectedRowCount={true}
          autoHeight={true}
          loading={disabled}
          disableExtendRowFullWidth={true}
        />
      </Container>
      <Wrapper>
        <Info>
          Показано
          <span>
            {(page > 1 ? page * 6 - 6 + ' - ' : '') +
              (page * 6 <= total ? page * 6 : total)}
          </span>
          из <span>{total}</span> операций
        </Info>
        <StyledPagination
          page={page}
          count={Math.ceil(total / 6)}
          boundaryCount={visable}
          onChange={(e, page) => onChange(page)}
          disabled={disabled}
        />
      </Wrapper>
    </Wrap>
  );
};

export default CustomTableMaterial;
