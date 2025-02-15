"use strict";

require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _core = require("@material-ui/core");
const _excluded = ["component", "name", "field", "formik", "type", "model"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
const useStyles = (0, _core.makeStyles)({
  divSpacing: {
    marginTop: '10px',
    marginBottom: '10px'
  },
  boldText: {
    fontWeight: 'bold'
  }
});
const TransferField = _ref => {
  let {
      component,
      name,
      field,
      formik,
      type,
      model
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  const {
    value
  } = formik.getFieldProps(name || field);
  const {
    setFieldValue
  } = formik;
  const Component = component || props.column.relation;
  const classes = useStyles();
  const onAssignChange = (0, _react.useCallback)(newValue => {
    setFieldValue(name || field, newValue);
  }, [setFieldValue, name, field]);
  return /*#__PURE__*/_react.default.createElement("div", null, props.column.modifiedLabel ? /*#__PURE__*/_react.default.createElement(Component, _extends({
    selected: value,
    onAssignChange: onAssignChange
  }, props)) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(classes.divSpacing, " ").concat(classes.boldText)
  }, "Available"), /*#__PURE__*/_react.default.createElement(Component, {
    selected: value,
    available: true,
    onAssignChange: onAssignChange
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(classes.divSpacing, " ").concat(classes.boldText)
  }, "Assigned"), /*#__PURE__*/_react.default.createElement(Component, {
    selected: value,
    assigned: true,
    onAssignChange: onAssignChange
  })));
};
var _default = exports.default = TransferField;