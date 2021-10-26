import React from "react"
import { useAppDispatch } from "services/redux/hooks"
import { useArchive } from "./useArchive"

const Archive = () => {
    const [file, setFile] = React.useState()
    const [open, setOpen] = React.useState(false)
    const [query, setQuery] = React.useState("")
    const dispatch = useAppDispatch()
    const { } = useArchive({ dispatch, query })
    const handleChange = (e: any) => {
        setOpen(true)
        setFile(e.target.files[0])
    }
    return (
        <div>

        </div>
    )
}


export default Archive
