"use strict";

require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.object.assign.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _DatePicker = require("@mui/x-date-pickers/DatePicker");
var _AdapterDayjs = require("@mui/x-date-pickers/AdapterDayjs");
var _material = require("@mui/material");
var _LocalizationProvider = require("@mui/x-date-pickers/LocalizationProvider");
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _CalendarMonth = _interopRequireDefault(require("@mui/icons-material/CalendarMonth"));
var _dayjs = _interopRequireDefault(require("dayjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const Field = _ref => {
  let {
    column,
    field,
    fieldLabel,
    formik,
    otherProps,
    classes,
    fieldConfigs
  } = _ref;
  const isDisabled = fieldConfigs === null || fieldConfigs === void 0 ? void 0 : fieldConfigs.disabled;
  if (column.modifiedLabel) {
    // const dateValue = formik.values[field] ? dayjs(formik.values[field]) : null;
    return /*#__PURE__*/_react.default.createElement(_LocalizationProvider.LocalizationProvider, {
      dateAdapter: _AdapterDayjs.AdapterDayjs
    }, /*#__PURE__*/_react.default.createElement(_material.InputLabel, {
      sx: {
        margin: '0.9rem 2rem 2.5rem 0rem',
        position: 'absolute',
        zIndex: '1',
        transform: 'translate(14px, -9px) scale(0.75)'
      }
    }, column.label), /*#__PURE__*/_react.default.createElement(_DatePicker.DatePicker, _extends({}, otherProps, {
      variant: "standard",
      readOnly: (column === null || column === void 0 ? void 0 : column.readOnly) === true,
      key: field,
      fullWidth: true,
      sx: {
        width: '337px',
        backgroundColor: '#364072 !important',
        '& .MuiOutlinedInput-input': {
          padding: '1.65625rem 0.875rem 0.59375rem 0.875rem !important'
        },
        '& .css-4i5lc0-MuiInputBase-input-MuiOutlinedInput-input': {
          backgroundColor: '#364072 !important'
        },
        '& .css-zh6go5-MuiInputBase-root-MuiOutlinedInput-root': {
          backgroundColor: '#364072 !important'
        }
      },
      name: field,
      value: formik.values[field],
      components: {
        OpenPickerIcon: _CalendarMonth.default
      },
      onChange: value => formik.setFieldValue(field, value),
      onBlur: formik.handleBlur,
      helperText: formik.touched[field] && formik.errors[field],
      disablePast: column === null || column === void 0 ? void 0 : column.disablePast,
      disabled: isDisabled,
      renderInput: params => {
        let helperText;
        if (isDisabled && column.showErrorText) {
          helperText = "Survey already started";
        } else if (formik.touched[field] && formik.errors[field]) {
          helperText = formik.errors[field];
        }
        const showError = !!helperText;
        const props = _objectSpread(_objectSpread({}, params), {}, {
          variant: "standard",
          error: showError
        });
        return /*#__PURE__*/_react.default.createElement(_TextField.default, _extends({}, props, {
          label: column.label,
          placeholder: "MM/DD/YYYY",
          helperText: helperText,
          fullWidth: true,
          sx: {
            width: '337px',
            backgroundColor: '#364072',
            color: '#FFFFFF',
            padding: '1.65625rem 0.875rem 0.59375rem 0.875rem',
            '& .MuiInputLabel-root': {
              color: '#FFFFFF',
              fontWeight: 'bold'
            },
            '& .MuiOutlinedInput-input': {
              padding: '1.65625rem 0.875rem 0.59375rem 0.875rem'
            },
            border: 'none',
            outline: 'none'
          }
        }));
      }
    })));
  } else {
    return /*#__PURE__*/_react.default.createElement(_LocalizationProvider.LocalizationProvider, {
      dateAdapter: _AdapterDayjs.AdapterDayjs
    }, /*#__PURE__*/_react.default.createElement(_DatePicker.DatePicker, _extends({}, otherProps, {
      variant: "standard",
      readOnly: (column === null || column === void 0 ? void 0 : column.readOnly) === true,
      key: field,
      fullWidth: true,
      name: field,
      value: formik.values[field],
      onChange: value => formik.setFieldValue(field, value),
      onBlur: formik.handleBlur,
      helperText: formik.touched[field] && formik.errors[field],
      disablePast: column === null || column === void 0 ? void 0 : column.disablePast,
      disabled: isDisabled,
      renderInput: params => {
        let helperText;
        if (isDisabled && column.showErrorText) {
          helperText = "Survey already started";
        } else if (formik.touched[field] && formik.errors[field]) {
          helperText = formik.errors[field];
        }
        const showError = !!helperText;
        const props = _objectSpread(_objectSpread({}, params), {}, {
          variant: "standard",
          error: showError
        });
        return /*#__PURE__*/_react.default.createElement(_TextField.default, _extends({}, props, {
          helperText: helperText,
          fullWidth: true
        }));
      }
    })));
  }
};
var _default = exports.default = Field;