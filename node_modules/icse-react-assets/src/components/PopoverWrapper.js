import { Popover, PopoverContent } from "@carbon/react";
import React from "react";
import PropTypes from "prop-types";
import { addClassName } from "../lib/index";
import "./styles/PopoverWrapper.css";

/**
 * Wrapper for carbon popover component to handle individual component mouseover
 */
class PopoverWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovering: false,
    };
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  /**
   * handle mouse over
   */
  handleMouseOver() {
    this.setState({ isHovering: true });
  }

  /**
   * handle mouse out
   */
  handleMouseOut() {
    this.setState({ isHovering: false });
  }

  render() {
    return this.props.noPopover === true || this.props.hoverText === "" ? (
      this.props.children
    ) : (
      <div
        className={addClassName("popover-obj", this.props)}
        onMouseEnter={this.handleMouseOver}
        onMouseLeave={this.handleMouseOut}
      >
        <Popover
          open={this.state.isHovering}
          autoAlign={this.props.align ? false : true}
          dropShadow={false}
          highContrast={true}
          caret={false}
          align={this.props.align}
        >
          {this.props.children}
          <PopoverContent
            className={
              "popover-box" +
              (this.props.contentClassName
                ? ` ${this.props.contentClassName}`
                : "")
            }
          >
            {this.props.hoverText}
          </PopoverContent>
        </Popover>
      </div>
    );
  }
}

PopoverWrapper.defaultProps = {
  noPopover: false,
};

PopoverWrapper.propTypes = {
  noPopover: PropTypes.bool,
  hoverText: PropTypes.string.isRequired,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  align: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default PopoverWrapper;
