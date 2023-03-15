import React from "react";
import { contains, deepEqual, parseIntFromZone } from "lazy-z";
import SubnetForm from "./SubnetForm";
import { IcseHeading, IcseSubForm } from "../";
import PropTypes from "prop-types";
import "../styles/SubnetTileForm.css";

class SubnetTileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subnetData: {},
    };
    if (!this.props.isModal) {
      this.props.data.forEach((subnet) => {
        this.state.subnetData[subnet.name] = true;
      });
    }
    this.shouldDisableGatewayToggle =
      this.shouldDisableGatewayToggle.bind(this);
    this.childSubnetHasChanged = this.childSubnetHasChanged.bind(this);
  }

  /**
   * check if child subnet has changed
   * @param {Object} stateData
   * @param {string} stateData.name
   * @param {Object} componentProps
   * @param {Object} componentProps.data
   */
  childSubnetHasChanged(stateData, componentProps) {
    let name = stateData.name;
    if (
      this.state.subnetData[name] &&
      !deepEqual(stateData, componentProps.data)
    ) {
      let subnetData = { ...this.state.subnetData };
      subnetData[name] = false;
      this.setState({ subnetData: subnetData });
    }
  }

  /**
   * check if gateway should be disabled
   * @param {Object} stateData
   * @param {string} stateData.name
   */
  shouldDisableGatewayToggle(stateData) {
    let zone = parseIntFromZone(stateData.name);
    if (contains(this.props.enabledPublicGateways, zone)) {
      return false;
    } else return true;
  }

  render() {
    let subnetMap = [...this.props.data];
    return (
      <IcseSubForm
        id={`subnet-tile-${this.props.tier}-${this.props.vpc_name}`}
        formInSubForm
        className="popoverLeft subnetTileFormMargin"
      >
        <IcseHeading
          name="Subnets"
          type="subHeading"
          className="marginBottomSmall"
        />
        <div className="displayFlex">
          {subnetMap.map((subnet) => (
            <SubnetForm // change so doesn't show buttons
              key={`${subnet.name}-tile-${this.props.tier}-${
                this.props.vpc_name
              }-${JSON.stringify(subnet)}`}
              vpc_name={this.props.vpc_name}
              data={subnet}
              onSave={this.props.onSave}
              isModal={this.props.isModal || this.props.readOnly}
              componentDidUpdateCallback={this.childSubnetHasChanged}
              networkAcls={this.props.networkAcls}
              disableSaveCallback={this.props.disableSaveCallback}
              shouldDisableGatewayToggle={this.shouldDisableGatewayToggle}
            />
          ))}
        </div>
      </IcseSubForm>
    );
  }
}

export default SubnetTileForm;

SubnetTileForm.defaultProps = {
  isModal: false,
  readOnly: false,
};

SubnetTileForm.propTypes = {
  isModal: PropTypes.bool.isRequired,
  disableSaveCallback: PropTypes.func,
  vpc_name: PropTypes.string.isRequired,
  tier: PropTypes.string.isRequired,
  networkAcls: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSave: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      cidr: PropTypes.string.isRequired,
      public_gateway: PropTypes.bool,
      acl_name: PropTypes.string.isRequired,
    })
  ),
  readOnly: PropTypes.bool.isRequired,
  enabledPublicGateways: PropTypes.arrayOf(PropTypes.number).isRequired,
};
