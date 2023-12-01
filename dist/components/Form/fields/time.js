"use strict";

require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _Radio = _interopRequireDefault(require("@mui/material/Radio"));
var _RadioGroup = _interopRequireDefault(require("@mui/material/RadioGroup"));
var _FormControlLabel = _interopRequireDefault(require("@mui/material/FormControlLabel"));
var _FormControl = _interopRequireDefault(require("@mui/material/FormControl"));
var _material = require("@mui/material");
var _DesktopTimePicker = require("@mui/x-date-pickers/DesktopTimePicker");
var _KeyboardArrowDown = _interopRequireDefault(require("@mui/icons-material/KeyboardArrowDown"));
var _TimePicker = require("@mui/x-date-pickers/TimePicker");
var _AdapterDayjs = require("@mui/x-date-pickers/AdapterDayjs");
var _LocalizationProvider = require("@mui/x-date-pickers/LocalizationProvider");
var _dayjs = _interopRequireDefault(require("dayjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const Field = _ref => {
  let {
    column,
    field,
    fieldLabel,
    formik,
    otherProps,
    classes
  } = _ref;
  const [timePeriod, setTimePeriod] = (0, _react.useState)("AM");
  const [time, setTime] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    if (formik.values[field]) {
      const dateTime = (0, _dayjs.default)(formik.values[field]);
      setTime(dateTime);
      setTimePeriod(dateTime.format("A"));
    }
  }, [formik.values]);
  const handleRadioChange = event => {
    setTimePeriod(event.target.value);
    updateFormikTime(time, event.target.value);
  };
  const handleTimeChange = newTime => {
    setTime(newTime);
    updateFormikTime(newTime, timePeriod);
  };
  const updateFormikTime = (timeValue, period) => {
    if (timeValue) {
      let hours = timeValue.hour();
      const minutes = timeValue.minute();
      if (period === "PM" && hours < 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;
      const dateTime = (0, _dayjs.default)().hour(hours).minute(minutes);
      formik.setFieldValue(field, dateTime.toISOString());
    }
  };
  if (column.modifiedLabel) {
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: '2.9rem',
        width: '337px !important'
      }
    }, /*#__PURE__*/_react.default.createElement(_LocalizationProvider.LocalizationProvider, {
      dateAdapter: _AdapterDayjs.AdapterDayjs
    }, /*#__PURE__*/_react.default.createElement(_material.InputLabel, {
      sx: {
        margin: "1.8rem 2rem 2.5rem 0rem",
        position: "absolute",
        zIndex: "1",
        transform: "translate(14px, -9px) scale(0.75)"
      }
    }, column.label), /*#__PURE__*/_react.default.createElement(_DesktopTimePicker.DesktopTimePicker, {
      variant: "standard",
      value: time,
      onChange: handleTimeChange,
      sx: {
        backgroundColor: "#4F5883 !important",
        "& .MuiOutlinedInput-input": {
          padding: "1.65625rem 0.875rem 0.59375rem 0.875rem !important"
        },
        width: "200px"
      },
      components: {
        OpenPickerIcon: _KeyboardArrowDown.default
      },
      renderInput: params => /*#__PURE__*/_react.default.createElement(_TextField.default, _extends({}, params, {
        placeholder: "select"
      }))

      // slots={{
      //   textField: (params) => <TextField {...params} placeholder={column?.placeholder ? column?.placeholder : "hh:mm"} />,
      //   openPickerIcon: KeyboardArrowDownIcon
      // }}
    }), /*#__PURE__*/_react.default.createElement(_FormControl.default, {
      component: "fieldset"
    }, /*#__PURE__*/_react.default.createElement(_RadioGroup.default, {
      value: timePeriod,
      onChange: handleRadioChange,
      style: {
        flexDirection: "row",
        flexWrap: "nowrap"
      }
    }, /*#__PURE__*/_react.default.createElement(_FormControlLabel.default, {
      value: "AM",
      control: /*#__PURE__*/_react.default.createElement(_Radio.default, {
        checked: timePeriod === "AM"
      }),
      label: "AM"
    }), /*#__PURE__*/_react.default.createElement(_FormControlLabel.default, {
      value: "PM",
      control: /*#__PURE__*/_react.default.createElement(_Radio.default, {
        checked: timePeriod === "PM"
      }),
      label: "PM"
    })))));
  } else {
    let inputValue = formik.values[field];
    if (column.isUtc) {
      inputValue = _dayjs.default.utc(inputValue).utcOffset((0, _dayjs.default)().utcOffset(), true).format();
    }
    return /*#__PURE__*/_react.default.createElement(_LocalizationProvider.LocalizationProvider, {
      dateAdapter: _AdapterDayjs.AdapterDayjs
    }, /*#__PURE__*/_react.default.createElement(_TimePicker.TimePicker, _extends({}, otherProps, {
      variant: "standard",
      readOnly: (column === null || column === void 0 ? void 0 : column.readOnly) === true,
      key: field,
      fullWidth: true,
      name: field,
      value: inputValue,
      onChange: value => {
        if (column.isUtc) {
          value = value && value.isValid() ? value.format("YYYY-MM-DDTHH:mm:ss") + ".000Z" : null;
        }
        return formik.setFieldValue(field, value);
      },
      onBlur: formik.handleBlur,
      helperText: formik.touched[field] && formik.errors[field],
      renderInput: params => {
        const props = _objectSpread(_objectSpread({}, params), {}, {
          variant: "standard"
        });
        return /*#__PURE__*/_react.default.createElement(_TextField.default, _extends({}, props, {
          helperText: formik.errors[field],
          fullWidth: true
        }));
      }
    })));
  }
};
var _default = exports.default = Field;