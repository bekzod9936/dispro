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
  WrapDeleteComment,
} from "./style";
import { CancelButton } from "components/Custom/Buttons/Cancel";
import { SaveButton } from "components/Custom/Buttons/Save";
import { IconButton } from "@material-ui/core";
import { DeleteIcon } from "../../style";
import { DeleteButton } from "components/Custom/Buttons/Delete";
import { CloseIcon } from "newassets/icons/icons";
import { defSocial } from "./constants";
import { Title } from "../../../../style";
import { useAppSelector } from "services/redux/hooks";

interface Props {}

const Links = () => {
  const { t } = useTranslation();
  const data = useAppSelector((state) => state.info.data);

  const [social, setSocial] = useState(defSocial);

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [choose, setChoose] = useState<any>();

  useEffect(() => {
    const newSocial: any = social.map((v: any) => {
      const link = data?.socialLinks?.find((i: any) => i.name === v.name);
      return {
        ...v,
        value: link?.value || "",
      };
    });
    setSocial(newSocial);
  }, [data]);

  const handleDelete = () => {};

  return (
    <div style={{ marginTop: "5px" }}>
      <Title>{t("companyLink")}</Title>
      <Container>
        {social.map((v: any) => {
          const { Icon, name, value } = v;
          return (
            <WrapSocial>
              <WrapLink>
                <WrapLinkIcon>
                  <Icon />
                </WrapLinkIcon>
                <div>{name}</div>
              </WrapLink>
              {Boolean(value) ? (
                <div
                  style={{
                    width: "fit-content",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ValueStyle>{value}</ValueStyle>
                  <IconButton
                    style={{ marginLeft: "5px" }}
                    onClick={() => {
                      setChoose(v);
                      setOpenDelete(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    style={{ marginLeft: "5px" }}
                    onClick={() => {
                      setOpenEdit(true);
                      setChoose(v);
                    }}
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
                  onClick={() => {
                    setOpenEdit(true);
                    setChoose(v);
                  }}
                >
                  {t("connect")}
                </Button>
              )}
            </WrapSocial>
          );
        })}
        <Modal open={openEdit}>
          <ModalWrap1>
            <ModalHeader>
              <ModalTitle>
                {Boolean(choose?.value) ? t("editqrcode") : t("addlink")}
              </ModalTitle>
              <IconButton
                onClick={() => {
                  setOpenEdit(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            </ModalHeader>
            <Input
              defaultValue={choose?.value}
              label={choose?.name}
              type="string"
              onChange={(e: any) => {
                setChoose({ ...choose, value: e.target.value });
              }}
              margin={{ laptop: "30px 0" }}
              autoFocus={true}
            />
            <ModalButtons>
              <CancelButton onClick={() => setOpenEdit(false)} />
              <SaveButton
                type="button"
                onClick={() => {
                  setOpenEdit(false);
                  const newArr = social.filter((v: any) => {
                    if (v.name === choose?.name) {
                      return choose;
                    } else {
                      return v;
                    }
                  });
                  setSocial(newArr);
                }}
                margin={{ laptop: "0 0 0 20px" }}
              />
            </ModalButtons>
          </ModalWrap1>
        </Modal>
        <Modal open={openDelete}>
          <ModalWrap1>
            <ModalHeader>
              <ModalTitle>{t("deletelink")}</ModalTitle>
            </ModalHeader>
            <WrapDeleteComment>{choose?.value}</WrapDeleteComment>
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
    </div>
  );
};

export default Links;
