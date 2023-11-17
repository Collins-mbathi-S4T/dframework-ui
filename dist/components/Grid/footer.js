"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Footer = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.parse-int.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.test.js");
var _xDataGridPremium = require("@mui/x-data-grid-premium");
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Footer = _ref => {
  let {
    pagination,
    apiRef
  } = _ref;
  const page = apiRef.current.state.pagination.paginationModel.page;
  const rowsPerPage = apiRef.current.state.pagination.paginationModel.pageSize;
  const [pageNumber, setPageNumber] = (0, _react.useState)(page + 1);
  const handleChange = function handleChange(e) {
    var _e$target;
    let value = (_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.value;
    if (value === '') {
      setPageNumber('');
    } else {
      value = parseInt(value);
      value = isNaN(value) || value < 1 ? 1 : value;
      setPageNumber(value);
    }
  };
  (0, _react.useEffect)(() => {
    setPageNumber(page + 1);
  }, [page, rowsPerPage]);
  const onPageChange = function onPageChange() {
    let targetPage = pageNumber === '' ? 1 : pageNumber;
    targetPage = Math.max(targetPage, 1);
    apiRef.current.setPage(targetPage - 1);
    if (pageNumber === '') {
      setPageNumber(1);
    }
  };
  const handleKeyPress = event => {
    const keyCode = event.which || event.keyCode;
    const keyValue = String.fromCharCode(keyCode);
    if (!/\d/.test(keyValue)) event.preventDefault();
  };
  return /*#__PURE__*/_react.default.createElement(_xDataGridPremium.GridFooterContainer, null, /*#__PURE__*/_react.default.createElement(_Box.default, {
    sx: {
      pl: 5
    }
  }, pagination && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "p"
  }, "Jump to page:"), /*#__PURE__*/_react.default.createElement(_TextField.default, {
    sx: {
      width: 70,
      pl: 1
    },
    variant: "standard",
    type: "number",
    min: 1,
    value: pageNumber,
    onChange: handleChange,
    onKeyPress: handleKeyPress
  }), /*#__PURE__*/_react.default.createElement(_Button.default, {
    size: "small",
    onClick: onPageChange
  }, "Go"))), /*#__PURE__*/_react.default.createElement(_xDataGridPremium.GridFooter, null));
};
exports.Footer = Footer;