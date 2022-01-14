import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "components/Custom/Buttons/Button";
import Input from "components/Custom/Input";
import Modal from "components/Custom/Modal";
import {
  Container,
  WrapLinkIcon,
  WrapLink,
  WrapSocial,
  ModelContent,
  ModalWrap,
  ValueStyle,
  IconPen,
  WrapButtonsDelete,
  ModalText,
  ModalWrap1,
  ModalHeader,
  ModalButtons,
  ModalTitle,
} from "./style";
import { CancelButton } from "components/Custom/Buttons/Cancel";
import { SaveButton } from "components/Custom/Buttons/Save";
import { IconButton } from "@material-ui/core";
import { DeleteIcon } from "../../style";
import { DeleteButton } from "components/Custom/Buttons/Delete";
import { CloseIcon } from "newassets/icons/icons";

interface Props {
  Icon?: any;
  name?: string;
  value?: any;
  onChange?: (e: any) => void;
  onDelete?: (e: any) => void;
}

const Links = ({
  Icon,
  name,
  value,
  onChange = () => {},
  onDelete = () => {},
}: Props) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [item, setItem] = useState("");

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleDelete = () => {};

  return (
    <Container>
      <WrapSocial>
        <WrapLink>
          <WrapLinkIcon>
            <Icon />
          </WrapLinkIcon>
          <div>{name}</div>
        </WrapLink>
        {inputValue ? (
          <div
            style={{
              width: "fit-content",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ValueStyle>{inputValue}</ValueStyle>
            <IconButton
              style={{ marginLeft: "5px" }}
              onClick={() => setOpenDelete(true)}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              style={{ marginLeft: "5px" }}
              onClick={() => setOpenEdit(true)}
            >
              <IconPen />
            </IconButton>
          </div>
        ) : (
          <Button
            buttonStyle={{
              color: value ? "#223367" : "#3492FF",
              bgcolor: "transparent",
            }}
            onClick={() => setOpen(true)}
          >
            {t("connect")}
          </Button>
        )}
      </WrapSocial>
      <Modal open={openEdit}>
        <ModalWrap1>
          <ModalHeader>
            <ModalTitle>{t("editqrcode")}</ModalTitle>
            <IconButton
              onClick={() => {
                setOpenEdit(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </ModalHeader>
          <ModalText>{t("changenameqrcode")}</ModalText>
          <Input
            defaultValue={inputValue}
            label={name}
            type="string"
            onChange={(e: any) => {
              setItem(e.target.value);
            }}
            margin={{ laptop: "30px 0" }}
            autoFocus={true}
          />
          <ModalButtons>
            <CancelButton onClick={() => setOpen(false)} />
            <SaveButton
              type="button"
              onClick={() => {
                setOpenEdit(false);
              }}
              margin={{ laptop: "0 0 0 20px" }}
            />
          </ModalButtons>
        </ModalWrap1>
      </Modal>
      <Modal open={openDelete}>
        <ModalWrap1>
          <ModalHeader>
            <ModalTitle>{t("wantdeleteqrcode")}</ModalTitle>
          </ModalHeader>
          <WrapButtonsDelete>
            <CancelButton
              onClick={() => {
                setOpenDelete(false);
              }}
              margin={{ laptop: "30px 15px 0 0" }}
            />
            <DeleteButton
              onClick={handleDelete}
              margin={{ laptop: "30px 0 0 0" }}
            />
          </WrapButtonsDelete>
        </ModalWrap1>
      </Modal>
    </Container>
  );
};

export default Links;
