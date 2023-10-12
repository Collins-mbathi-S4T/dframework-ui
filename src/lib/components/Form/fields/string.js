import React from 'react';
import TextField from '@mui/material/TextField';

const Field = ({ column, field, fieldLabel, formik, otherProps, classes, onChange }) => {

    const commonProps = {
        type: "text",
        key: field,
        required: column?.required,
        name: field,
        value: formik.values[field],
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        error: formik.touched[field] && Boolean(formik.errors[field]),
        helperText: formik.touched[field] && formik.errors[field],
        ...otherProps
    };

    if (column.modifiedLabel) {
        return (
            <TextField
                id="filled-basic"
                variant="filled"
                placeholder="Enter"
                label={column.label}
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    readOnly: column?.readOnly === true,
                    disableUnderline: true
                }}
                sx={{ width: '337px' }}
                {...commonProps}
            />
        );
    } else {
        return (
            <TextField
                variant="standard"
                fullWidth
                InputProps={{
                    readOnly: column?.readOnly === true
                }}
                {...commonProps}
            />
        );
    }
};

export default Field;
