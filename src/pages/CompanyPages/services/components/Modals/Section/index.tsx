//packages
import { useTranslation } from "react-i18next"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Alert } from "@material-ui/lab"

//components
import { IconButton } from "@material-ui/core"
import Modal from "components/Custom/Modal"
import Input from "components/Custom/Input"
import Button from "components/Custom/Button"


//style
import {
    Wrapper,
    CloseIcon,
    Header,
    Main,
    Footer,
    RemoveInputIcon,
    Field,
    CreateSectionIcon,
    CancelIcon
} from "./style"
import { createSectionFormType } from "pages/CompanyPages/services/utils/types"
import { sectionsSchema } from "pages/CompanyPages/services/utils/schemas.yup"

interface SectionModalProps {
    isOpen: boolean,
    onClose: () => void
}


export const SectionModal: React.FC<SectionModalProps> = ({ isOpen, onClose }) => {

    const { handleSubmit, control, clearErrors, formState: { errors } } = useForm({
        defaultValues: {
            sections: [{ title: "" }]
        },
        resolver: yupResolver(sectionsSchema),
        mode: "onChange"
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'sections'
    })


    const { t } = useTranslation()

    const onSubmit = async (data: createSectionFormType) => {
    }

    const handleClose = () => {
        clearErrors()
        onClose()
    }
    console.log(errors);

    return (
        <Modal
            open={isOpen}
            width={{
                maxwidth: 520,
                width: "100%"
            }}>
            <Wrapper onSubmit={handleSubmit(onSubmit)}>
                <Header>
                    <div className="nav">
                        <h1>{t("newSection")}</h1>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <p>Можно добавить еще {20 - fields.length} разделов</p>
                </Header>
                {/* <Alert severity="error">{errors?.sections.message}</Alert> */}
                <Main>
                    {
                        fields.map((field, index) => (
                            <Field key={field.id}>
                                <Controller
                                    control={control}
                                    name={`sections.${index}.title` as const}
                                    render={({ field }) => (
                                        <Input
                                            isAbsolute
                                            error={Boolean(errors?.sections?.[index]?.title)}
                                            message={t(errors?.sections?.[index]?.title?.message + "")}
                                            field={field}
                                            label={t("sectionName")}
                                            IconEnd={fields.length > 1 ? <RemoveInputIcon onClick={() => {
                                                remove(index)
                                            }} /> : undefined} />
                                    )}
                                />
                                {fields.length <= 19 && index === fields.length - 1 &&
                                    <button onClick={() => {
                                        append({
                                            title: ""
                                        })
                                    }} className="add">{t("createAnother")}</button>}
                            </Field>
                        ))
                    }
                </Main>
                <Footer>
                    <Button
                        onClick={handleClose}
                        margin={{
                            desktop: "0 15px 0 0"
                        }}
                        startIcon={<CancelIcon />}
                        buttonStyle={{
                            color: "#223367",
                            bgcolor: "#fff",
                            weight: 500
                        }}>
                        {t("cancel")}
                    </Button>
                    <Button type="submit" startIcon={<CreateSectionIcon />}>
                        {t("create")}
                    </Button>
                </Footer>
            </Wrapper>
        </Modal>
    )
}
