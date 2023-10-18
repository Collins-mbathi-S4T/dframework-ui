import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { InputLabel } from "@mui/material";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

const Field = ({ column, field, fieldLabel, formik, otherProps, classes }) => {
    const [timePeriod, setTimePeriod] = useState("AM");
    const [time, setTime] = useState(null);

    const handleRadioChange = (event) => {
        setTimePeriod(event.target.value);
        updateFormikTime(time, event.target.value);
    };

    const handleTimeChange = (newTime) => {
        setTime(newTime);
        updateFormikTime(newTime, timePeriod);
    };

    const updateFormikTime = (timeValue, period) => {
        if (timeValue) {
            const hours = timeValue.hour();
            const minutes = timeValue.minute();
            formik.setFieldValue(
                field,
                `${hours}:${minutes.toString().padStart(2, "0")} ${period}`
            );
        }
    };

    if (column.modifiedLabel) {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <InputLabel
                        sx={{
                            margin: "1.8rem 2rem 2.5rem 0rem",
                            position: "absolute",
                            zIndex: "1",
                            transform: "translate(14px, -9px) scale(0.75)",
                        }}
                    >
                        {column.label}
                    </InputLabel>
                    <DesktopTimePicker
                        variant="standard"
                        value={time}
                        onChange={handleTimeChange}
                        ampm={false}
                        sx={{
                            "& .MuiOutlinedInput-input": {
                                padding: "1.65625rem 0.875rem 0.59375rem 0.875rem !important",
                            },
                            "& .css-4i5lc0-MuiInputBase-input-MuiOutlinedInput-input": {
                                background: "#364072",
                            },
                            "& .css-zh6go5-MuiInputBase-root-MuiOutlinedInput-root": {
                                background: "#364072",
                            },
                            "& .css-1k8vz0v-MuiList-root-MuiMultiSectionDigitalClockSection-root":
                            {
                                background: "#364072",
                            },
                        }}
                        components={{
                            OpenPickerIcon: KeyboardArrowDownIcon,
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="select"
                                sx={{
                                    width: "300px",
                                    marginRight: "1rem",
                                    backgroundColor: "#364072 !important",
                                    "& .css-4i5lc0-MuiInputBase-input-MuiOutlinedInput-input": {
                                        background: "#364072",
                                    },
                                    "& .css-zh6go5-MuiInputBase-root-MuiOutlinedInput-root": {
                                        background: "#364072",
                                    },
                                }}
                            />
                        )}
                    />
                    <FormControl component="fieldset">
                        <RadioGroup
                            value={timePeriod}
                            onChange={handleRadioChange}
                            style={{
                                flexDirection: "row",
                                marginLeft: "2.9rem",
                                flexWrap: "nowrap",
                            }}
                        >
                            <FormControlLabel
                                value="AM"
                                control={<Radio checked={timePeriod === "AM"} />}
                                label="AM"
                            />
                            <FormControlLabel
                                value="PM"
                                control={<Radio checked={timePeriod === "PM"} />}
                                label="PM"
                            />
                        </RadioGroup>
                    </FormControl>
                </LocalizationProvider>
            </div>
        );
    } else {
        let inputValue = formik.values[field];
        if (column.isUtc) {
            inputValue = dayjs.utc(inputValue).utcOffset(dayjs().utcOffset(), true).format();
        }
        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                    {...otherProps}
                    variant="standard"
                    readOnly={column?.readOnly === true}
                    key={field}
                    fullWidth
                    name={field}
                    value={inputValue}
                    onChange={(value) => {
                        if (column.isUtc) {
                            value = (value && value.isValid()) ? value.format('YYYY-MM-DDTHH:mm:ss') + '.000Z' : null;
                        }
                        return formik.setFieldValue(field, value);
                    }}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched[field] && formik.errors[field]}
                    renderInput={(params) => {
                        const props = { ...params, variant: "standard" };
                        return <TextField
                            {...props}
                            helperText={formik.errors[field]}
                            fullWidth />
                    }}
                />
            </LocalizationProvider>
        );
    }
};

export default Field;
