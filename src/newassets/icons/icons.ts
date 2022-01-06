import styled from "styled-components";
import { device } from "styles/device";
import { ReactComponent as SquarePlus } from "newassets/icons/squareplus.svg";
import { ReactComponent as Plus } from "newassets/icons/plus.svg";
import { ReactComponent as Down } from "newassets/icons/down.svg";
import { ReactComponent as Search } from "newassets/icons/search.svg";
import { ReactComponent as Dots } from "newassets/icons/dots.svg";
import { ReactComponent as Save } from "newassets/icons/save.svg";
import { ReactComponent as Delete } from "newassets/icons/delete.svg";
import { ReactComponent as DownLoad } from "newassets/icons/download.svg";
import { ReactComponent as Chain } from "newassets/icons/chain.svg";
import { ReactComponent as CancelSvg } from "newassets/icons/cancel.svg";
import { ReactComponent as CloseSvg } from "newassets/icons/close.svg";
import { ReactComponent as Store } from "newassets/icons/store.svg";
import { ReactComponent as X } from "newassets/icons/x.svg";

export const CloseIcon = styled(CloseSvg)``;

export const XIcon = styled(X)``;

export const StoreIcon = styled(Store)``;

export const CancelIcon = styled(CancelSvg)``;

export const SquarePlusIcon = styled(SquarePlus)``;

export const DownLoadIcon = styled(DownLoad)``;

export const ChainIcon = styled(Chain)``;

export const PlusIcon = styled(Plus)``;

export const DownIcon = styled(Down)``;

export const DeleteIcon = styled(Delete)``;

export const SaveIcon = styled(Save)`
  width: 24px;
  height: 24px;
  @media (max-width: ${device.planshet}) {
    width: 18px;
    height: 18px;
  }
`;

export const SearchIcon = styled(Search)`
  width: 24px;
  height: 24px;

  @media (min-width: ${device.laptop}) {
    width: 28px;
    height: 28px;
  }
  @media (max-width: ${device.mobile}) {
    width: 18px;
    height: 18px;
  }
`;

export const DotsIcon = styled(Dots)``;
