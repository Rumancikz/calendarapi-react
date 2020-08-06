import React from 'react'
import {useInput} from '../Hook/useInputHook'
import FormDialog from './Dialog'

export default function EditButton(props) {
    return (
        <>
        <button type='button' onClick={() => {
            // let's differentiate new and edit with a bool
            props.handleClickOpen(true)
            props.setIsFormShown(false)
            props.setIsAddShown(true)
        }
        }>Edit Event</button>
        </>
    )
}
