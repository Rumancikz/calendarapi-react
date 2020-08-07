import React from 'react'

export default function EditButton(props) {
    return (
        <>
        <button type='button' onClick={() => {
            props.handleClickOpen(true)
            props.setIsFormShown(false)
            props.setIsAddShown(true)
        }
        }>Edit Event</button>
        </>
    )
}