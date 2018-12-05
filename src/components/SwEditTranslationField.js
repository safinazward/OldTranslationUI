import React from "react";
import { AvForm, AvInput } from "availity-reactstrap-validation";
import TranslationService from "../services/translationService";

export default class SwEditTranslationField extends React.Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
  }

  save(event, values) {
    TranslationService.updateTranslation(
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
        <AvInput name="text" value={this.props.translation.standardText} />
      </AvForm>
    ) : (
      <div>{this.props.translation.standardText}</div>
    );
  }
}
