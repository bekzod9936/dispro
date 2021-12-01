//packages
import { useTranslation } from "react-i18next"


//components
import { IconButton } from "@material-ui/core"
import Modal from "components/Custom/Modal"
import Input from "components/Custom/Input"
import Button from "components/Custom/Button"


//style
import { Wrapper, CloseIcon, Header, Main, Footer } from "./style"

interface SectionModalProps {
    isOpen: boolean,
    onClose: () => void
}

export const SectionModal: React.FC<SectionModalProps> = ({ isOpen, onClose }) => {

    const { t } = useTranslation()
    return (
        <Modal
            open={isOpen}
            width={{
                maxwidth: 520,
                width: "100%"
            }}>
            <Wrapper>
                <Header>
                    <div className="nav">
                        <h1>{t("newSection")}</h1>
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <p>Можно добавить еще 19 разделов</p>
                </Header>
                <Main>
                    <div>
                        <Input />
                    </div>

                </Main>
                <Footer>
                    <Button
                        onClick={onClose}
                        buttonStyle={{
                            color: "#223367"
                        }}>
                        {t("cancel")}
                    </Button>
                    <Button>
                        {t("create")}
                    </Button>
                </Footer>
            </Wrapper>
        </Modal>
    )
}
