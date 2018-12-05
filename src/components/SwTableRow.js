import React, { Component } from 'react';
import { Button } from 'reactstrap';
import SwEditTranslationField from './SwEditTranslationField';
import SwEditCustomTranslationField from './SwEditCustomTranslationField';
import TranslationService from '../services/translationService';

class SwTableRow extends Component {

	constructor(props) {
		super(props);

		this.state = {
			editingCustom: false
		};

		this.onSaveCustom = this.onSaveCustom.bind(this);
		this.remove = this.remove.bind(this);
		this.reset = this.reset.bind(this);
	}

	edit = () => {
		this.setState(prevState => ({
			editing: !prevState.editing,
		}));
	}

	editCustom = () => {
		this.setState(prevState => ({
			editingCustom: !prevState.editingCustom,
		}));
	}

	onSaveCustom(translation) {
		this.setState({ ...this.state, editingCustom: false });
		if (this.props.onChange) {
			this.props.onChange();
		}
	}

	onSave(translation) {
		this.setState({ ...this.state, editing: false });
		if (this.props.onChange) {
			this.props.onChange();
		}
	}

	remove() {
		TranslationService.removeTranslation(this.props.locale, this.props.translation.key)
			.then(response => {
				if (this.props.onChange) {
					this.props.onChange();
				}
			});
	}

	reset() {
		TranslationService.removeCustomTranslation(this.props.locale, this.props.translation.key)
			.then(response => {
				if (this.props.onChange) {
					this.props.onChange();
				}
			});
	}

	render() {
		return (
			<tr className="row m-0">
				<th className="d-inline-block col-4">{this.props.translation.key}</th>
				<td className="d-inline-block col-5">
					<SwEditCustomTranslationField editing={this.state.editingCustom} locale={this.props.locale} translation={this.props.translation} onSave={(t) => this.onSaveCustom(t)} />
					<small><SwEditTranslationField editing={this.state.editing} locale={this.props.locale} translation={this.props.translation} onSave={(t) => this.onSave(t)} /></small>
				</td>
				<td className="d-inline-block col">

					<Button className="m-1" size="sm" outline color="primary" onClick={this.editCustom}>{this.state.editingCustom ? 'Cancel' : 'Edit'}</Button>

					{
						(this.props.translation.standardText !== this.props.translation.text)
							? <Button className="m-1" size="sm" color="warning" onClick={this.reset}>Reset</Button>
							: <Button className="m-1" size="sm" outline color="warning" disabled>Reset</Button>
					}
				</td>
				<td className="d-inline-block col text-right">
					<Button className="m-1" size="sm" outline color="primary" onClick={this.edit}>{this.state.editing ? 'Cancel' : 'Edit'}</Button>
					<Button disabled={this.props.locale !== 'en'} className="m-1" size="sm" color="danger" onClick={this.remove}>Remove</Button>
				</td>
			</tr>
		)
	}
}

export default SwTableRow;
