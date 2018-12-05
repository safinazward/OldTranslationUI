import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col } from 'reactstrap';
import { Card, CardHeader, CardBody } from 'reactstrap';

import SwLocaleSelect from './components/SwLocaleSelect';
import SwAddTranslationButton from './components/SwAddTranslationButton';
import SwAddLocaleButton from './components/SwAddLocaleButton';
import SwRemoveLocaleButton from './components/SwRemoveLocaleButton';
import SwTable from './components/SwTable';
import localeService from './services/localeService'

class App extends Component {
	state = {
		locale: null,
		keys: {},
		locales: [],
	};

	componentDidMount() {
		this.loadLocales();
	}

	loadLocales() {
		localeService.getLocales().then(locales => {
			this.setState({ ...this.state, locales: locales });

			if (locales.length > 0) {
				this.onLocaleChange(locales[0].code);
			}
		});
	}

	onLocaleChange(locale) {
		if (locale && this.state.locale !== locale) {
			this.loadLocale(locale);
		} else {
			this.setState({ locale: null, keys: {} });
		}
	}

	onLocaleRemoved(locale) {
		this.loadLocales();
	}

	onLocaleCreated(locale) {
		this.loadLocales();
		this.loadLocale(locale.code);
	}

	loadLocale(locale) {
		localeService.getLocale(locale)
			.then(keys => {
				this.setState({ locale: locale, keys });
			});
	}

	onFilterChanged(event) {
		if (event.target.value.trim()) {
			this.setState({ ...this.state, filter: event.target.value.trim() })
		} else {
			this.setState({ ...this.state, filter: null })
		}
	}

	render() {
		return (
			<Container fluid={true}>
				<Row>
					<Col>
						<Card className="m-5">
							<CardHeader>
								<Row>
									<div className="col-2 text-left">
										<SwLocaleSelect locales={this.state.locales} selected={this.state.locale} onLocaleChange={this.onLocaleChange.bind(this)} />
									</div>
									<div className="col-4 text-left">
										<input className="form-control" type="text" placeholder="filter" onChange={this.onFilterChanged.bind(this)}></input>
									</div>
									<div className="col-6 text-right">
										<SwAddLocaleButton buttonLabel='New Locale' onLocaleCreated={(locale) => this.onLocaleCreated(locale)}></SwAddLocaleButton>
										&nbsp;
										<SwRemoveLocaleButton buttonLabel='Remove Locale' locale={this.state.locale} onLocaleRemoved={(locale) => this.onLocaleRemoved(locale)}></SwRemoveLocaleButton>
										&nbsp;
  										<SwAddTranslationButton disabled={this.state.locale !== 'en'} buttonLabel='New Translation' locale={this.state.locale} onTranslationCreated={() => this.loadLocale(this.state.locale)}></SwAddTranslationButton>
									</div>
								</Row>
							</CardHeader>
							<CardBody>
								<SwTable key={this.state.locale} locale={this.state.locale} data={this.state.keys} filter={this.state.filter} onChange={() => this.loadLocale(this.state.locale)} />
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default App;
