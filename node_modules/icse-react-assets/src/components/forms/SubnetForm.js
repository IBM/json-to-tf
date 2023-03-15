import React from "react";
import { Tile, TextInput } from "@carbon/react";
import {
  DynamicRender,
  IcseHeading,
  IcseFormGroup,
  IcseSelect,
  SaveAddButton,
  IcseToggle,
} from "../";
import PropTypes from "prop-types";
import { isNullOrEmptyString } from "lazy-z";

/**
 * create a tile for each subnet
 * @param {Object} props
 * @returns {SubnetTile} react component
 */
class SubnetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props.data };
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleChange(event) {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  componentDidUpdate() {
    this.props.componentDidUpdateCallback(this.state, this.props);
  }

  handleSave() {
    this.props.onSave(this.state, this.props);
  }

  handleToggle() {
    this.setState({ public_gateway: !this.state.public_gateway });
  }

  render() {
    return (
      <Tile
        key={this.props.vpc_name + "-subnets-" + this.props.data.name}
        className="marginRight fieldWidth"
      >
        <IcseHeading
          name={this.props.data.name}
          type="subHeading"
          className="marginBottomSmall"
          buttons={
            <DynamicRender
              hide={this.props.isModal}
              show={
                <SaveAddButton
                  disabled={this.props.disableSaveCallback(
                    this.state,
                    this.props
                  )}
                  onClick={this.handleSave}
                  noDeleteButton
                />
              }
            />
          }
        />
        <IcseFormGroup className="marginBottomSmall">
          {/* TextInput is used here as cidr is read only */}
          <TextInput
            id={this.props.data.name + "-cidr"}
            invalidText="Invalid subnet CIDR."
            labelText="Subnet CIDR"
            value={this.props.data.cidr}
            className="fieldWidthSmaller"
            readOnly
          />
        </IcseFormGroup>
        <IcseFormGroup className="marginBottomSmall">
          <IcseSelect
            name="acl_name"
            formName={`${this.props.data.name}-subnet-acl`}
            labelText="Network ACL"
            groups={this.props.networkAcls}
            value={this.state.acl_name}
            handleInputChange={this.handleChange}
            className="fieldWidthSmaller"
            disabled={this.props.isModal}
            invalid={isNullOrEmptyString(this.state.acl_name)}
            invalidText="Select a Network ACL."
          />
        </IcseFormGroup>
        <IcseFormGroup noMarginBottom>
          <IcseToggle
            tooltip={{
              content:
                "A Public Gateway must be enabled in this zone to use. To enable public gateways, see the VPC page.",
            }}
            id={"new-subnet-public-gateway-" + this.props.data.name}
            labelText="Use Public Gateway"
            toggleFieldName="public_gateway"
            defaultToggled={this.state.public_gateway}
            onToggle={this.handleToggle}
            disabled={
              this.props.isModal ||
              this.props.shouldDisableGatewayToggle(this.state, this.props)
            }
          />
        </IcseFormGroup>
      </Tile>
    );
  }
}

SubnetForm.defaultProps = {
  isModal: false,
};

SubnetForm.propTypes = {
  isModal: PropTypes.bool.isRequired,
  onSave: PropTypes.func,
  vpc_name: PropTypes.string.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    cidr: PropTypes.string.isRequired,
    public_gateway: PropTypes.bool,
    acl_name: PropTypes.string.isRequired,
  }).isRequired,
  disableSaveCallback: PropTypes.func,
  shouldDisableGatewayToggle: PropTypes.func,
  networkAcls: PropTypes.arrayOf(PropTypes.string).isRequired,
  componentDidUpdateCallback: PropTypes.func.isRequired,
  onSave: PropTypes.func,
};

export default SubnetForm;
