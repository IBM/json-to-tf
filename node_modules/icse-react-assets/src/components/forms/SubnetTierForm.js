import React from "react";
import { DeleteModal } from "../Modals";
import {
  DynamicRender,
  IcseFormGroup,
  IcseSubForm,
  StatelessToggleForm,
} from "../Utils";
import { titleCase } from "lazy-z";
import PropTypes from "prop-types";
import { DeleteButton, SaveAddButton } from "../Buttons";
import { IcseNameInput, IcseToggle } from "../Inputs";
import { IcseNumberSelect, IcseSelect } from "../Dropdowns";
import SubnetTileForm from "./SubnetTileForm";

class SubnetTierForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props.data };
    this.handleChange = this.handleChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.handleShowToggle = this.handleShowToggle.bind(this);
    this.shouldDisableSubmit = this.shouldDisableSubmit.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.onSubnetSave = this.onSubnetSave.bind(this);
  }
  /**
   * Handle input change
   * @param {event} event
   */
  handleChange(event) {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  /**
   * handle toggle
   */
  handleToggle() {
    this.setState({ addPublicGateway: !this.state.addPublicGateway });
  }
  /**
   * toggle delete modal
   */
  toggleDeleteModal() {
    this.setState({ showDeleteModal: !this.state.showDeleteModal });
  }

  /**
   * handle hide/show form data
   */
  handleShowToggle() {
    this.setState({ hide: !this.state.hide });
  }

  onSave() {
    this.props.onSave(this.state, this.props);
  }

  onSubnetSave(stateData, componentProps) {
    this.props.onSubnetSave(stateData, componentProps);
  }

  onDelete() {
    this.props.onDelete(this.state, this.props);
  }

  shouldDisableSubmit() {
    if (this.props.isModal) {
      if (this.props.shouldDisableSubmit(this.state, this.props) === false)
        this.props.enableModal();
      else this.props.disableModal();
    }
  }

  componentDidUpdate() {
    this.shouldDisableSubmit();
  }

  componentDidMount() {
    this.shouldDisableSubmit();
  }

  render() {
    let composedId = `${this.props.vpc_name}-tier-${
      this.props.data.name === "" ? "new-subnet-tier" : this.props.data.name
    }`;
    let formName = this.props.data.name + "-subnet-tier";
    let tierName =
      this.props.data.name === ""
        ? "New Subnet Tier"
        : titleCase(formName)
            .replace(/Vsi/g, "VSI")
            .replace(/Vpe/g, "VPE")
            .replace(/Vpn/g, "VPN");
    return (
      <IcseSubForm formInSubForm id={composedId} className="marginBottomSmall">
        <DeleteModal
          name={tierName}
          modalOpen={this.state.showDeleteModal}
          onModalClose={this.toggleDeleteModal}
          onModalSubmit={this.onDelete}
        />
        <StatelessToggleForm
          hideTitle={this.props.isModal === true}
          hide={this.state.hide}
          name={tierName}
          onIconClick={this.handleShowToggle}
          toggleFormTitle
          buttons={
            <>
              <SaveAddButton
                onClick={this.onSave}
                noDeleteButton={this.props.noDeleteButton}
                disabled={this.props.shouldDisableSave(this.state, this.props)}
              />
              <DynamicRender
                hide={this.props.noDeleteButton}
                show={
                  <DeleteButton
                    name={tierName}
                    onClick={this.toggleDeleteModal}
                  />
                }
              />
            </>
          }
        >
          <>
            <IcseFormGroup>
              <IcseNameInput
                id={
                  this.props.isModal
                    ? "new-tier-name"
                    : this.props.data.name + "-tier-name"
                }
                value={this.state.name}
                componentName={formName}
                onChange={this.handleChange}
                className="fieldWidthSmaller"
                readOnly={this.props.readOnly}
                invalidCallback={this.props.invalidCallback}
                invalidText={this.props.invalidTextCallback(
                  this.state,
                  this.props
                )}
                hideHelperText
              />
              <IcseNumberSelect
                max={3}
                value={this.state.zones}
                labelText="Subnet Tier Zones"
                name="zones"
                handleInputChange={this.handleChange}
                className="fieldWidthSmaller"
                invalid={this.state.zones === 0}
                invalidText="At least one zone must be selected."
                formName={formName}
              />
              <IcseSelect
                tooltip={{
                  content:
                    "Changing this field will overwrite existing Network ACL changes to subnets in this data.",
                }}
                className="fieldWidthSmaller"
                field="networkAcl"
                name="networkAcl"
                value={this.state.networkAcl || ""}
                vpcName={this.props.vpc_name}
                labelText="Network ACL"
                groups={this.props.networkAcls}
                handleInputChange={this.handleChange}
                isModal={this.props.isModal}
                formName={formName}
              />
            </IcseFormGroup>
            <IcseFormGroup className="marginBottomSmall">
              <IcseToggle
                tooltip={{
                  content:
                    this.props.enabledPublicGateways.length === 0
                      ? "This VPC has no public gateways enabled. To add public gateways, return to the VPC page."
                      : "Changing this field will overwrite existing Public Gateway changes to subnets in this data.",
                }}
                id={composedId + "-public-gateway"}
                labelText="Use Public Gateways"
                defaultToggled={this.state.addPublicGateway}
                onToggle={this.handleToggle}
                isModal={this.props.isModal}
                disabled={this.props.enabledPublicGateways.length === 0}
              />
            </IcseFormGroup>
            <SubnetTileForm
              tier={this.props.data.name}
              vpc_name={this.props.vpc_name}
              onSave={this.onSubnetSave}
              isModal={this.props.isModal}
              data={this.props.subnetListCallback(this.state, this.props)}
              key={this.state.zones}
              enabledPublicGateways={this.props.enabledPublicGateways}
              networkAcls={this.props.networkAcls}
              disableSaveCallback={this.props.disableSubnetSaveCallback}
            />
          </>
        </StatelessToggleForm>
      </IcseSubForm>
    );
  }
}

SubnetTierForm.defaultProps = {
  isModal: false,
  hide: true,
  readOnly: false,
  noDeleteButton: false,
  data: {
    hide: false,
    name: "",
    zones: 3,
    networkAcl: null,
    addPublicGateway: false,
  },
};

SubnetTierForm.propTypes = {
  data: PropTypes.shape({
    hide: PropTypes.bool,
    name: PropTypes.string.isRequired,
    zones: PropTypes.number.isRequired,
    networkAcl: PropTypes.string,
    addPublicGateway: PropTypes.bool
  }),
  // save and delete functions can be null when form rendered as modal
  onSave: PropTypes.func,
  onSubnetSave: PropTypes.func,
  onDelete: PropTypes.func,
  disableSubnetSaveCallback: PropTypes.func, // can be null when modal
  shouldDisableSave: PropTypes.func,
  shouldDisableSubmit: PropTypes.func, // can be null when not modal
  noDeleteButton: PropTypes.bool, // can be null when modal
  isModal: PropTypes.bool.isRequired,
  readOnly: PropTypes.bool.isRequired,
  networkAcls: PropTypes.arrayOf(PropTypes.string).isRequired,
  enabledPublicGateways: PropTypes.arrayOf(PropTypes.number).isRequired,
  hide: PropTypes.bool.isRequired,
  vpc_name: PropTypes.string.isRequired,
  subnetListCallback: PropTypes.func.isRequired,
  enableModal: PropTypes.func,
  disableModal: PropTypes.func,
};

export default SubnetTierForm;
