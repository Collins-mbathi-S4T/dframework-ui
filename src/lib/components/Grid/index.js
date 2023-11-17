import Button from '@mui/material/Button';
import React, { useMemo, useEffect, memo, useRef, useState } from 'react';
import {
    DataGridPremium,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExportContainer,
    getGridDateOperators,
    GRID_CHECKBOX_SELECTION_COL_DEF,
    GridActionsCellItem,
    useGridApiRef
} from '@mui/x-data-grid-premium';
import DeleteIcon from '@mui/icons-material/Delete';
import UnfoldMoreTwoToneIcon from '@mui/icons-material/UnfoldMoreTwoTone';
import CopyIcon from '@mui/icons-material/FileCopy';
import EditIcon from '@mui/icons-material/Edit';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { useSnackbar, DialogComponent } from '@durlabh/dfamework-ui';
import Menu from '@mui/material/Menu';
import { getList, getRecord, deleteRecord, saveRecord } from './crud-helper';
import PropTypes from 'prop-types';
import { Footer } from './footer';
import { useRouter } from '../useRouter/useRouter'
import template from './template'


const defaultPageSize = 10;
const sortRegex = /(\w+)( ASC| DESC)?/i;

const actionTypes = {
    Copy: "Copy",
    Edit: "Edit",
    Delete: "Delete"
};
const constants = {
    gridFilterModel: { items: [], logicOperator: 'and', quickFilterValues: Array(0), quickFilterLogicOperator: 'and' },
    permissions: { edit: true, add: true, export: false, delete: true, clearFilterText: "CLEAR THIS FILTER" },
}

const gridColumnTypes = {
    "radio": {
        "type": "singleSelect",
        "valueOptions": "lookup"
    },
    "select": {
        "type": "singleSelect",
        "valueOptions": "lookup"
    }
}

const convertDefaultSort = (defaultSort) => {
    const orderBy = [];
    if (typeof defaultSort === 'string') {
        const sortFields = defaultSort.split(',');
        for (const sortField of sortFields) {
            sortRegex.lastIndex = 0;
            const sortInfo = sortRegex.exec(sortField);
            if (sortInfo) {
                const [, field, direction = 'ASC'] = sortInfo;
                orderBy.push({ field: field.trim(), sort: direction.trim().toLowerCase() });
            }
        }
    }
    return orderBy;
};

const ExportMenuItem = ({ handleExport, contentType, type }) => {
    return (
        <MenuItem
            onClick={handleExport}
            data-type={type}
            data-content-type={contentType}
        >
            "Export" {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
        </MenuItem>
    );
};

ExportMenuItem.propTypes = {
    hideMenu: PropTypes.func
};

const CustomExportButton = (props) => (
    <GridToolbarExportContainer {...props}>
        <ExportMenuItem {...props} type="csv" contentType="text/csv" />
        <ExportMenuItem {...props} type="excel" contentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
        <ExportMenuItem {...props} type="xml" contentType="text/xml" />
        <ExportMenuItem {...props} type="html" contentType="text/html" />
        <ExportMenuItem {...props} type="json" contentType="application/json" />
    </GridToolbarExportContainer>
);

/*
    model:
    {
        title: 'Market',
        module: 'market',
        defaultSort: 'MarketName ASC',
        columns: [
            { field: 'MarketName', headerName: 'Market', width: 200, headerFilter: true },
            { field: 'Classification', headerName: 'Classification', width: 200, headerFilter: true },
        ],
        api: 'market',
        useLinkColumn: true,
        linkColumn: 'MarketName',
        readOnly: true,
    }

*/

const areEqual = (prevProps = {}, nextProps = {}) => {
    let equal = true;
    for (const o in prevProps) {
        if (prevProps[o] !== nextProps[o]) {
            equal = false;
            console.error({ o, prev: prevProps[o], next: nextProps[o] });
        }
    }
    for (const o in nextProps) {
        if (!prevProps.hasOwnProperty(o)) {
            equal = false;
            console.error({ o, prev: prevProps[o], next: nextProps[o] });
        }
    }
    return equal;
}


const GridBase = memo(({
    useLinkColumn = true,
    model,
    columns,
    api,
    defaultSort,
    setActiveRecord,
    parentFilters,
    parent,
    where,
    title,
    showModal,
    OrderModal,
    permissions = constants.permissions,
    selected,
    assigned,
    available,
    onAssignChange,
    customStyle,
    onCellClick,
    showRowsSelected,
    gridFooter = model.gridFooter || Footer,
    advanceFilter,
    closeDialog,
    selectedId
}) => {
    const [paginationModel, setPaginationModel] = useState({ pageSize: defaultPageSize, page: 0 });
    const [data, setData] = useState({ recordCount: 0, records: [], lookups: {} });
    const [isLoading, setIsLoading] = useState(false);
    const forAssignment = !!onAssignChange;
    const rowsSelected = showRowsSelected;
    const [selection, setSelection] = useState([]);
    const [isOrderDetailModalOpen, setIsOrderDetailModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [visibilityModel, setVisibilityModel] = useState({ CreatedOn: false, CreatedByUser: false, ...model?.columnVisibilityModel });
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [record, setRecord] = useState(null);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const snackbar = useSnackbar()
    const isClient = model.isClient === true ? 'client' : 'server';
    const [errorMessage, setErrorMessage] = useState('');
    const [sortModel, setSortModel] = useState(convertDefaultSort(defaultSort || model?.defaultSort));
    const initialFilterModel = { items: [], logicOperator: 'and', quickFilterValues: Array(0), quickFilterLogicOperator: 'and' }
    if (model.defaultFilters) {
        initialFilterModel.items = [];
        model.defaultFilters.forEach((ele) => {
            initialFilterModel.items.push(ele);
        })
    }
    const [filterModel, setFilterModel] = useState(initialFilterModel);
    const { pathname, navigate } = useRouter()
    const apiRef = useGridApiRef();
    const { idProperty = "id" } = model;
    const isReadOnly = model.readOnly === true;
    const dataRef = useRef(data);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const prevIsLoading = useRef(isLoading);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const open = Boolean(anchorEl);

    useEffect(() => {
        dataRef.current = data;
    }, [data]);
    const lookupOptions = ({ row, field, id, ...others }) => {
        const lookupData = dataRef.current.lookups || {};
        return lookupData[lookupMap[field].lookup] || [];
    };
    const { gridColumns, pinnedColumns, lookupMap } = useMemo(() => {
        const baseColumnList = columns || model?.gridColumns || model?.columns;
        const pinnedColumns = { left: [GRID_CHECKBOX_SELECTION_COL_DEF.field], right: [] };
        const finalColumns = [];
        const lookupMap = {};
        for (const column of baseColumnList) {
            const overrides = {};
            if (column.headerName === null) {
                continue;
            }
            if (parent && column.lookup === parent) {
                continue;
            }
            if (column.type === 'oneToMany') {
                if (column.countInList === false) {
                    continue;
                }
                overrides.type = 'number';
                overrides.field = column.field.replace(/s$/, 'Count');
            }

            if (gridColumnTypes[column.type]) {
                Object.assign(overrides, gridColumnTypes[column.type]);
            }
            if (overrides.valueOptions === "lookup") {
                overrides.valueOptions = lookupOptions;
            }
            if (column.linkTo) {
                overrides.cellClassName = "mui-grid-linkColumn";
            }
            finalColumns.push({ headerName: column.headerName || column.label, ...column, ...overrides });
            if (column.pinned) {
                pinnedColumns[column.pinned === 'right' ? 'right' : 'left'].push(column.field);
            }
            lookupMap[column.field] = column;
            column.label = column?.label
        }

        const auditColumns = model.standard === true;

        if (auditColumns && model?.addCreatedModifiedColumns !== false && model?.addHeaderFilters !== false) {
            finalColumns.push(
                {
                    field: "CreatedOn", type: "dateTime", headerName: "Created On", width: 200, filterOperators: getGridDateOperators()
                },
                { field: "CreatedByUser", type: "string", headerName: "Created By", width: 200 },
                {
                    field: "ModifiedOn", type: "dateTime", headerName: "Modified On", width: 200, filterOperators: getGridDateOperators()
                },
                { field: "ModifiedByUser", type: "string", headerName: "Modified By", width: 200 }
            );
        }


        const showActions = model?.addHeaderFilters !== false;
        if (showActions && !forAssignment && !isReadOnly) {
            const actions = [];
            if (model.addEdit && permissions.edit) {
                actions.push(<GridActionsCellItem icon={<EditIcon />} data-action={actionTypes.Edit} label="Edit" />);
            }
            if (model.addCopy && permissions.add) {
                actions.push(<GridActionsCellItem icon={<CopyIcon />} data-action={actionTypes.Copy} label="Copy" />);
            }
            if (model.delete && permissions.delete) {
                actions.push(<GridActionsCellItem icon={<DeleteIcon />} data-action={actionTypes.Delete} label="Delete" />);
            }
            if (actions.length > 0) {
                finalColumns.push({
                    field: 'actions',
                    type: 'actions',
                    label: '',
                    width: actions.length * 50,
                    getActions: () => actions,
                });
            }
            pinnedColumns.right.push('actions');
        } else {
            if (!model.noOptionButton) {
                finalColumns.push({
                    field: 'actions',
                    width: 1,
                    headerName: '',
                    renderCell: (cellParams) => (
                        <>
                            <MoreVertTwoToneIcon onClick={(event) => {
                                setSelectedRecord(cellParams.row);
                                handleClick(event);
                            }} />
                        </>
                    ),
                });
            }

        }
        return { gridColumns: finalColumns, pinnedColumns, lookupMap };
    }, [columns, model, parent, permissions, forAssignment]);
    const fetchData = (action = "list", extraParams = {}, contentType, columns) => {
        const { pageSize, page } = paginationModel;
        if (assigned || available) {
            extraParams[assigned ? "include" : "exclude"] = Array.isArray(selected) ? selected.join(',') : selected;
        }

        if (advanceFilter) {
            extraParams["advanceFilter"] = advanceFilter;
        }

        if (advanceFilter = [] && model.fetchId) {
            advanceFilter = [{
                field: "RoleId",
                operator: "equals",
                type: "number",
                value: Number(selectedId)
            }]
            extraParams["advanceFilter"] = advanceFilter;
        }
        getList({
            action,
            page: !contentType ? page : 0,
            pageSize: !contentType ? pageSize : 1000000,
            sortModel,
            filterModel,
            controllerType: model?.controllerType,
            api: api || model?.api,
            setIsLoading,
            setData,
            gridColumns,
            modelConfig: model,
            parentFilters,
            extraParams,
            setError: snackbar.showError,
            contentType,
            columns
        });
    };
    const openForm = (id, { mode } = {}) => {
        if (setActiveRecord) {
            getRecord({ id, api: api || model?.api, setIsLoading, setActiveRecord, modelConfig: model, parentFilters, where });
            return;
        }
        let path = pathname;
        if (!path.endsWith("/")) {
            path += "/";
        }
        if (mode === "copy") {
            path += "0-" + id;
        } else {
            path += id;
        }
        navigate(path);
    };
    const onCellClickHandler = async (cellParams, event, details) => {
        if (!isReadOnly) {
            if (onCellClick) {
                const result = await onCellClick({ cellParams, event, details });
                if (typeof result !== "boolean") {
                    return;
                }
            }
            const { row: record } = cellParams;
            const columnConfig = lookupMap[cellParams.field] || {};
            if (columnConfig.linkTo) {
                navigate({
                    pathname: template.replaceTags(columnConfig.linkTo, record)
                });
                return;
            }
            let action = useLinkColumn && cellParams.field === model.linkColumn ? actionTypes.Edit : null;
            if (!action && cellParams.field === 'actions') {
                action = details?.action;
                if (!action) {
                    const el = event.target.closest('button');
                    if (el) {
                        action = el.dataset.action;
                    }
                }
            }
            if (action === actionTypes.Edit) {
                return openForm(record[idProperty]);
            }
            if (action === actionTypes.Copy) {
                return openForm(record[idProperty], { mode: 'copy' });
            }
            if (action === actionTypes.Delete) {
                setIsDeleting(true);
                setRecord({ name: record[model?.linkColumn], id: record[idProperty] });
            }
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = async function () {
        const result = await deleteRecord({ id: record?.id, api: api || model?.api, setIsLoading, setError: snackbar.showError, setErrorMessage });
        if (result === true) {
            setIsDeleting(false);
            snackbar.showMessage('Record Deleted Successfully.');
            fetchData();
        } else {
            setTimeout(() => {
                setIsDeleting(false);
            }, 200);
        }
    }
    const clearError = () => {
        setErrorMessage(null);
        setIsDeleting(false);
    };
    const handleCloseOrderDetailModal = () => {
        setIsOrderDetailModalOpen(false);
        setSelectedOrder(null);
        fetchData();
    };
    const onCellDoubleClick = (event) => {
        if (model.showModal) {
            setIsOrderDetailModalOpen(true);
            const { row } = event;
            setSelectedOrder(row);
        } else {
            if (!isReadOnly && model.addHeaderFilters !== false) {
                const { row: record } = event;
                openForm(record[idProperty]);
            }
            return null;
        }
    };

    const onAdd = () => {
        openForm(0);
    };

    const clearFilters = () => {
        setFilterModel(constants.gridFilterModel);
    }
    const updateAssignment = ({ unassign, assign }) => {
        const assignedValues = Array.isArray(selected) ? selected : (selected.length ? selected.split(',') : []);
        const finalValues = unassign ? assignedValues.filter(id => !unassign.includes(parseInt(id))) : [...assignedValues, ...assign];
        onAssignChange(typeof selected === 'string' ? finalValues.join(',') : finalValues);
    }

    const onAssign = () => {
        updateAssignment({ assign: selection });
    }

    const onUnassign = () => {
        updateAssignment({ unassign: selection });
    }

    const CustomToolbar = function (props) {

        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                {(isReadOnly || (!permissions.add && !forAssignment)) && <Typography variant="h6" component="h3" textAlign="center" sx={{ ml: 1 }} > {isReadOnly ? "" : model.title}</Typography>}
                {model.addForm && !forAssignment && permissions.add && !isReadOnly && <Button startIcon={<AddIcon />} onClick={onAdd} size="small">{model?.customAddTextTitle ? model.customAddTextTitle : `${"Add"} ${model.title}`}</Button>}
                {available && <Button startIcon={<AddIcon />} onClick={onAssign} size="small">"Assign"</Button>}
                {assigned && <Button startIcon={<RemoveIcon />} onClick={onUnassign} size="small">"Remove"</Button>}

                <GridToolbarContainer {...props}>
                    <GridToolbarColumnsButton />
                    <GridToolbarFilterButton />
                    <Button startIcon={<FilterListOffIcon />} onClick={clearFilters} size="small">Clear Filters</Button>
                    {permissions.export && (
                        <CustomExportButton handleExport={handleExport} />
                    )}
                </GridToolbarContainer>
            </div >
        );
    };

    const getGridRowId = (row) => {
        return row[idProperty];
    };

    const closingDialog = () => {
        setIsEdit(false);
    };


    const handleExport = (e) => {
        const { orderedFields, columnVisibilityModel, lookup } = apiRef.current.state.columns;
        const columns = {};
        const hiddenColumns = Object.keys(columnVisibilityModel).filter(key => columnVisibilityModel[key] === false);
        const visibleColumns = orderedFields.filter(ele => !hiddenColumns?.includes(ele) && ele !== '__check__' && ele !== 'actions');
        if (visibleColumns?.length === 0) {
            snackbar.showMessage('You cannot export while all columns are hidden... please show at least 1 column before exporting');
            return;
        }
        visibleColumns.forEach(ele => {
            columns[ele] = { field: ele, width: lookup[ele].width, headerName: lookup[ele].headerName, type: lookup[ele].type, keepLocal: lookup[ele].keepLocal === true };
        })
        fetchData(undefined, undefined, e.target.dataset.contentType, columns);
    };

    useEffect(() => {
        fetchData()
    }, [paginationModel, sortModel, filterModel, api, gridColumns, model, parentFilters, assigned, selected, available, advanceFilter]);

    // useEffect(
    //     fetchData,
    //     [paginationModel, sortModel, filterModel, api, gridColumns, model, parentFilters, assigned, selected, available]
    // );

    // useEffect(() => {
    //     if (forAssignment) {
    //         return;
    //     }
    //     dispatch({ type: actions.SET_PAGE_TITLE_DETAILS, pageTitleDetails: <PageTitle icon="" titleHeading={model?.pageTitle || model?.title} titleDescription={model?.titleDescription} title={model?.title} /> });
    // }, [])

    // useEffect(() => {
    //     let backRoute = location.pathname;
    //     backRoute = backRoute.split("/");
    //     backRoute.pop();
    //     backRoute = backRoute.join("/");
    //     dispatch({
    //         type: actions.SET_PAGE_BACK_BUTTON,
    //         pageBackButton: { status: true, backRoute: backRoute },
    //     });
    // }, []);
    const customStyles = {
        '.MuiDataGrid-root.no-hover .MuiDataGrid-row:hover': {
            backgroundColor: 'transparent !important',
        },
        '.custom-data-grid .MuiDataGrid-mainGrid': {
            overflow: 'hidden !important'
        }
    };

    const handleMenuDelete = (record) => {
        setIsDeleting(true);
        setRecord({ name: record[model?.linkColumn], id: record[idProperty] });
    };

    const handleMenuEdit = (record) => {
        setIsEdit(true);
        setRecord({ name: record[model?.linkColumn], id: record[idProperty] });
    };

    const ActionMenuItem = ({ actionType, handler, children }) => (
        <MenuItem className="actionMenuItem" data-action={actionType} onClick={handler}>
            {children}
        </MenuItem>
    );

    const processRowUpdate = (updatedRow) => {
        setIsLoading(true);
        saveRecord({
            id: updatedRow[idProperty],
            api: api || model?.api,
            values: updatedRow,
            setIsLoading,
            setError: snackbar?.showError
        })
            .then(success => {
                if (success) {
                    snackbar?.showMessage('Record Updated Successfully.');
                }
            })
            .finally(() => setIsLoading(false));
        return updatedRow
    }

    return (
        <div style={customStyles}>
            <DataGridPremium
                disableColumnMenu={!model.addHeaderFilters}
                unstable_headerFilters={model.addHeaderFilters !== false}
                checkboxSelection={forAssignment}
                loading={isLoading}
                className="pagination-fix"
                onCellClick={onCellClickHandler}
                onCellDoubleClick={onCellDoubleClick}
                columns={gridColumns}
                paginationModel={paginationModel}
                pageSizeOptions={[5, 10, 20, 50, 100]}
                onPaginationModelChange={setPaginationModel}
                pagination
                rowCount={data.recordCount}
                rows={data.records}
                sortModel={sortModel}
                paginationMode={isClient}
                sortingMode={isClient}
                filterMode={isClient}
                keepNonExistentRowsSelected
                onSortModelChange={setSortModel}
                onFilterModelChange={setFilterModel}
                rowSelection={selection}
                processRowUpdate={processRowUpdate}
                onRowSelectionModelChange={setSelection}
                filterModel={filterModel}
                getRowId={getGridRowId}
                slots={{
                    headerFilterMenu: model.addHeaderFilters !== false ? false : null,
                    columnMenu: model.addHeaderFilters ? undefined : () => null,
                    columnSortedDescendingIcon: model.addHeaderFilters ? UnfoldMoreTwoToneIcon : () => null,
                    columnSortedAscendingIcon: model.addHeaderFilters ? UnfoldMoreTwoToneIcon : () => null,
                    columnUnsortedIcon: model.addHeaderFilters ? UnfoldMoreTwoToneIcon : () => null,
                    footer: gridFooter,
                    ...(model.addHeaderFilters ? { toolbar: CustomToolbar } : {})
                }}
                slotProps={{
                    footer: {
                        pagination: true,
                        apiRef,
                        rowCount: data.recordCount

                    },
                    panel: {
                        placement: "bottom-end"
                    },
                }}
                hideFooterSelectedRowCount={rowsSelected}
                density={model.addHeaderFilters ? "compact" : "standard"}
                disableDensitySelector={true}
                apiRef={apiRef}
                disableAggregation={true}
                disableRowGrouping={true}
                autoHeight
                initialState={{
                    columns: {
                        columnVisibilityModel: visibilityModel
                    },
                    pinnedColumns: pinnedColumns
                }}
            />
            {isOrderDetailModalOpen && selectedOrder && model.OrderModal && (
                <model.OrderModal
                    orderId={selectedOrder.OrderId}
                    isOpen={true}
                    orderTotal={selectedOrder.OrderTotal}
                    orderDate={selectedOrder.OrderDateTime}
                    orderStatus={selectedOrder.OrderStatus}
                    customerNumber={selectedOrder.CustomerPhoneNumber}
                    customerName={selectedOrder.CustomerName}
                    customerEmail={selectedOrder.CustomerEmailAddress}
                    onClose={handleCloseOrderDetailModal}
                />
            )}
            {errorMessage && (<DialogComponent open={!!errorMessage} onConfirm={clearError} onCancel={clearError} title="Info" hideCancelButton={true} > {errorMessage}</DialogComponent>)
            }
            {isDeleting && !errorMessage && (<DialogComponent open={isDeleting} onConfirm={handleDelete} onCancel={() => setIsDeleting(false)} title="Confirm Delete"> {`${'Are you sure you want to delete'} ${record?.name}?`}</DialogComponent>)}
            {isEdit && (<DialogComponent open={isEdit} onConfirm={handleDelete} onCancel={() => setIsEdit(false)} title="Edit Form" hideButtons={true}><model.Form ids={String(record.id)} closeDialog={closingDialog} /></DialogComponent>)}
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        marginLeft: '-30px',
                        marginTop: '-10px',
                        backgroundColor: '#5460B4',
                        color: '#FFFFFF',
                        '& .MuiAvatar-root': {
                            width: 35,
                            height: 35,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            right: 0,
                            top: 35,
                            width: 12,
                            height: 12,
                            bgcolor: '#5460B4',
                            transform: 'translateX(50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'center' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'center' }}
            >
                <ActionMenuItem actionType={actionTypes.Edit} handler={() => handleMenuEdit(selectedRecord)}>Edit</ActionMenuItem>
                <ActionMenuItem actionType={actionTypes.Delete} handler={() => handleMenuDelete(selectedRecord)}>Delete</ActionMenuItem>
            </Menu>
        </div >
    );
}, areEqual);

export default GridBase;