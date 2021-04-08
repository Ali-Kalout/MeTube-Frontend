import React from 'react';
import { TextField } from "@material-ui/core";

const Input = ({ name, handleChange, label, value }) => {
    return (
        <TextField className="mt-1 mb-1" value={value} name={name} onChange={handleChange} variant="outlined" fullWidth label={label} />
    );
}

export default Input;