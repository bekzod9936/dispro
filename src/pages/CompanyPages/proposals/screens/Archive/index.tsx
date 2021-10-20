import React from "react"

const Archive = () => {
    const [file, setFile] = React.useState()
    const [open, setOpen] = React.useState(false)
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
