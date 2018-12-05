import React, { Component } from 'react';

class SwLocaleSelect extends Component {

	onLocaleChange(event) {
		if (this.props.onLocaleChange) {
			this.props.onLocaleChange(event.target.value);
		}
	}

	render() {
		return (
			<select
				className="form-control"
				value={this.props.selected || ''}
				onChange={this.onLocaleChange.bind(this)}
			>
				<option value="">Select...</option>
				{this.props.locales.map((l, i) => {
					return (
						<option key={l.code} value={l.code}>
							{l.name}
						</option>
					);
				})}
			</select>
		);
	}
}

export default SwLocaleSelect;
