import { Modal } from "@carbon/react";
import PropTypes from "prop-types";
import "./styles/Modals.css";
import React from "react";

/**
 * Icse Modal Wrapper
 * @param {*} props
 * @param {string} props.name resource name
 * @param {string} props.heading modal heading
 * @param {boolean} props.open show modal
 * @param {boolean=} props.danger danger, defaults to true
 * @param {boolean=} props.alert alert, defaults to true
 * @param {string=} props.primaryButtonText defaults to `Dismiss Changes`
 * @param {string=} props.secondaryButtonText defaults to `Cancel`
 * @param {Function} props.onRequestSubmit
 * @param {Function} props.onRequestClose
 * @param {boolean=} props.useAddButton use + button instead of edit
 */
export const IcseModal = (props) => {
  let name = <strong>{props.name}</strong>;
  return (
    <Modal
      id={props.id}
      className="leftTextAlign"
      modalHeading={props.heading}
      open={props.open}
      alert={props.alert}
      danger={props.danger}
      shouldSubmitOnEnter
      primaryButtonDisabled={props.primaryButtonDisabled}
      primaryButtonText={props.primaryButtonText}
      secondaryButtonText={props.secondaryButtonText}
      onRequestSubmit={props.onRequestSubmit}
      onRequestClose={props.onRequestClose}
    >
      {props.children}
    </Modal>
  );
};

IcseModal.defaultProps = {
  primaryButtonText: "Primary Button",
  secondaryButtonText: "Cancel",
  primaryButtonDisabled: false,
  danger: false,
  alert: true,
  open: false,
  heading: "Default Heading",
  id: "default-icse-modal",
};

IcseModal.propTypes = {
  primaryButtonText: PropTypes.string.isRequired,
  secondaryButtonText: PropTypes.string.isRequired,
  primaryButtonDisabled: PropTypes.bool,
  danger: PropTypes.bool,
  alert: PropTypes.bool,
  heading: PropTypes.string.isRequired,
  onRequestSubmit: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

/**
 * Delete modal
 * @param {*} props
 * @param {string} props.name name of modal
 * @param {boolean} props.modalOpen true if open
 * @param {Function} props.onModalClose function for on close
 * @param {Function} props.onModalSubmit function for on submit
 */
export const DeleteModal = (props) => {
  let name = <strong>{props.name}</strong>;
  return (
    <IcseModal
      id={props.name + "-delete"}
      name={props.name}
      heading={props.name}
      open={props.modalOpen}
      onRequestClose={props.onModalClose}
      onRequestSubmit={props.onModalSubmit}
      primaryButtonText="Delete Resource"
      danger
    >
      <span>You are about to delete {name}. This cannot be undone.</span>
    </IcseModal>
  );
};

DeleteModal.defaultProps = {
  modalOpen: false,
};

DeleteModal.propTypes = {
  name: PropTypes.string.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onModalSubmit: PropTypes.func.isRequired,
};

/**
 * unsaved changes modal modal
 * @param {*} props
 * @param {string} props.name name of modal
 * @param {boolean} props.modalOpen true if open
 * @param {Function} props.onModalClose function for on close
 * @param {Function} props.onModalSubmit function for on submit
 */

export const UnsavedChangesModal = (props) => {
  let name = props.name;
  return (
    <div className="unsaved-changes-modal-area">
      <IcseModal
        id={props.name + "-unsaved-changes"}
        open={props.modalOpen}
        name={props.name}
        onRequestClose={props.onModalClose}
        onRequestSubmit={props.onModalSubmit}
        heading={
          props.useDefaultUnsavedMessage
            ? "Missing Required Values"
            : "Unsaved Changes"
        }
        danger
        primaryButtonText="Dismiss Changes"
      >
        {props.useDefaultUnsavedMessage ? (
          <span>
            Resource {name} is missing required values.{" "}
            <strong>
              Without these values, your configuration is invalid.
            </strong>{" "}
            Are you sure you want to dismiss these changes?
          </span>
        ) : (
          <span>
            Resource {name} has unsaved changes. Are you sure you want to
            dismiss these changes?
          </span>
        )}
      </IcseModal>
    </div>
  );
};

UnsavedChangesModal.defaultProps = {
  modalOpen: false,
  useDefaultUnsavedMessage: true,
};

UnsavedChangesModal.propTypes = {
  name: PropTypes.string.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onModalSubmit: PropTypes.func.isRequired,
  useDefaultUnsavedMessage: PropTypes.bool,
};
