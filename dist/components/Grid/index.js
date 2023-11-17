"use strict";

require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.string.ends-with.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.parse-int.js");
require("core-js/modules/es.promise.finally.js");
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _react = _interopRequireWildcard(require("react"));
var _xDataGridPremium = require("@mui/x-data-grid-premium");
var _Delete = _interopRequireDefault(require("@mui/icons-material/Delete"));
var _UnfoldMoreTwoTone = _interopRequireDefault(require("@mui/icons-material/UnfoldMoreTwoTone"));
var _FileCopy = _interopRequireDefault(require("@mui/icons-material/FileCopy"));
var _Edit = _interopRequireDefault(require("@mui/icons-material/Edit"));
var _FilterListOff = _interopRequireDefault(require("@mui/icons-material/FilterListOff"));
var _MoreVertTwoTone = _interopRequireDefault(require("@mui/icons-material/MoreVertTwoTone"));
var _Add = _interopRequireDefault(require("@mui/icons-material/Add"));
var _Remove = _interopRequireDefault(require("@mui/icons-material/Remove"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
var _dfameworkUi = require("@durlabh/dfamework-ui");
var _Menu = _interopRequireDefault(require("@mui/material/Menu"));
var _crudHelper = require("./crud-helper");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _footer = require("./footer");
var _useRouter = require("../useRouter/useRouter");
var _template = _interopRequireDefault(require("./template"));
const _excluded = ["row", "field", "id"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const defaultPageSize = 10;
const sortRegex = /(\w+)( ASC| DESC)?/i;
const actionTypes = {
  Copy: "Copy",
  Edit: "Edit",
  Delete: "Delete"
};
const constants = {
  gridFilterModel: {
    items: [],
    logicOperator: 'and',
    quickFilterValues: Array(0),
    quickFilterLogicOperator: 'and'
  },
  permissions: {
    edit: true,
    add: true,
    export: false,
    delete: true,
    clearFilterText: "CLEAR THIS FILTER"
  }
};
const gridColumnTypes = {
  "radio": {
    "type": "singleSelect",
    "valueOptions": "lookup"
  },
  "select": {
    "type": "singleSelect",
    "valueOptions": "lookup"
  }
};
const convertDefaultSort = defaultSort => {
  const orderBy = [];
  if (typeof defaultSort === 'string') {
    const sortFields = defaultSort.split(',');
    for (const sortField of sortFields) {
      sortRegex.lastIndex = 0;
      const sortInfo = sortRegex.exec(sortField);
      if (sortInfo) {
        const [, field, direction = 'ASC'] = sortInfo;
        orderBy.push({
          field: field.trim(),
          sort: direction.trim().toLowerCase()
        });
      }
    }
  }
  return orderBy;
};
const ExportMenuItem = _ref => {
  let {
    handleExport,
    contentType,
    type
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    onClick: handleExport,
    "data-type": type,
    "data-content-type": contentType
  }, "\"Export\" ", type.charAt(0).toUpperCase() + type.slice(1).toLowerCase());
};
ExportMenuItem.propTypes = {
  hideMenu: _propTypes.default.func
};
const CustomExportButton = props => /*#__PURE__*/_react.default.createElement(_xDataGridPremium.GridToolbarExportContainer, props, /*#__PURE__*/_react.default.createElement(ExportMenuItem, _extends({}, props, {
  type: "csv",
  contentType: "text/csv"
})), /*#__PURE__*/_react.default.createElement(ExportMenuItem, _extends({}, props, {
  type: "excel",
  contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
})), /*#__PURE__*/_react.default.createElement(ExportMenuItem, _extends({}, props, {
  type: "xml",
  contentType: "text/xml"
})), /*#__PURE__*/_react.default.createElement(ExportMenuItem, _extends({}, props, {
  type: "html",
  contentType: "text/html"
})), /*#__PURE__*/_react.default.createElement(ExportMenuItem, _extends({}, props, {
  type: "json",
  contentType: "application/json"
})));

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

const areEqual = function areEqual() {
  let prevProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let nextProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let equal = true;
  for (const o in prevProps) {
    if (prevProps[o] !== nextProps[o]) {
      equal = false;
      console.error({
        o,
        prev: prevProps[o],
        next: nextProps[o]
      });
    }
  }
  for (const o in nextProps) {
    if (!prevProps.hasOwnProperty(o)) {
      equal = false;
      console.error({
        o,
        prev: prevProps[o],
        next: nextProps[o]
      });
    }
  }
  return equal;
};
const GridBase = /*#__PURE__*/(0, _react.memo)(_ref2 => {
  let {
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
    gridFooter = model.gridFooter || _footer.Footer,
    advanceFilter,
    closeDialog,
    selectedId
  } = _ref2;
  const [paginationModel, setPaginationModel] = (0, _react.useState)({
    pageSize: defaultPageSize,
    page: 0
  });
  const [data, setData] = (0, _react.useState)({
    recordCount: 0,
    records: [],
    lookups: {}
  });
  const [isLoading, setIsLoading] = (0, _react.useState)(false);
  const forAssignment = !!onAssignChange;
  const rowsSelected = showRowsSelected;
  const [selection, setSelection] = (0, _react.useState)([]);
  const [isOrderDetailModalOpen, setIsOrderDetailModalOpen] = (0, _react.useState)(false);
  const [selectedOrder, setSelectedOrder] = (0, _react.useState)(null);
  const [visibilityModel, setVisibilityModel] = (0, _react.useState)(_objectSpread({
    CreatedOn: false,
    CreatedByUser: false
  }, model === null || model === void 0 ? void 0 : model.columnVisibilityModel));
  const [isDeleting, setIsDeleting] = (0, _react.useState)(false);
  const [isEdit, setIsEdit] = (0, _react.useState)(false);
  const [record, setRecord] = (0, _react.useState)(null);
  const [selectedRecord, setSelectedRecord] = (0, _react.useState)(null);
  const snackbar = (0, _dfameworkUi.useSnackbar)();
  const isClient = model.isClient === true ? 'client' : 'server';
  const [errorMessage, setErrorMessage] = (0, _react.useState)('');
  const [sortModel, setSortModel] = (0, _react.useState)(convertDefaultSort(defaultSort || (model === null || model === void 0 ? void 0 : model.defaultSort)));
  const initialFilterModel = {
    items: [],
    logicOperator: 'and',
    quickFilterValues: Array(0),
    quickFilterLogicOperator: 'and'
  };
  if (model.defaultFilters) {
    initialFilterModel.items = [];
    model.defaultFilters.forEach(ele => {
      initialFilterModel.items.push(ele);
    });
  }
  const [filterModel, setFilterModel] = (0, _react.useState)(initialFilterModel);
  const {
    pathname,
    navigate
  } = (0, _useRouter.useRouter)();
  const apiRef = (0, _xDataGridPremium.useGridApiRef)();
  const {
    idProperty = "id"
  } = model;
  const isReadOnly = model.readOnly === true;
  const dataRef = (0, _react.useRef)(data);
  const [anchorEl, setAnchorEl] = _react.default.useState(null);
  const prevIsLoading = (0, _react.useRef)(isLoading);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  (0, _react.useEffect)(() => {
    dataRef.current = data;
  }, [data]);
  const lookupOptions = _ref3 => {
    let {
        row,
        field,
        id
      } = _ref3,
      others = _objectWithoutProperties(_ref3, _excluded);
    const lookupData = dataRef.current.lookups || {};
    return lookupData[lookupMap[field].lookup] || [];
  };
  const {
    gridColumns,
    pinnedColumns,
    lookupMap
  } = (0, _react.useMemo)(() => {
    const baseColumnList = columns || (model === null || model === void 0 ? void 0 : model.gridColumns) || (model === null || model === void 0 ? void 0 : model.columns);
    const pinnedColumns = {
      left: [_xDataGridPremium.GRID_CHECKBOX_SELECTION_COL_DEF.field],
      right: []
    };
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
      finalColumns.push(_objectSpread(_objectSpread({
        headerName: column.headerName || column.label
      }, column), overrides));
      if (column.pinned) {
        pinnedColumns[column.pinned === 'right' ? 'right' : 'left'].push(column.field);
      }
      lookupMap[column.field] = column;
      column.label = column === null || column === void 0 ? void 0 : column.label;
    }
    const auditColumns = model.standard === true;
    if (auditColumns && (model === null || model === void 0 ? void 0 : model.addCreatedModifiedColumns) !== false && (model === null || model === void 0 ? void 0 : model.addHeaderFilters) !== false) {
      finalColumns.push({
        field: "CreatedOn",
        type: "dateTime",
        headerName: "Created On",
        width: 200,
        filterOperators: (0, _xDataGridPremium.getGridDateOperators)()
      }, {
        field: "CreatedByUser",
        type: "string",
        headerName: "Created By",
        width: 200
      }, {
        field: "ModifiedOn",
        type: "dateTime",
        headerName: "Modified On",
        width: 200,
        filterOperators: (0, _xDataGridPremium.getGridDateOperators)()
      }, {
        field: "ModifiedByUser",
        type: "string",
        headerName: "Modified By",
        width: 200
      });
    }
    const showActions = (model === null || model === void 0 ? void 0 : model.addHeaderFilters) !== false;
    if (showActions && !forAssignment && !isReadOnly) {
      const actions = [];
      if (model.addEdit && permissions.edit) {
        actions.push( /*#__PURE__*/_react.default.createElement(_xDataGridPremium.GridActionsCellItem, {
          icon: /*#__PURE__*/_react.default.createElement(_Edit.default, null),
          "data-action": actionTypes.Edit,
          label: "Edit"
        }));
      }
      if (model.addCopy && permissions.add) {
        actions.push( /*#__PURE__*/_react.default.createElement(_xDataGridPremium.GridActionsCellItem, {
          icon: /*#__PURE__*/_react.default.createElement(_FileCopy.default, null),
          "data-action": actionTypes.Copy,
          label: "Copy"
        }));
      }
      if (model.delete && permissions.delete) {
        actions.push( /*#__PURE__*/_react.default.createElement(_xDataGridPremium.GridActionsCellItem, {
          icon: /*#__PURE__*/_react.default.createElement(_Delete.default, null),
          "data-action": actionTypes.Delete,
          label: "Delete"
        }));
      }
      if (actions.length > 0) {
        finalColumns.push({
          field: 'actions',
          type: 'actions',
          label: '',
          width: actions.length * 50,
          getActions: () => actions
        });
      }
      pinnedColumns.right.push('actions');
    } else {
      if (!model.noOptionButton) {
        finalColumns.push({
          field: 'actions',
          width: 1,
          headerName: '',
          renderCell: cellParams => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_MoreVertTwoTone.default, {
            onClick: event => {
              setSelectedRecord(cellParams.row);
              handleClick(event);
            }
          }))
        });
      }
    }
    return {
      gridColumns: finalColumns,
      pinnedColumns,
      lookupMap
    };
  }, [columns, model, parent, permissions, forAssignment]);
  const fetchData = function fetchData() {
    let action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "list";
    let extraParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let contentType = arguments.length > 2 ? arguments[2] : undefined;
    let columns = arguments.length > 3 ? arguments[3] : undefined;
    const {
      pageSize,
      page
    } = paginationModel;
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
      }];
      extraParams["advanceFilter"] = advanceFilter;
    }
    (0, _crudHelper.getList)({
      action,
      page: !contentType ? page : 0,
      pageSize: !contentType ? pageSize : 1000000,
      sortModel,
      filterModel,
      controllerType: model === null || model === void 0 ? void 0 : model.controllerType,
      api: api || (model === null || model === void 0 ? void 0 : model.api),
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
  const openForm = function openForm(id) {
    let {
      mode
    } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (setActiveRecord) {
      (0, _crudHelper.getRecord)({
        id,
        api: api || (model === null || model === void 0 ? void 0 : model.api),
        setIsLoading,
        setActiveRecord,
        modelConfig: model,
        parentFilters,
        where
      });
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
        const result = await onCellClick({
          cellParams,
          event,
          details
        });
        if (typeof result !== "boolean") {
          return;
        }
      }
      const {
        row: record
      } = cellParams;
      const columnConfig = lookupMap[cellParams.field] || {};
      if (columnConfig.linkTo) {
        navigate({
          pathname: _template.default.replaceTags(columnConfig.linkTo, record)
        });
        return;
      }
      let action = useLinkColumn && cellParams.field === model.linkColumn ? actionTypes.Edit : null;
      if (!action && cellParams.field === 'actions') {
        action = details === null || details === void 0 ? void 0 : details.action;
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
        return openForm(record[idProperty], {
          mode: 'copy'
        });
      }
      if (action === actionTypes.Delete) {
        setIsDeleting(true);
        setRecord({
          name: record[model === null || model === void 0 ? void 0 : model.linkColumn],
          id: record[idProperty]
        });
      }
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = async function handleDelete() {
    const result = await (0, _crudHelper.deleteRecord)({
      id: record === null || record === void 0 ? void 0 : record.id,
      api: api || (model === null || model === void 0 ? void 0 : model.api),
      setIsLoading,
      setError: snackbar.showError,
      setErrorMessage
    });
    if (result === true) {
      setIsDeleting(false);
      snackbar.showMessage('Record Deleted Successfully.');
      fetchData();
    } else {
      setTimeout(() => {
        setIsDeleting(false);
      }, 200);
    }
  };
  const clearError = () => {
    setErrorMessage(null);
    setIsDeleting(false);
  };
  const handleCloseOrderDetailModal = () => {
    setIsOrderDetailModalOpen(false);
    setSelectedOrder(null);
    fetchData();
  };
  const onCellDoubleClick = event => {
    if (model.showModal) {
      setIsOrderDetailModalOpen(true);
      const {
        row
      } = event;
      setSelectedOrder(row);
    } else {
      if (!isReadOnly && model.addHeaderFilters !== false) {
        const {
          row: record
        } = event;
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
  };
  const updateAssignment = _ref4 => {
    let {
      unassign,
      assign
    } = _ref4;
    const assignedValues = Array.isArray(selected) ? selected : selected.length ? selected.split(',') : [];
    const finalValues = unassign ? assignedValues.filter(id => !unassign.includes(parseInt(id))) : [...assignedValues, ...assign];
    onAssignChange(typeof selected === 'string' ? finalValues.join(',') : finalValues);
  };
  const onAssign = () => {
    updateAssignment({
      assign: selection
    });
  };
  const onUnassign = () => {
    updateAssignment({
      unassign: selection
    });
  };
  const CustomToolbar = function CustomToolbar(props) {
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between'
      }
    }, (isReadOnly || !permissions.add && !forAssignment) && /*#__PURE__*/_react.default.createElement(_Typography.default, {
      variant: "h6",
      component: "h3",
      textAlign: "center",
      sx: {
        ml: 1
      }
    }, " ", isReadOnly ? "" : model.title), model.addForm && !forAssignment && permissions.add && !isReadOnly && /*#__PURE__*/_react.default.createElement(_Button.default, {
      startIcon: /*#__PURE__*/_react.default.createElement(_Add.default, null),
      onClick: onAdd,
      size: "small"
    }, model !== null && model !== void 0 && model.customAddTextTitle ? model.customAddTextTitle : "Add".concat(" ", model.title)), available && /*#__PURE__*/_react.default.createElement(_Button.default, {
      startIcon: /*#__PURE__*/_react.default.createElement(_Add.default, null),
      onClick: onAssign,
      size: "small"
    }, "\"Assign\""), assigned && /*#__PURE__*/_react.default.createElement(_Button.default, {
      startIcon: /*#__PURE__*/_react.default.createElement(_Remove.default, null),
      onClick: onUnassign,
      size: "small"
    }, "\"Remove\""), /*#__PURE__*/_react.default.createElement(_xDataGridPremium.GridToolbarContainer, props, /*#__PURE__*/_react.default.createElement(_xDataGridPremium.GridToolbarColumnsButton, null), /*#__PURE__*/_react.default.createElement(_xDataGridPremium.GridToolbarFilterButton, null), /*#__PURE__*/_react.default.createElement(_Button.default, {
      startIcon: /*#__PURE__*/_react.default.createElement(_FilterListOff.default, null),
      onClick: clearFilters,
      size: "small"
    }, "Clear Filters"), permissions.export && /*#__PURE__*/_react.default.createElement(CustomExportButton, {
      handleExport: handleExport
    })));
  };
  const getGridRowId = row => {
    return row[idProperty];
  };
  const closingDialog = () => {
    setIsEdit(false);
  };
  const handleExport = e => {
    const {
      orderedFields,
      columnVisibilityModel,
      lookup
    } = apiRef.current.state.columns;
    const columns = {};
    const hiddenColumns = Object.keys(columnVisibilityModel).filter(key => columnVisibilityModel[key] === false);
    const visibleColumns = orderedFields.filter(ele => !(hiddenColumns !== null && hiddenColumns !== void 0 && hiddenColumns.includes(ele)) && ele !== '__check__' && ele !== 'actions');
    if ((visibleColumns === null || visibleColumns === void 0 ? void 0 : visibleColumns.length) === 0) {
      snackbar.showMessage('You cannot export while all columns are hidden... please show at least 1 column before exporting');
      return;
    }
    visibleColumns.forEach(ele => {
      columns[ele] = {
        field: ele,
        width: lookup[ele].width,
        headerName: lookup[ele].headerName,
        type: lookup[ele].type,
        keepLocal: lookup[ele].keepLocal === true
      };
    });
    fetchData(undefined, undefined, e.target.dataset.contentType, columns);
  };
  (0, _react.useEffect)(() => {
    fetchData();
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
      backgroundColor: 'transparent !important'
    },
    '.custom-data-grid .MuiDataGrid-mainGrid': {
      overflow: 'hidden !important'
    }
  };
  const handleMenuDelete = record => {
    setIsDeleting(true);
    setRecord({
      name: record[model === null || model === void 0 ? void 0 : model.linkColumn],
      id: record[idProperty]
    });
  };
  const handleMenuEdit = record => {
    setIsEdit(true);
    setRecord({
      name: record[model === null || model === void 0 ? void 0 : model.linkColumn],
      id: record[idProperty]
    });
  };
  const ActionMenuItem = _ref5 => {
    let {
      actionType,
      handler,
      children
    } = _ref5;
    return /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
      className: "actionMenuItem",
      "data-action": actionType,
      onClick: handler
    }, children);
  };
  const processRowUpdate = updatedRow => {
    setIsLoading(true);
    (0, _crudHelper.saveRecord)({
      id: updatedRow[idProperty],
      api: api || (model === null || model === void 0 ? void 0 : model.api),
      values: updatedRow,
      setIsLoading,
      setError: snackbar === null || snackbar === void 0 ? void 0 : snackbar.showError
    }).then(success => {
      if (success) {
        snackbar === null || snackbar === void 0 || snackbar.showMessage('Record Updated Successfully.');
      }
    }).finally(() => setIsLoading(false));
    return updatedRow;
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    style: customStyles
  }, /*#__PURE__*/_react.default.createElement(_xDataGridPremium.DataGridPremium, {
    disableColumnMenu: !model.addHeaderFilters,
    unstable_headerFilters: model.addHeaderFilters !== false,
    checkboxSelection: forAssignment,
    loading: isLoading,
    className: "pagination-fix",
    onCellClick: onCellClickHandler,
    onCellDoubleClick: onCellDoubleClick,
    columns: gridColumns,
    paginationModel: paginationModel,
    pageSizeOptions: [5, 10, 20, 50, 100],
    onPaginationModelChange: setPaginationModel,
    pagination: true,
    rowCount: data.recordCount,
    rows: data.records,
    sortModel: sortModel,
    paginationMode: isClient,
    sortingMode: isClient,
    filterMode: isClient,
    keepNonExistentRowsSelected: true,
    onSortModelChange: setSortModel,
    onFilterModelChange: setFilterModel,
    rowSelection: selection,
    processRowUpdate: processRowUpdate,
    onRowSelectionModelChange: setSelection,
    filterModel: filterModel,
    getRowId: getGridRowId,
    slots: _objectSpread({
      headerFilterMenu: model.addHeaderFilters !== false ? false : null,
      columnMenu: model.addHeaderFilters ? undefined : () => null,
      columnSortedDescendingIcon: model.addHeaderFilters ? _UnfoldMoreTwoTone.default : () => null,
      columnSortedAscendingIcon: model.addHeaderFilters ? _UnfoldMoreTwoTone.default : () => null,
      columnUnsortedIcon: model.addHeaderFilters ? _UnfoldMoreTwoTone.default : () => null,
      footer: gridFooter
    }, model.addHeaderFilters ? {
      toolbar: CustomToolbar
    } : {}),
    slotProps: {
      footer: {
        pagination: true,
        apiRef,
        rowCount: data.recordCount
      },
      panel: {
        placement: "bottom-end"
      }
    },
    hideFooterSelectedRowCount: rowsSelected,
    density: model.addHeaderFilters ? "compact" : "standard",
    disableDensitySelector: true,
    apiRef: apiRef,
    disableAggregation: true,
    disableRowGrouping: true,
    autoHeight: true,
    initialState: {
      columns: {
        columnVisibilityModel: visibilityModel
      },
      pinnedColumns: pinnedColumns
    }
  }), isOrderDetailModalOpen && selectedOrder && model.OrderModal && /*#__PURE__*/_react.default.createElement(model.OrderModal, {
    orderId: selectedOrder.OrderId,
    isOpen: true,
    orderTotal: selectedOrder.OrderTotal,
    orderDate: selectedOrder.OrderDateTime,
    orderStatus: selectedOrder.OrderStatus,
    customerNumber: selectedOrder.CustomerPhoneNumber,
    customerName: selectedOrder.CustomerName,
    customerEmail: selectedOrder.CustomerEmailAddress,
    onClose: handleCloseOrderDetailModal
  }), errorMessage && /*#__PURE__*/_react.default.createElement(_dfameworkUi.DialogComponent, {
    open: !!errorMessage,
    onConfirm: clearError,
    onCancel: clearError,
    title: "Info",
    hideCancelButton: true
  }, " ", errorMessage), isDeleting && !errorMessage && /*#__PURE__*/_react.default.createElement(_dfameworkUi.DialogComponent, {
    open: isDeleting,
    onConfirm: handleDelete,
    onCancel: () => setIsDeleting(false),
    title: "Confirm Delete"
  }, " ", 'Are you sure you want to delete'.concat(" ", record === null || record === void 0 ? void 0 : record.name, "?")), isEdit && /*#__PURE__*/_react.default.createElement(_dfameworkUi.DialogComponent, {
    open: isEdit,
    onConfirm: handleDelete,
    onCancel: () => setIsEdit(false),
    title: "Edit Form",
    hideButtons: true
  }, /*#__PURE__*/_react.default.createElement(model.Form, {
    ids: String(record.id),
    closeDialog: closingDialog
  })), /*#__PURE__*/_react.default.createElement(_Menu.default, {
    anchorEl: anchorEl,
    id: "account-menu",
    open: open,
    onClose: handleClose,
    onClick: handleClose,
    PaperProps: {
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
          mr: 1
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
          zIndex: 0
        }
      }
    },
    transformOrigin: {
      horizontal: 'right',
      vertical: 'center'
    },
    anchorOrigin: {
      horizontal: 'right',
      vertical: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(ActionMenuItem, {
    actionType: actionTypes.Edit,
    handler: () => handleMenuEdit(selectedRecord)
  }, "Edit"), /*#__PURE__*/_react.default.createElement(ActionMenuItem, {
    actionType: actionTypes.Delete,
    handler: () => handleMenuDelete(selectedRecord)
  }, "Delete")));
}, areEqual);
var _default = exports.default = GridBase;