import React from 'react';
import { FormHelperText, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Field = ({ column, field, fieldLabel, formik, activeRecord, otherProps, classes, onChange, lookups }) => {
    const options = lookups ? lookups[column?.lookup] : [];
    let inputValue = formik.values[field];

    if (column.multiSelect) {
        if (!inputValue || inputValue.length === 0) {
            inputValue = [];
        } else {
            if (!Array.isArray(inputValue)) {
                inputValue = inputValue.split(',').map((e) => parseInt(e));
            }
        }
    }

    if (column.modifiedLabel) {
        return (
            <FormControl
                sx={{ marginRight: '.9rem' }}
                fullWidth
                key={field}>
                <InputLabel sx={{ margin: '0.9rem 2rem 1.5rem 0rem', position: 'absolute', zIndex: '1', transform: 'translate(14px, -9px) scale(0.75)' }}>{column.label}</InputLabel>
                <Select
                    IconComponent={KeyboardArrowDownIcon}
                    {...otherProps}
                    name={field}
                    placeholder='Select'
                    multiple={column.multiSelect === true}
                    readOnly={column.readOnly === true}
                    value={inputValue}
                    renderValue={selected => {
                        if (Array.isArray(selected)) {
                            return selected.map(value => {
                                const option = options.find(option => option.value === value);
                                return option ? option.label : 'Select';
                            }).join(', ');
                        } else {
                            const selectedOption = options.find(option => option.value === selected);
                            return selectedOption ? selectedOption.label : 'Select';
                        }
                    }}
                    sx={{ width: '337px', backgroundColor: 'transparent !important', paddingTop: '.9rem', height: '3.313rem' }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    {Array.isArray(options) && options.map(option => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
                </Select>
                <FormHelperText>{formik.touched[field] && formik.errors[field]}</FormHelperText>
            </FormControl>
        );
    } else {
        return (
            <FormControl
                fullWidth
                key={field}
                variant="standard">
                <InputLabel>{fieldLabel}</InputLabel>
                <Select
                    IconComponent={KeyboardArrowDownIcon}
                    {...otherProps}
                    name={field}
                    multiple={column.multiSelect === true}
                    readOnly={column.readOnly === true}
                    value={inputValue}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    {Array.isArray(options) && options.map(option => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
                </Select>
                <FormHelperText>{formik.touched[field] && formik.errors[field]}</FormHelperText>
            </FormControl>
        );
    }
};

export default Field;
