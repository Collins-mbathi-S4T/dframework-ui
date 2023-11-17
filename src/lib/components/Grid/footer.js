
import {
    GridFooterContainer,
    GridFooter
} from '@mui/x-data-grid-premium';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React,{ useEffect, useState } from 'react';

const Footer = ({ pagination, apiRef }) => {
    const page = apiRef.current.state.pagination.paginationModel.page;
    const rowsPerPage = apiRef.current.state.pagination.paginationModel.pageSize;
    const [pageNumber, setPageNumber] = useState(page + 1);

    const handleChange = function (e) {
        let value = e.target?.value;

        if (value === '') {
            setPageNumber('');
        } else {
            value = parseInt(value);
            value = isNaN(value) || value < 1 ? 1 : value;
            setPageNumber(value);
        }
    }

    useEffect(() => {
        setPageNumber(page + 1);
    }, [page, rowsPerPage]);

    const onPageChange = function () {
        let targetPage = pageNumber === '' ? 1 : pageNumber;
        targetPage = Math.max(targetPage, 1);
        apiRef.current.setPage(targetPage - 1);
        if (pageNumber === '') {
            setPageNumber(1);
        }
    }
    const handleKeyPress = (event) => {
        const keyCode = event.which || event.keyCode;
        const keyValue = String.fromCharCode(keyCode);
        if (!/\d/.test(keyValue)) event.preventDefault();
    }

    return (
        <GridFooterContainer>
            <Box sx={{ pl: 5 }}>
                {pagination &&
                    <>
                        <Typography variant="p">Jump to page:</Typography>
                        <TextField
                            sx={{ width: 70, pl: 1 }}
                            variant="standard"
                            type='number'
                            min={1}
                            value={pageNumber}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                        />
                        <Button size='small' onClick={onPageChange}>Go</Button>
                    </>
                }
            </Box>
            <GridFooter />
        </GridFooterContainer>
    );
}
export { Footer };