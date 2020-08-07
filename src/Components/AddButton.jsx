import React from 'react'
import AddEditButton from './AddEditForm';
import { render } from 'react-dom';
import FormDialog from './Dialog'

export default function AddButton(props) {

    return (
        <React.Fragment>
        <button type='button' onClick={() => {
            props.setIsAddShown(false)
            props.setIsFormShown(false)
            // addEditfunction()
            }}>Add Event</button>
        </React.Fragment>
    )
}
