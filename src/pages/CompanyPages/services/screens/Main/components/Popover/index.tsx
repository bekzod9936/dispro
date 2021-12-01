//react
import { useState } from "react"

//packages
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { PopupState } from "material-ui-popup-state/core";

//components
import Popover from "components/Custom/Popover"
import Button from "components/Custom/Button";


//style
import { CreateIcon, ArrowDownIcon, PopoverList, PopoverItem } from "./style"

interface MPopoverProps {
    onClick: () => void
}

const MPopover: React.FC<MPopoverProps> = ({ onClick }) => {
    const [anchorEl, setAnchorEl] = useState<null | PopupState>(null)

    const { t } = useTranslation()
    const history = useHistory()

    const handlePush = () => {
        history.push('/services/create')
    }

    const handleClose = (e: any) => {
        setAnchorEl(e)
    }

    return (
        <Popover
            click={
                <Button
                    startIcon={<CreateIcon />}
                    buttonStyle={{
                        height: {
                            desktop: 60
                        },
                        fontSize: {
                            desktop: 18
                        },
                        weight: 500,
                        color: "#223367",
                        bgcolor: "#fff",
                        shadow: "0px 4px 4px rgba(0, 0, 0, 0.04)"
                    }}
                    endIcon={<ArrowDownIcon />}>
                    {t("create")}
                </Button>
            }
            onClose={handleClose}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
            popoverStyle={{ marginTop: '20px' }}>
            <PopoverList>
                <PopoverItem onClick={() => {
                    onClick()
                    anchorEl?.close()
                }}>
                    {t("section")}</PopoverItem>
                <PopoverItem onClick={handlePush}>{t("item")}</PopoverItem>
            </PopoverList>
        </Popover>
    )
}


export default MPopover