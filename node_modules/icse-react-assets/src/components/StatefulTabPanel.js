import React from "react";
import { Tab, TabList, TabPanels, Tabs, TabPanel } from "@carbon/react";
import UnderConstruction from "./UnderConstruction";
import { DynamicRender, IcseHeading } from "./Utils";
import { SaveAddButton } from "./Buttons";
import { isFunction } from "lazy-z";
import PropTypes from "prop-types";
import "./styles/StatefulTabPanel.css";

/**
 * StatefulTabPanel wrapper for non array forms
 * @param {*} props props
 * @param {*} props.form form to put in the create tab
 * @param {*} props.about docs to put in the about tab
 */
class StatefulTabPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
    };
    this.setSelectedIndex = this.setSelectedIndex.bind(this);
  }

  setSelectedIndex(event) {
    // if the index is being set to a new tab
    if (
      this.props.toggleShowChildren &&
      event.selectedIndex !== this.state.tabIndex
    )
      this.props.toggleShowChildren();
    this.setState({ tabIndex: event.selectedIndex });
  }

  render() {
    return (
      <>
        {this.props.name && !this.props.hasBuiltInHeading && (
          <IcseHeading
            name={this.props.name}
            type={this.props.subHeading ? "subHeading" : "heading"}
            className={this.props.className}
            tooltip={this.props.tooltip}
            buttons={
              <DynamicRender
                hide={
                  this.props.hideFormTitleButton ||
                  this.state.tabIndex !== 0 ||
                  !isFunction(this.props.onClick) ||
                  this.props.hasBuiltInHeading
                }
                show={
                  <SaveAddButton
                    type="add"
                    noDeleteButton
                    onClick={this.props.onClick}
                    disabled={
                      this.props.shouldDisableSave
                        ? this.props.shouldDisableSave()
                        : false
                    }
                  />
                }
              />
            }
          />
        )}
        {this.props.hideAbout ? (
          this.props.form
        ) : (
          <Tabs onChange={this.setSelectedIndex}>
            <TabList aria-label="formTabs">
              <Tab>Create</Tab>
              <Tab>About</Tab>
            </TabList>
            <TabPanels>
              <TabPanel className="doc">{this.props.form}</TabPanel>
              <TabPanel className="doc">
                {this.props.about ? this.props.about : <UnderConstruction />}
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </>
    );
  }
}

StatefulTabPanel.defaultProps = {
  subHeading: false,
  hideFormTitleButton: false,
  hideAbout: false,
  hasBuiltInHeading: false,
};

StatefulTabPanel.propTypes = {
  name: PropTypes.string, // can be null
  subHeading: PropTypes.bool.isRequired,
  className: PropTypes.string, // can be null
  tooltip: PropTypes.shape({
    content: PropTypes.string.isRequired,
    link: PropTypes.string,
    align: PropTypes.string,
    alignModal: PropTypes.string,
  }),
  hideFormTitleButton: PropTypes.bool.isRequired,
  onClick: PropTypes.func, // can be null
  shouldDisableSave: PropTypes.func, // can be null
  about: PropTypes.node, // can be null
  form: PropTypes.node.isRequired,
  hideAbout: PropTypes.bool.isRequired,
  hasBuiltInHeading: PropTypes.bool.isRequired,
};

export default StatefulTabPanel;
