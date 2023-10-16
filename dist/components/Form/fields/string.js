"use strict";

require("core-js/modules/es.array.push.js");
require("core-js/modules/es.object.assign.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.error.cause.js");
var _react = _interopRequireDefault(require("react"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
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
    onChange
  } = _ref;
  const commonProps = _objectSpread(_objectSpread({
    type: "text",
    key: field,
    required: column === null || column === void 0 ? void 0 : column.required,
    name: field,
    value: formik.values[field],
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    error: formik.touched[field] && Boolean(formik.errors[field]),
    helperText: formik.touched[field] && formik.errors[field]
  }, otherProps), {}, {
    autoFocus: !!column.autoFocus
  });
  if (column.modifiedLabel) {
    return /*#__PURE__*/_react.default.createElement(_TextField.default, _extends({
      id: "filled-basic",
      variant: "filled",
      placeholder: "Enter",
      label: column.label,
      fullWidth: true,
      InputLabelProps: {
        shrink: true
      },
      InputProps: {
        readOnly: (column === null || column === void 0 ? void 0 : column.readOnly) === true,
        disableUnderline: true
      },
      sx: {
        width: '337px',
        backgroundColor: 'transparent !important'
      }
    }, commonProps));
  } else {
    return /*#__PURE__*/_react.default.createElement(_TextField.default, _extends({
      variant: "standard",
      fullWidth: true,
      InputProps: {
        readOnly: (column === null || column === void 0 ? void 0 : column.readOnly) === true
      }
    }, commonProps));
  }
};
var _default = exports.default = Field;