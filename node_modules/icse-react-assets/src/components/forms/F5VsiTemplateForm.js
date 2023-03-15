import { Password } from "@carbon/icons-react";
import { Button, PasswordInput } from "@carbon/react";
import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  getValidAdminPassword,
  isNullOrEmptyString,
  isValidTmosAdminPassword,
  isValidUrl,
} from "../../lib/f5-utils";
import {
  buildFormDefaultInputMethods,
  buildFormFunctions,
} from "../component-utils";
import { IcseSelect } from "../Dropdowns";
import { IcseTextInput } from "../Inputs";
import { default as PopoverWrapper } from "../PopoverWrapper";
import { ToolTipWrapper } from "../Tooltips";
import { IcseFormGroup } from "../Utils";
import "../styles/F5VsiTemplateForm.css";

/**
 * F5VsiTemplateForm
 */
class F5VsiTemplateForm extends Component {
  constructor(props) {
    super(props);
    this.state = props.data;
    buildFormFunctions(this);
    buildFormDefaultInputMethods(this);
    this.handleTextInput = this.handleTextInput.bind(this);
    this.handleLicenseChange = this.handleLicenseChange.bind(this);
    this.generateAdminPassword = this.generateAdminPassword.bind(this);
  }

  /**
   * set state to event value
   * @param {event} event
   */
  handleTextInput(event) {
    this.setState(this.eventTargetToNameAndValue(event));
  }

  /**
   * set conditional fields to null on license type change
   * @param {event} event
   */
  handleLicenseChange(event) {
    let { name, value } = event.target;
    let reset = {};
    let pool = [
      "license_username",
      "license_password",
      "license_host",
      "license_pool",
    ];
    let conditionalFields = {
      none: [],
      byol: ["byol_license_basekey"],
      regkeypool: pool,
      utilitypool: [
        "license_unit_of_measure",
        "license_sku_keyword_1",
        "license_sku_keyword_2",
        ...pool,
      ],
    };

    this.setState((prevState) => {
      conditionalFields[prevState.license_type].forEach((field) => {
        if (!conditionalFields[value].includes(field)) {
          reset[field] = "";
        }
      });
      return {
        [name]: value,
        ...reset,
      };
    });
  }

  /**
   * get a valid admin password between 15-20 characters
   */
  generateAdminPassword() {
    let length = Math.floor(Math.random() * 6 + 15); // between 15-20 chars, inclusive (20 - 15 + 1)
    let password = getValidAdminPassword(length); // get a valid password
    this.setState({ tmos_admin_password: password }); // set password
  }

  render() {
    return (
      <>
        <IcseFormGroup>
          {/* license_type */}
          <IcseSelect
            formName={"F5 VSI Template"}
            tooltip={{
              content: "The type of license.",
              align: "right",
            }}
            labelText="License Type"
            component="f5-license-type"
            name="license_type"
            groups={["none", "byol", "regkeypool", "utilitypool"]}
            value={this.state.license_type}
            className="fieldWidth"
            handleInputChange={this.handleLicenseChange}
          />
          {/* tmos_admin_password */}
          <div className="tooltip tight">
            <ToolTipWrapper
              tooltip={{
                content:
                  "The admin account password for the F5 BIG-IP instance.",
                align: "right",
              }}
              innerForm={PasswordInput}
              className="wide"
              id="tmos_admin_password"
              labelText="TMOS Admin Password"
              name="tmos_admin_password"
              value={this.state.tmos_admin_password || ""}
              invalid={
                this.props.invalidCallback(
                  "tmos_admin_password",
                  this.state,
                  this.props
                ) || !isValidTmosAdminPassword(this.state.tmos_admin_password)
              }
              invalidText="Password must be at least 15 characters, contain one numeric, one uppercase, and one lowercase character."
              onChange={this.handleTextInput}
            />
          </div>
          <PopoverWrapper
            hoverText="Generate Password"
            className={
              "passwordGenerateButton" +
              (isValidTmosAdminPassword(this.state.tmos_admin_password)
                ? ""
                : " invalid")
            }
          >
            <Button
              kind="ghost"
              onClick={this.generateAdminPassword}
              className="forceTertiaryButtonStyles"
            >
              <Password />
            </Button>
          </PopoverWrapper>
        </IcseFormGroup>
        {/* If license_type = "none", omit everything up until template version */}
        {this.state.license_type != "none" && (
          <>
            {/* If license_type = "regkeypool", omit everything up until License Username */}
            {/* Only display if license_type = byol */}
            {this.state.license_type != "regkeypool" &&
              this.state.license_type == "byol" && (
                <IcseFormGroup>
                  {/* byol_license_basekey */}
                  <ToolTipWrapper
                    tooltip={{
                      content:
                        "Bring your own license registration key for the F5 BIG-IP instance.",
                      align: "top-right",
                    }}
                    id="byol_license_basekey"
                    field="byol_license_basekey"
                    className="textInputWide"
                    labelText="BYOL License Basekey"
                    innerForm={IcseTextInput}
                    value={this.state.byol_license_basekey || ""}
                    onChange={this.handleTextInput}
                    invalid={
                      this.props.invalidCallback(
                        "byol_license_basekey",
                        this.state,
                        this.props
                      ) || isNullOrEmptyString(this.state.byol_license_basekey)
                    }
                    invalidText={this.props.invalidTextCallback(
                      "byol_license_basekey",
                      this.state,
                      this.props
                    )}
                  />
                </IcseFormGroup>
              )}
            {/* If license_type = "byol", omit everything up until template version */}
            {this.state.license_type != "byol" && (
              <>
                <IcseFormGroup>
                  {/* license_username */}
                  <ToolTipWrapper
                    tooltip={{
                      content:
                        "BIGIQ username to use for the pool based licensing of the F5 BIG-IP instance.",
                      align: "top-left",
                    }}
                    id="license_username"
                    field="license_username"
                    className="fieldWidth"
                    labelText="License Username"
                    innerForm={IcseTextInput}
                    value={this.state.license_username || ""}
                    onChange={this.handleTextInput}
                    invalid={
                      this.props.invalidCallback(
                        "license_username",
                        this.state,
                        this.props
                      ) || isNullOrEmptyString(this.state.license_username)
                    }
                    invalidText={this.props.invalidTextCallback(
                      "license_username",
                      this.state,
                      this.props
                    )}
                  />

                  {/* license_password */}
                  <div className="leftTextAlign tooltip">
                    <ToolTipWrapper
                      tooltip={{
                        content:
                          "BIGIQ password to use for the pool based licensing of the F5 BIG-IP instance.",
                      }}
                      id="license_password"
                      className="wide"
                      labelText="License Password"
                      innerForm={PasswordInput}
                      name="license_password"
                      value={this.state.license_password || ""}
                      onChange={this.handleTextInput}
                      invalid={this.props.invalidCallback(
                        "license_password",
                        this.state,
                        this.props
                      )}
                      invalidText={this.props.invalidTextCallback(
                        "license_password",
                        this.state,
                        this.props
                      )}
                    />
                  </div>
                </IcseFormGroup>
                <IcseFormGroup>
                  {/* license_host */}
                  <ToolTipWrapper
                    tooltip={{
                      content:
                        "BIGIQ IP or hostname to use for pool based licensing of the F5 BIG-IP instance.",
                      align: "top-left",
                    }}
                    id="license_host"
                    field="license_host"
                    className="fieldWidth"
                    labelText="License Host"
                    innerForm={IcseTextInput}
                    value={this.state.license_host || ""}
                    onChange={this.handleTextInput}
                    invalid={
                      this.props.invalidCallback(
                        "license_host",
                        this.state,
                        this.props
                      ) || isNullOrEmptyString(this.state.license_host)
                    }
                    invalidText={this.props.invalidTextCallback(
                      "license_host",
                      this.state,
                      this.props
                    )}
                  />

                  {/* license_pool */}
                  <ToolTipWrapper
                    tooltip={{
                      content:
                        "BIGIQ license pool name for the licensing of the F5 BIG-IP instance.",
                    }}
                    id="license_pool"
                    field="license_pool"
                    className="wide"
                    labelText="License Pool"
                    innerForm={IcseTextInput}
                    value={this.state.license_pool || ""}
                    onChange={this.handleTextInput}
                    invalid={
                      this.props.invalidCallback(
                        "license_pool",
                        this.state,
                        this.props
                      ) || isNullOrEmptyString(this.state.license_pool)
                    }
                    invalidText={this.props.invalidTextCallback(
                      "license_pool",
                      this.state,
                      this.props
                    )}
                  />
                </IcseFormGroup>

                {/* Only display if license_type = utilitypool */}
                {this.state.license_type == "utilitypool" && (
                  <IcseFormGroup>
                    {/* license_unit_of_measure */}
                    <ToolTipWrapper
                      tooltip={{
                        content: "BIGIQ utility pool unit of measurement.",
                        align: "top-right",
                      }}
                      id="license_unit_of_measure"
                      field="license_unit_of_measure"
                      className="fieldWidthSmaller"
                      labelText="License Unit of Measure"
                      innerForm={IcseTextInput}
                      value={this.state.license_unit_of_measure || ""}
                      onChange={this.handleTextInput}
                      invalid={
                        this.props.invalidCallback(
                          "license_unit_of_measure",
                          this.state,
                          this.props
                        ) ||
                        isNullOrEmptyString(this.state.license_unit_of_measure)
                      }
                      invalidText={this.props.invalidTextCallback(
                        "license_unit_of_measure",
                        this.state,
                        this.props
                      )}
                    />
                    {/* license_sku_keyword_1 */}
                    <ToolTipWrapper
                      tooltip={{
                        content:
                          "BIGIQ primary SKU for ELA utility licensing of the F5 BIG-IP instance.",
                      }}
                      id="license_sku_keyword_1"
                      field="license_sku_keyword_1"
                      className="fieldWidthSmaller"
                      labelText="License SKU Keyword 1"
                      innerForm={IcseTextInput}
                      value={this.state.license_sku_keyword_1 || ""}
                      onChange={this.handleTextInput}
                      invalid={
                        this.props.invalidCallback(
                          "license_sku_keyword_1",
                          this.state,
                          this.props
                        ) ||
                        isNullOrEmptyString(this.state.license_sku_keyword_1)
                      }
                      invalidText={this.props.invalidTextCallback(
                        "license_sku_keyword_1",
                        this.state,
                        this.props
                      )}
                    />

                    {/* license_sku_keyword_2 */}
                    {/* Only display if license_type = utilitypool */}
                    <ToolTipWrapper
                      tooltip={{
                        content:
                          "BIGIQ secondary SKU for ELA utility licensing of the F5 BIG-IP instance",
                      }}
                      id="license_sku_keyword_2"
                      field="license_sku_keyword_2"
                      className="fieldWidthSmaller"
                      labelText="License SKU Keyword 2"
                      innerForm={IcseTextInput}
                      value={this.state.license_sku_keyword_2 || ""}
                      onChange={this.handleTextInput}
                      invalid={
                        this.props.invalidCallback(
                          "license_sku_keyword_2",
                          this.state,
                          this.props
                        ) ||
                        isNullOrEmptyString(this.state.license_sku_keyword_2)
                      }
                      invalidText={this.props.invalidTextCallback(
                        "license_sku_keyword_2",
                        this.state,
                        this.props
                      )}
                    />
                  </IcseFormGroup>
                )}
              </>
            )}
          </>
        )}
        <IcseFormGroup>
          {/* template_version */}
          <ToolTipWrapper
            tooltip={{
              content:
                "The terraform template version for phone_home_url_metadata.",
              align: "top-left",
            }}
            id="template_version"
            field="template_version"
            className="fieldWidth"
            labelText="Template Version"
            innerForm={IcseTextInput}
            value={this.state.template_version}
            onChange={this.handleTextInput}
            invalid={
              this.props.invalidCallback(
                "template_version",
                this.state,
                this.props
              ) || isNullOrEmptyString(this.state.template_version)
            }
            invalidText={this.props.invalidTextCallback(
              "template_version",
              this.state,
              this.props
            )}
          />
          {/* template_source */}
          <ToolTipWrapper
            tooltip={{
              content:
                "The terraform template source for phone_home_url_metadata.",
            }}
            id="template_source"
            field="template_source"
            className="wide"
            labelText="Template Source"
            innerForm={IcseTextInput}
            value={this.state.template_source}
            onChange={this.handleTextInput}
            invalid={
              this.props.invalidCallback(
                "template_source",
                this.state,
                this.props
              ) || isNullOrEmptyString(this.state.template_source)
            }
            invalidText={this.props.invalidTextCallback(
              "template_source",
              this.state,
              this.props
            )}
          />
        </IcseFormGroup>
        <IcseFormGroup>
          {/* app_id */}
          <ToolTipWrapper
            tooltip={{
              content:
                "The terraform application id for phone_home_url_metadata.",
              align: "top-right",
            }}
            id="app_id"
            field="app_id"
            className="fieldWidth"
            labelText="App ID"
            innerForm={IcseTextInput}
            value={this.state.app_id}
            onChange={this.handleTextInput}
            invalid={this.props.invalidCallback(
              "app_id",
              this.state,
              this.props
            )}
            invalidText={this.props.invalidTextCallback(
              "app_id",
              this.state,
              this.props
            )}
          />
          {/* phone_home_url */}
          <ToolTipWrapper
            tooltip={{
              content:
                "The URL to POST status when BIG-IP is finished onboarding.",
            }}
            id="phone_home_url"
            field="phone_home_url"
            className="fieldWidth"
            labelText="Phone Home URL"
            innerForm={IcseTextInput}
            value={this.state.phone_home_url}
            onChange={this.handleTextInput}
            invalid={
              this.props.invalidCallback(
                "phone_home_url",
                this.state,
                this.props
              ) || !isValidUrl(this.state.phone_home_url)
            }
            invalidText={this.props.invalidTextCallback(
              "phone_home_url",
              this.state,
              this.props
            )}
          />
        </IcseFormGroup>
        <IcseFormGroup>
          {/* do_declaration_url */}
          <ToolTipWrapper
            tooltip={{
              content:
                "The URL to retrieve the f5-declarative-onboarding JSON declaration.",
              align: "top-left",
            }}
            id="do_declaration_url"
            field="do_declaration_url"
            className="fieldWidth"
            labelText="DO Declaration URL"
            innerForm={IcseTextInput}
            value={this.state.do_declaration_url}
            onChange={this.handleTextInput}
            invalid={
              this.props.invalidCallback(
                "do_declaration_url",
                this.state,
                this.props
              ) || !isValidUrl(this.state.do_declaration_url)
            }
            invalidText={this.props.invalidTextCallback(
              "do_declaration_url",
              this.state,
              this.props
            )}
          />
          {/* as3_declaration_url */}
          <ToolTipWrapper
            tooltip={{
              content:
                "The URL to retrieve the f5-appsvcs-extension JSON declaration.",
            }}
            id="as3_declaration_url"
            field="as3_declaration_url"
            className="fieldWidth"
            labelText="AS3 Declaration URL"
            innerForm={IcseTextInput}
            value={this.state.as3_declaration_url}
            onChange={this.handleTextInput}
            invalid={
              this.props.invalidCallback(
                "as3_declaration_url",
                this.state,
                this.props
              ) || !isValidUrl(this.state.as3_declaration_url)
            }
            invalidText={this.props.invalidTextCallback(
              "as3_declaration_url",
              this.state,
              this.props
            )}
          />
        </IcseFormGroup>
        <IcseFormGroup>
          {/* ts_declaration_url */}
          <ToolTipWrapper
            tooltip={{
              content:
                "The URL to retrieve the f5-telemetry-streaming JSON declaration.",
              align: "top-left",
            }}
            id="ts_declaration_url"
            field="ts_declaration_url"
            className="fieldWidth"
            labelText="TS Declaration URL"
            innerForm={IcseTextInput}
            value={this.state.ts_declaration_url}
            onChange={this.handleTextInput}
            invalid={
              this.props.invalidCallback(
                "ts_declaration_url",
                this.state,
                this.props
              ) || !isValidUrl(this.state.ts_declaration_url)
            }
            invalidText={this.props.invalidTextCallback(
              "ts_declaration_url",
              this.state,
              this.props
            )}
          />
          {/* tgstandby_url */}
          <ToolTipWrapper
            tooltip={{
              content:
                "The URL to POST L3 addresses when tgstandby is triggered.",
            }}
            id="tgstandby_url"
            field="tgstandby_url"
            className="fieldWidth"
            labelText="TGStandby URL"
            innerForm={IcseTextInput}
            value={this.state.tgstandby_url}
            onChange={this.handleTextInput}
            invalid={
              this.props.invalidCallback(
                "tgstandby_url",
                this.state,
                this.props
              ) || !isValidUrl(this.state.tgstandby_url)
            }
            invalidText={this.props.invalidTextCallback(
              "tgstandby_url",
              this.state,
              this.props
            )}
          />
        </IcseFormGroup>
        <IcseFormGroup>
          {/* tgrefresh_url */}
          <ToolTipWrapper
            tooltip={{
              content:
                "The URL to POST L3 addresses when tgrefresh is triggered.",
              align: "top-left",
            }}
            id="tgrefresh_url"
            field="tgrefresh_url"
            className="fieldWidth"
            labelText="TGRefresh URL"
            innerForm={IcseTextInput}
            value={this.state.tgrefresh_url}
            onChange={this.handleTextInput}
            invalid={
              this.props.invalidCallback(
                "tgrefresh_url",
                this.state,
                this.props
              ) || !isValidUrl(this.state.tgrefresh_url)
            }
            invalidText={this.props.invalidTextCallback(
              "tgrefresh_url",
              this.state,
              this.props
            )}
          />
          {/* tgactive_url */}
          <ToolTipWrapper
            tooltip={{
              content:
                "The URL to POST L3 addresses when tgactive is triggered.",
            }}
            id="tgactive_url"
            field="tgactive_url"
            className="fieldWidth"
            labelText="TGActive URL"
            innerForm={IcseTextInput}
            value={this.state.tgactive_url}
            onChange={this.handleTextInput}
            invalid={
              this.props.invalidCallback(
                "tgactive_url",
                this.state,
                this.props
              ) || !isValidUrl(this.state.tgactive_url)
            }
            invalidText={this.props.invalidTextCallback(
              "tgactive_url",
              this.state,
              this.props
            )}
          />
        </IcseFormGroup>
      </>
    );
  }
}

F5VsiTemplateForm.defaultProps = {
  data: {
    license_type: "none",
    tmos_admin_password: "",
    byol_license_basekey: "",
    license_username: "",
    license_password: "",
    license_host: "",
    license_pool: "",
    license_unit_of_measure: "",
    license_sku_keyword_1: "",
    license_sku_keyword_2: "",
    template_version: "",
    template_source: "",
    app_id: "",
    phone_home_url: "",
    do_declaration_url: "",
    as3_declaration_url: "",
    ts_declaration_url: "",
    tgstandby_url: "",
    tgrefresh_url: "",
    tgactive_url: "",
  },
};

F5VsiTemplateForm.propTypes = {
  data: PropTypes.shape({
    license_type: PropTypes.string.isRequired,
    tmos_admin_password: PropTypes.string.isRequired,
    byol_license_basekey: PropTypes.string.isRequired,
    license_username: PropTypes.string.isRequired,
    license_password: PropTypes.string.isRequired,
    license_host: PropTypes.string.isRequired,
    license_pool: PropTypes.string.isRequired,
    license_unit_of_measure: PropTypes.string.isRequired,
    license_sku_keyword_1: PropTypes.string.isRequired,
    license_sku_keyword_2: PropTypes.string.isRequired,
    template_version: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    template_source: PropTypes.string.isRequired,
    app_id: PropTypes.string.isRequired,
    phone_home_url: PropTypes.string.isRequired,
    do_declaration_url: PropTypes.string.isRequired,
    as3_declaration_url: PropTypes.string.isRequired,
    ts_declaration_url: PropTypes.string.isRequired,
    tgstandby_url: PropTypes.string.isRequired,
    tgrefresh_url: PropTypes.string.isRequired,
    tgactive_url: PropTypes.string.isRequired,
  }),
  invalidCallback: PropTypes.func.isRequired,
  invalidTextCallback: PropTypes.func.isRequired,
};

export default F5VsiTemplateForm;
