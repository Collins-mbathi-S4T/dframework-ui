"use strict";

require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BooleanField", {
  enumerable: true,
  get: function get() {
    return _boolean.default;
  }
});
Object.defineProperty(exports, "DateField", {
  enumerable: true,
  get: function get() {
    return _date.default;
  }
});
Object.defineProperty(exports, "GridTransfer", {
  enumerable: true,
  get: function get() {
    return _gridTransfer.default;
  }
});
Object.defineProperty(exports, "NumberField", {
  enumerable: true,
  get: function get() {
    return _number.default;
  }
});
Object.defineProperty(exports, "PasswordField", {
  enumerable: true,
  get: function get() {
    return _password.default;
  }
});
Object.defineProperty(exports, "SelectField", {
  enumerable: true,
  get: function get() {
    return _select.default;
  }
});
Object.defineProperty(exports, "StringField", {
  enumerable: true,
  get: function get() {
    return _string.default;
  }
});
Object.defineProperty(exports, "TimeField", {
  enumerable: true,
  get: function get() {
    return _time.default;
  }
});
exports.fieldMappers = exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.push.js");
var React = _interopRequireWildcard(require("react"));
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _boolean = _interopRequireDefault(require("./fields/boolean"));
var _string = _interopRequireDefault(require("./fields/string"));
var _number = _interopRequireDefault(require("./fields/number"));
var _password = _interopRequireDefault(require("./fields/password"));
var _date = _interopRequireDefault(require("./fields/date"));
var _dateTime = _interopRequireDefault(require("./fields/dateTime"));
var _time = _interopRequireDefault(require("./fields/time"));
var _select = _interopRequireDefault(require("./fields/select"));
var _gridTransfer = _interopRequireDefault(require("./fields/grid-transfer"));
var _Grid = _interopRequireDefault(require("@mui/material/Grid"));
var _radio = _interopRequireDefault(require("./fields/radio"));
var _autocomplete = _interopRequireDefault(require("./fields/autocomplete"));
var _Stepper = _interopRequireDefault(require("@mui/material/Stepper"));
var _Step = _interopRequireDefault(require("@mui/material/Step"));
var _StepLabel = _interopRequireDefault(require("@mui/material/StepLabel"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _dayRadio = _interopRequireDefault(require("./fields/dayRadio"));
var _core = require("@material-ui/core");
var _material = require("@mui/material");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const fieldMappers = exports.fieldMappers = {
  "boolean": _boolean.default,
  "select": _select.default,
  "string": _string.default,
  "number": _number.default,
  "password": _password.default,
  "date": _date.default,
  "dateTime": _dateTime.default,
  "time": _time.default,
  "grid-transfer": _gridTransfer.default,
  "oneToMany": _gridTransfer.default,
  "radio": _radio.default,
  "autocomplete": _autocomplete.default,
  "dayRadio": _dayRadio.default
};
const useStyles = (0, _core.makeStyles)({
  root: {
    marginTop: "1rem",
    marginBottom: "1rem"
  },
  childStyles: {
    paddingTop: "2.5px",
    paddingBottom: "2.5px"
  }
});
const RenderSteps = _ref => {
  let {
    tabColumns,
    model,
    formik,
    data,
    onChange,
    combos,
    lookups,
    fieldConfigs
  } = _ref;
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  let skipSteps = {};
  for (let index = 0, len = model.columns.length; index < len; index++) {
    const {
      field,
      skip
    } = model.columns[index];
    if (skip) {
      skipSteps[skip.step] = formik.values[field];
    }
  }
  const isStepSkipped = step => {
    return skipped.has(step) || skipSteps[step];
  };
  const isLastStep = () => {
    for (let nextStep = activeStep + 1; nextStep < tabColumns.length; nextStep++) {
      if (!isStepSkipped(nextStep)) {
        return false;
      }
    }
    return true;
  };
  const handleNext = () => {
    let nextStep = activeStep + 1;
    while (skipSteps[nextStep]) {
      nextStep++;
    }
    if (nextStep >= tabColumns.length || isLastStep()) {
      formik.handleSubmit();
    } else {
      setActiveStep(nextStep);
    }
  };
  const handleBack = () => {
    let prevStep = activeStep - 1;
    while (skipSteps[prevStep] && prevStep > 0) {
      prevStep--;
    }
    setActiveStep(prevStep);
  };
  if (!(tabColumns !== null && tabColumns !== void 0 && tabColumns.length)) {
    return null;
  }
  const currentStep = tabColumns[activeStep];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_Stepper.default, {
    activeStep: activeStep
  }, tabColumns.map((_ref2, index) => {
    let {
      title,
      key
    } = _ref2;
    return /*#__PURE__*/React.createElement(_Step.default, {
      key: key,
      completed: isStepSkipped(index)
    }, /*#__PURE__*/React.createElement(_StepLabel.default, null, title));
  })), /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(RenderColumns, {
    formElements: currentStep.items,
    model: model,
    formik: formik,
    data: data,
    onChange: onChange,
    combos: combos,
    lookups: lookups,
    fieldConfigs: fieldConfigs
  }), /*#__PURE__*/React.createElement(_Box.default, {
    sx: {
      display: 'flex',
      flexDirection: 'row',
      pt: 2
    }
  }, /*#__PURE__*/React.createElement(_Button.default, {
    color: "inherit",
    disabled: activeStep === 0,
    onClick: handleBack,
    sx: {
      mr: 1
    }
  }, "Back"), /*#__PURE__*/React.createElement(_Button.default, {
    onClick: handleNext
  }, isLastStep() ? 'Finish' : 'Next'))));
};
const RenderColumns = _ref3 => {
  let {
    formElements,
    model,
    formik,
    data,
    onChange,
    combos,
    lookups,
    fieldConfigs
  } = _ref3;
  const classes = useStyles();
  if (!(formElements !== null && formElements !== void 0 && formElements.length)) {
    return null;
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, formElements.map((_ref4, key) => {
    let {
      Component,
      column,
      field,
      fieldLabel,
      otherProps
    } = _ref4;
    let isGridComponent = typeof column.relation === 'function';
    return /*#__PURE__*/React.createElement(_Grid.default, {
      container: true,
      spacing: 2,
      key: key,
      className: classes.root,
      alignItems: isGridComponent ? "flex-start" : "center"
    }, /*#__PURE__*/React.createElement(_Grid.default, {
      item: true,
      xs: 1,
      className: classes.childStyles
    }, /*#__PURE__*/React.createElement(_material.Typography, {
      sx: {
        fontSize: '16px',
        fontWeight: isGridComponent ? 'bold' : 'normal'
      }
    }, " ", column.label, ": ")), /*#__PURE__*/React.createElement(_Grid.default, {
      item: true,
      xs: isGridComponent ? 12 : 11,
      className: classes.childStyles
    }, /*#__PURE__*/React.createElement(Component, _extends({
      model: model,
      fieldConfigs: fieldConfigs[field],
      column: column,
      field: field,
      fieldLabel: fieldLabel,
      formik: formik,
      data: data,
      onChange: onChange,
      combos: combos,
      lookups: lookups
    }, otherProps))));
  }));
};
const getFormConfig = function getFormConfig(_ref5) {
  let {
    columns,
    tabs = {}
  } = _ref5;
  const formElements = [],
    tabColumns = {};
  for (const tab in tabs) {
    tabColumns[tab] = [];
  }
  for (const column of columns) {
    let fieldType = column.type;
    if (column.fieldLabel === null) {
      /* If the field should not be shown in form mode, specify fieldLabel as null */
      continue;
    }
    const {
      field,
      fieldLabel = column.header,
      tab
    } = column;
    const otherProps = {};
    if (column.options) {
      otherProps.options = column.options;
    }
    const Component = fieldMappers[fieldType];
    if (!Component) {
      continue;
    }
    const target = tab && tabs[tab] ? tabColumns[tab] : formElements;
    target.push({
      Component,
      field,
      fieldLabel,
      column,
      otherProps
    });
  }
  const tabsData = [];
  for (const tabColumn in tabColumns) {
    tabsData.push({
      key: tabColumn,
      title: tabs[tabColumn],
      items: tabColumns[tabColumn]
    });
  }
  return {
    formElements,
    tabColumns: tabsData
  };
};
const FormLayout = _ref6 => {
  let {
    model,
    formik,
    data,
    combos,
    onChange,
    lookups,
    id: displayId,
    fieldConfigs
  } = _ref6;
  const {
    formElements,
    tabColumns,
    showTabs
  } = React.useMemo(() => {
    var _model$formConfig;
    let showTabs = model === null || model === void 0 || (_model$formConfig = model.formConfig) === null || _model$formConfig === void 0 ? void 0 : _model$formConfig.showTabbed;
    const {
      formElements,
      tabColumns
    } = getFormConfig({
      columns: model.columns,
      tabs: showTabs ? model.tabs : {}
    });
    return {
      formElements,
      tabColumns,
      showTabs: showTabs && tabColumns.length > 0
    };
  }, [model]);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(RenderColumns, {
    formElements: formElements,
    model: model,
    formik: formik,
    data: data,
    onChange: onChange,
    combos: combos,
    lookups: lookups,
    fieldConfigs: fieldConfigs
  }), /*#__PURE__*/React.createElement(RenderSteps, {
    tabColumns: tabColumns,
    model: model,
    formik: formik,
    data: data,
    onChange: onChange,
    combos: combos,
    lookups: lookups,
    fieldConfigs: fieldConfigs
  }));
};
var _default = exports.default = FormLayout;