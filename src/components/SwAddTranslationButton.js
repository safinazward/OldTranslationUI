import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import TranslationService from '../services/translationService';

export default class SwAddTranslationButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false
		};

		this.toggle = this.toggle.bind(this);
		this.handleValidSubmit = this.handleValidSubmit.bind(this);
		this.handleInvalidSubmit = this.handleInvalidSubmit.bind(this);
	}

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	handleValidSubmit(event, values) {
		this.setState({ error: false });
		TranslationService.addTranslation(this.props.locale, values)
			.then(translation => {
				if (this.props.onTranslationCreated) {
					this.props.onTranslationCreated(translation);
				}
				this.toggle();
			});
	}

	handleInvalidSubmit(event, errors, values) {
		this.setState({ error: true });
	}

	render() {
		return (
			<>
				<Button disabled={this.props.disabled} color="info" onClick={this.toggle} block={false}>{this.props.buttonLabel}</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
					<ModalHeader toggle={this.toggle}>New Translation</ModalHeader>
					<ModalBody>
						<AvForm id="newTranslationForm" onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInvalidSubmit}>
							<AvField name="key" label="Key" type="text" required />
							<AvField name="text" label="Text" type="text" required />
						</AvForm>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" form="newTranslationForm">Create</Button>
						{' '}
						<Button color="secondary" onClick={this.toggle}>Cancel</Button>
					</ModalFooter>
				</Modal>
			</>
		);
	}
}

