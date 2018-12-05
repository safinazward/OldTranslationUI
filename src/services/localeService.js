const localeService = {
	getLocales: () => {
		return fetch('http://' + window.location.hostname + ':5002/api/Locale')
			.then(response => {
				return response.json();
			})
	},
	getLocale: locale => {
		return fetch('http://' + window.location.hostname + ':5002/api/Translation/' + locale)
			.then(response => {
				return response.json();
			})
	},
	saveLocale: locale => {
		return fetch('http://' + window.location.hostname + ':5002/api/Locale/',
			{
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify(locale)
			})
			.then(response => {
				return response.json();
			})
	},
	removeLocale: locale => {
		return fetch('http://' + window.location.hostname + ':5002/api/Locale/' + locale,
			{
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'DELETE'
			});
	}
}

export default localeService;
