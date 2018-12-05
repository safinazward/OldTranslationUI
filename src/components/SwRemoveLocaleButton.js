import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';
import localeService from '../services/localeService';

export default class SwRemoveLocaleButton extends React.Component {
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

		localeService.removeLocale(this.props.locale)
			.then(response => {
				if (this.props.onLocaleRemoved) {
					this.props.onLocaleRemoved(this.props.locale);
				}
				this.toggle();
			});
	}

	handleInvalidSubmit(event, errors, values) {
		this.setState({ error: true });
	}

	render() {
		if (this.props.locale && this.props.locale !== 'en') {
			return (
				<>
					<Button color="danger" onClick={this.toggle} block={false}>{this.props.buttonLabel}</Button>
					<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
						<ModalHeader toggle={this.toggle}>Remove Locale</ModalHeader>
						<ModalBody>
							<p>This will remove the locale and all its translations</p>
							<AvForm id="removeLocaleForm" onValidSubmit={this.handleValidSubmit.bind(this)} onInvalidSubmit={this.handleInvalidSubmit}>
							</AvForm>
						</ModalBody>
						<ModalFooter>
							<Button color="primary" form="removeLocaleForm">Remove</Button>
							{' '}
							<Button color="secondary" onClick={this.toggle}>Cancel</Button>
						</ModalFooter>
					</Modal>
				</>
			);
		} else {
			return <Button color="danger" block={false} disabled>{this.props.buttonLabel}</Button>
		}
	}
}

