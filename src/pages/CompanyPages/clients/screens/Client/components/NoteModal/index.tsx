import { IconButton } from '@material-ui/core'
import { CancelIcon, CloseIcon, WhiteSaveIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import Button from 'components/Custom/Button'
import Input from 'components/Custom/Input'
import { useTranslation } from 'react-i18next'
import { Wrapper } from './style'
interface IProps {
    edit?: boolean,
    config: {
        note: {
            open: boolean,
            value: string
        },
        setNote: any,
        handleSendNote: () => void;
        refetch: () => void
    }
}
export const NoteModal = ({ config, edit }: IProps) => {
    const { t } = useTranslation()
    const { note, setNote, handleSendNote, refetch } = config;

    const onSubmit = async () => {
        if (note.value === "") return;
        handleSendNote()
        refetch()
        setNote({ value: "", open: false })
    }
    return (
        <Wrapper>
            <div className="header">
                <h3>{edit ? t("edit") : "Добавление"} заметки</h3>
                <IconButton onClick={() => setNote((prev: any) => ({ ...prev, open: false }))}>
                    <CloseIcon />
                </IconButton>
            </div>
            <Input
                value={note.value}
                onChange={(e) => setNote((prev: any) => ({ ...prev, value: e.target.value }))}
                maxLength={250}
                margin={{ laptop: "0 0 30px 0" }}
                type="textarea"
                multiline
                label="Заметка о клиенте"
                inputStyle={{
                    height: {
                        desktop: 124,
                        laptop: 124
                    }
                }} />
            <div className="buttons">
                <Button
                    onClick={() => setNote((prev: any) => ({ ...prev, open: false }))}
                    margin={{ laptop: "0 20px 0 0" }}
                    buttonStyle={{ bgcolor: "#ffffff", color: "#223367" }}
                    startIcon={<CancelIcon />}>
                    {t("cancel")}
                </Button>
                <Button
                    onClick={onSubmit}
                    disabled={note.value === ""}
                    startIcon={<WhiteSaveIcon />}>
                    {t("save")}
                </Button>
            </div>
        </Wrapper>
    )
}
