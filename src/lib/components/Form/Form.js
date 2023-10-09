import React from 'react';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { getRecord, saveRecord, deleteRecord } from '../Grid/crud-helper';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Box } from "@mui/material";
import Stack from '@mui/material/Stack';
import FormLayout from './field-mapper';
import { useSnackbar } from '../SnackBar';
import { DialogComponent } from '../Dialog';
import { useRouter } from '../useRouter/useRouter';

const Form = ({
    model,
    api,
    permissions = { edit: true, export: true, delete: true },
    Layout = FormLayout,
    ids
}) => {
    const { navigate, getParams } = useRouter()
    const defaultFieldConfigs = {} 
    const { id: idFromQuery } = getParams;
    const idWithOptions = idFromQuery || ids;
    const id = idWithOptions?.split('-')[0]
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [lookups, setLookups] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const snackbar = useSnackbar()
    const combos = {}
    const [validationSchema, setValidationSchema] = useState(null);

    const fieldConfigs = model?.applyFieldConfig ? model?.applyFieldConfig({ data, lookups }) : defaultFieldConfigs;

    useEffect(() => {
        setValidationSchema(model.getValidationSchema({ id, snackbar }));
        const options = idWithOptions?.split('-');
        try {
            getRecord({
                id: options.length > 1 ? options[1] : options[0],
                modelConfig: model,
                setIsLoading,
                setError: errorOnLoad,
                setActiveRecord
            })
        } catch (error) {
            snackbar?.showMessage('An error occured, please try after some time.');
            // navigate('./');
        }
    }, [id, idWithOptions, model]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: { ...model.initialValues, ...data },
        validationSchema: validationSchema,
        validateOnBlur: false,
        onSubmit: (values, { resetForm }) => {
            setIsLoading(true);
            saveRecord({
                id,
                api: api || model?.api,
                values,
                setIsLoading,
                setError: snackbar?.showError
            })
                .then(success => {
                    if (success) {
                        snackbar?.showMessage('Record Updated Successfully.');
                        // navigate('./');
                    }
                })
                .finally(() => setIsLoading(false));
        }
    });

    const errorOnLoad = function (title, error) {
        snackbar?.showError(title, error);
        // navigate('./');
    }

    const setActiveRecord = function ({ id, title, record, lookups }) {
        const isCopy = idWithOptions.indexOf("-") > -1;
        const isNew = !id || id === "0";
        const localTitle = isNew ? "Create" : (isCopy ? "Copy" : "Edit");
        const localValue = isNew ? "" : record[model.linkColumn];
        const breadcrumbs = [{ text: model?.title }, { text: localTitle }];

        if (isCopy) {
            record[model.linkColumn] += " (Copy)";
        }
        setData(record);
        setLookups(lookups);

        if (localValue !== "") {
            breadcrumbs.push({ text: localValue });
        }
    }
    const handleFormCancel = function () {
        navigate('./');
    }
    const handleDelete = async function () {
        setIsDeleting(true);
        try {
            const response = await deleteRecord({
                id,
                api: api || model?.api,
                setIsLoading,
                setError: snackbar?.showError
            })
            if (response) {
                snackbar?.showMessage('Record Deleted Successfully.');
                navigate('./');
            }
        } catch (error) {
            snackbar?.showError('An error occured, please try after some time.');
        }
    }
    const handleChange = function (e) {
        const { name, value } = e.target;
        const gridData = { ...data };
        gridData[name] = value;
        setData(gridData);
    }
    const actionButtons = [{ text: 'Reset', variant: 'outlined', color: 'primary' }, { text: 'Add', variant: 'contained', color: 'success' }]
    const content = (
        <>
            <form>
                <Stack direction="row" spacing={2} justifyContent="flex-end" mb={1}>
                    {permissions.edit && model.addHeaderFilters !== false && (
                        <Button variant="contained" type="submit" color="success" onClick={formik.handleSubmit}>
                            Save
                        </Button>
                    )}
                    {model.addHeaderFilters !== false && (
                        <Button variant="contained" type="cancel" color="error" onClick={handleFormCancel}>
                            Cancel
                        </Button>
                    )}
                    {permissions.delete && model.addHeaderFilters !== false && (
                        <Button variant="contained" color="error" onClick={() => setIsDeleting(true)}>
                            Delete
                        </Button>
                    )}
                </Stack>
                <Layout model={model} formik={formik} data={data} fieldConfigs={fieldConfigs} combos={combos} onChange={handleChange} lookups={lookups} id={id} />
                <Box position='absolute' bottom={0} right={0} display='flex' justifyContent='flex-end' alignItems='center' marginBottom={'1.5rem'} marginTop={'10rem'} marginRight={'2.5rem'}>
                    {actionButtons.map((button, index) => {
                        return (
                            <Box key={index} ml={2} mt={4} >
                                <model.CustomButton buttonFunction={button.text === 'Add' ? formik.handleSubmit : handleFormCancel} buttonText={button.text} variant={button.variant} color={button.color} />
                            </Box>
                        )
                    })}
                </Box>
            </form>
            <DialogComponent open={isDeleting} onConfirm={handleDelete} onCancel={() => setIsDeleting(false)} title="Confirm Delete">
                {`Are you sure you want to delete ${data?.GroupName}?`}
            </DialogComponent>
        </>
    );
    return model.addHeaderFilters !== false ? (
        <Paper sx={{ padding: 2 }}>
            {content}
        </Paper>
    ) : content;


}
export default Form;