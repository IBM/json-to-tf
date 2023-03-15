import { addClassName } from "../lib";
import React from "react";
import {
  Toggletip,
  ToggletipButton,
  ToggletipContent,
  Link,
} from "@carbon/react";
import { Information } from "@carbon/icons-react";
import PropTypes from "prop-types";
import "./styles/Tooltips.css";

/**
 * Render a form (duplicate from utils to prevent circular dependencies)
 * @param {*} form form element
 * @param {*} formProps props
 * @returns Form element
 */
function RenderForm(form, formProps) {
  return React.createElement(form, {
    ...formProps,
  });
}

/**
 * render a tooltip around an input field
 * @returns slz tooltip component
 */
export const IcseToolTip = (props) => {
  let link = (
    <Link onClick={() => window.open(props.link, "_blank")}>this link</Link>
  );
  return (
    <>
      <Toggletip align={props.align}>
        <ToggletipButton>
          <Information className="tooltipMarginLeft" />
        </ToggletipButton>
        <ToggletipContent>
          <p>
            {props.content}
            {props.link && <> Visit {link} for more information. </>}
          </p>
        </ToggletipContent>
      </Toggletip>
    </>
  );
};

IcseToolTip.defaultProps = {
  content: "",
  align: "top",
};

IcseToolTip.propTypes = {
  content: PropTypes.string.isRequired,
  link: PropTypes.string,
  align: PropTypes.string.isRequired,
};

const BuildToolTip = (props) => {
  return (
    <IcseToolTip
      content={props.tooltip.content}
      link={props.tooltip?.link}
      align={props.isModal ? props.tooltip.alignModal : props.tooltip.align}
    />
  );
};

BuildToolTip.defaultProps = {
  tooltip: {
    content: "",
  },
  isModal: false,
  align: "top",
  alignModal: "bottom",
};

BuildToolTip.propTypes = {
  tooltip: PropTypes.shape({
    content: PropTypes.string.isRequired,
    link: PropTypes.string,
  }).isRequired,
  isModal: PropTypes.bool.isRequired,
  align: PropTypes.string.isRequired,
  alignModal: PropTypes.string.isRequired,
};

export const ToolTipWrapper = (props) => {
  let allProps = { ...props };
  let tooltip = BuildToolTip(props);
  delete allProps.innerForm;
  delete allProps.tooltip;
  delete allProps.noLabelText;
  //check for labelText prop for components where it is a valid param
  if (!props.noLabelText && props.labelText === undefined) {
    throw new Error(
      "ToolTipWrapper expects `props.labelText` when rendering labelText to be provided, got neither. To not render label text, use the `noLabelText` prop."
    );
  }
  // remove label text from components where it is not valid param
  if (props.noLabelText) delete allProps.labelText;
  else allProps.labelText = " ";
  allProps.className = addClassName("tooltip", { ...props });
  return (
    <div className="cds--form-item">
      {props.noLabelText ? (
        // No label- this is usually a title
        <div className="labelRow">
          {RenderForm(props.innerForm, allProps)}
          {tooltip}
        </div>
      ) : (
        <>
          <div className="cds--label labelRow">
            <label htmlFor={props.id}>{props.labelText}</label>
            {tooltip}
          </div>
          {props.children
            ? React.cloneElement(props.children, {
                // adjust props
                labelText: " ", // set labelText to empty
                className: props.children.props.className + " tooltip", // add tooltip class back
              })
            : RenderForm(props.innerForm, allProps)}
        </>
      )}
    </div>
  );
};

ToolTipWrapper.defaultProps = {
  tooltip: {
    content: "",
  },
  noLabelText: false,
};

ToolTipWrapper.propTypes = {
  tooltip: PropTypes.shape({
    content: PropTypes.string.isRequired,
    link: PropTypes.string,
  }).isRequired,
  isModal: PropTypes.bool,
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  noLabelText: PropTypes.bool.isRequired,
  children: PropTypes.node,
  innerForm: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

export const DynamicToolTipWrapper = (props) => {
  //make sure that either children or innerForm are passed as a prop
  if (props.children === undefined && props.innerForm === undefined) {
    throw new Error(
      "DynamicToolTipWrapper expects either `props.children` or `props.innerForm` when rendering ToolTipWrapper, got neither."
    );
  }
  return props.tooltip ? (
    <ToolTipWrapper {...props} />
  ) : props.children ? (
    props.children
  ) : (
    RenderForm(props.innerForm, {})
  );
};

DynamicToolTipWrapper.propTypes = {
  tooltip: PropTypes.shape({
    content: PropTypes.string,
    link: PropTypes.string,
  }),
  isModal: PropTypes.bool,
  children: PropTypes.node,
  innerForm: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};
