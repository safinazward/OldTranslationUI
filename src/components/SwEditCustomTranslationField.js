import React from "react";
import { AvForm, AvInput } from "availity-reactstrap-validation";
import TranslationService from "../services/translationService";

export default class SwEditCustomTranslationField extends React.Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
  }

  save(event, values) {
    if (this.props.translation.text !== this.props.translation.standardText) {
      this.changeCustom(values);
    } else {
      this.createCustom(values);
    }
  }

  changeCustom(values) {
    TranslationService.updateCustomTranslation(
      this.props.locale,
      this.props.translation.key,
      values.text
    ).then(translation => {
      if (this.props.onSave) {
        this.props.onSave(translation);
      }
    });
  }

  createCustom(values) {
    TranslationService.addCustomTranslation(
      this.props.locale,
      this.props.translation.key,
      values.text
    ).then(translation => {
      if (this.props.onSave) {
        this.props.onSave(translation);
      }
    });
  }

  render() {
    return this.props.editing ? (
      <AvForm onValidSubmit={this.save}>
        <AvInput name="text" value={this.props.translation.text} />
      </AvForm>
    ) : (
      <div>{this.props.translation.text}</div>
    );
  }
}
