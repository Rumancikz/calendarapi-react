import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';

export default function Login(props) {
    const [ username, setUsername ] = useState("")
    const handleChange = (event) => {
        setUsername(event.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        props.handleUsernameSubmit(username)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                Login - 
                <TextField value={username} onChange={handleChange} />
                <input
                    type="submit"  
                    value="Submit" 
                    color="primary"
                />
            </form>
        </div>
    )
}
